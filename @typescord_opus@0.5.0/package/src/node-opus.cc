#include "napi.h"
#include "../deps/opus/include/opus.h"
#include "node-opus.h"

using namespace Napi;

const char* getDecodeError(int decodedSamples) {
	switch(decodedSamples) {
		case OPUS_BAD_ARG:
			return "One or more invalid/out of range arguments.";
		case OPUS_BUFFER_TOO_SMALL:
			return "The mode struct passed is invalid.";
		case OPUS_INTERNAL_ERROR:
			return "An internal error was detected.";
		case OPUS_INVALID_PACKET:
			return "The compressed data passed is corrupted.";
		case OPUS_UNIMPLEMENTED:
			return "Invalid/unsupported request number.";
		case OPUS_INVALID_STATE:
			return "An encoder or decoder structure is invalid or already freed.";
		case OPUS_ALLOC_FAIL:
			return "Memory allocation has failed.";
		default:
			return "Unknown OPUS error.";
	}
}

Object Opus::Init(Napi::Env env, Object exports) {
	HandleScope scope(env);

	Function func = DefineClass(env, "Opus", {
		InstanceMethod("encode", &Opus::Encode),
		InstanceMethod("decode", &Opus::Decode),
		InstanceMethod("applyEncoderCTL", &Opus::ApplyEncoderCTL),
		InstanceMethod("applyDecoderCTL", &Opus::ApplyDecoderCTL),
		InstanceMethod("setBitrate", &Opus::SetBitrate),
		InstanceMethod("getBitrate", &Opus::GetBitrate),
	});

	exports.Set("Opus", func);
	return exports;
}

Opus::Opus(const CallbackInfo& args): ObjectWrap<Opus>(args) {
	this->encoder = nullptr;
	this->decoder = nullptr;
	this->rate = args[0].ToNumber().Int32Value();
	this->channels = args[1].ToNumber().Int32Value();
	this->application = OPUS_APPLICATION_AUDIO;
	this->outPcm = new opus_int16[channels * MAX_FRAME_SIZE];
}

Opus::~Opus() {
	if (this->encoder) opus_encoder_destroy(this->encoder);
	if (this->decoder) opus_decoder_destroy(this->decoder);

	this->encoder = nullptr;
	this->decoder = nullptr;

	delete this->outPcm;
	this->outPcm = nullptr;
}

int Opus::EnsureEncoder() {
	if (this->encoder) return 0;

	int error;
	this->encoder = opus_encoder_create(rate, channels, application, &error);

	return error;
}

int Opus::EnsureDecoder() {
	if (this->decoder) return 0;

	int error;
	this->decoder = opus_decoder_create(rate, channels, &error);

	return error;
}

Napi::Value Opus::Encode(const CallbackInfo& args) {
	Napi::Env env = args.Env();

	if (this->EnsureEncoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create encoder. Check the encoder parameters.").ThrowAsJavaScriptException();
	}
	
	if (!args[0].IsBuffer()) {
		Napi::TypeError::New(env, "This needs to be a buffer.").ThrowAsJavaScriptException();
	}

	Buffer<char> buf = args[0].As<Buffer<char>>();
	char* pcmData = buf.Data();
	opus_int16* pcm = reinterpret_cast<opus_int16*>(pcmData);
	int frameSize = buf.Length() / 2 / this->channels;

	int compressedLength = opus_encode(this->encoder, pcm, frameSize, &(this->outOpusEncoder[0]), MAX_PACKET_SIZE);

	Buffer<char> actualBuf = Buffer<char>::Copy(env, reinterpret_cast<char*>(this->outOpusEncoder), compressedLength);

	if (!actualBuf.IsEmpty()) return actualBuf;
}

Napi::Value Opus::Decode(const CallbackInfo& args) {
	Napi::Env env = args.Env();

	Buffer<unsigned char> buf = args[0].As<Buffer<unsigned char>>();
	unsigned char* compressedData = buf.Data();
	size_t compressedDataLength = buf.Length();

	if (this->EnsureDecoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create decoder. Check the decoder parameters.").ThrowAsJavaScriptException();
	}
	
	int decodedSamples = opus_decode(
		this->decoder,
		compressedData,
		compressedDataLength,
		&(this->outPcm[0]),
		MAX_FRAME_SIZE,
		/* decode_fec */ 0
	);
	
	if (decodedSamples < 0) {
		Napi::TypeError::New(env, getDecodeError(decodedSamples)).ThrowAsJavaScriptException();
	}

	int decodedLength = decodedSamples * 2 * this->channels;
	
	Buffer<char> actualBuf = Buffer<char>::Copy(env, reinterpret_cast<char*>(this->outPcm), decodedLength);

	if (!actualBuf.IsEmpty()) return actualBuf;
}

void Opus::ApplyEncoderCTL(const CallbackInfo& args) {
	Napi::Env env = args.Env();
	
	int ctl = args[0].ToNumber().Int32Value();
	int value = args[1].ToNumber().Int32Value();

	if (this->EnsureEncoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create encoder. Check the encoder parameters.").ThrowAsJavaScriptException();
	}

	if (opus_encoder_ctl(this->encoder, ctl, value) != OPUS_OK) {
		Napi::TypeError::New(env, "Invalid ctl / value.").ThrowAsJavaScriptException();
	}
}

void Opus::ApplyDecoderCTL(const CallbackInfo& args) {
	Napi::Env env = args.Env();
	
	int ctl = args[0].ToNumber().Int32Value();
	int value = args[1].ToNumber().Int32Value();

	if (this->EnsureDecoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create decoder. Check the decoder parameters.").ThrowAsJavaScriptException();
	}

	if (opus_decoder_ctl(this->decoder, ctl, value) != OPUS_OK) {
		Napi::TypeError::New(env, "Invalid ctl / value.").ThrowAsJavaScriptException();
	}
}

void Opus::SetBitrate(const CallbackInfo& args) {
	Napi::Env env = args.Env();
	
	int bitrate = args[0].ToNumber().Int32Value();

	if (this->EnsureEncoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create encoder. Check the encoder parameters.").ThrowAsJavaScriptException();
  }

	if (opus_encoder_ctl(this->encoder, OPUS_SET_BITRATE(bitrate)) != OPUS_OK) {
		Napi::TypeError::New(env, "Invalid bitrate.").ThrowAsJavaScriptException();
	}
}

Napi::Value Opus::GetBitrate(const CallbackInfo& args) {
	Napi::Env env = args.Env();

	if (this->EnsureEncoder() != OPUS_OK) {
		Napi::Error::New(env, "Could not create encoder. Check the encoder parameters.").ThrowAsJavaScriptException();
	}

	opus_int32 bitrate;
	opus_encoder_ctl(this->encoder, OPUS_GET_BITRATE(&bitrate));

	return Napi::Number::New(env, bitrate);
}

Object Init(Napi::Env env, Object exports) {
	return Opus::Init(env, exports);
}

NODE_API_MODULE(opus, Init)
