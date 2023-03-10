using namespace Napi;

#define FRAME_SIZE 960
#define MAX_FRAME_SIZE 6 * 960
#define MAX_PACKET_SIZE 3 * 1276
#define BITRATE 64000

class Opus : public ObjectWrap<Opus> {
	private:
		OpusEncoder* encoder;
		OpusDecoder* decoder;

		opus_int32 rate;
		int channels;
		int application;

		unsigned char outOpusEncoder[MAX_PACKET_SIZE];
		opus_int16* outPcm;

	protected:
		int EnsureEncoder();
		int EnsureDecoder();

	public:
		static Object Init(Napi::Env env, Object exports);

		Opus(const CallbackInfo& args);
		~Opus();

		Napi::Value Encode(const CallbackInfo& args);
		Napi::Value Decode(const CallbackInfo& args);
		
		void ApplyEncoderCTL(const CallbackInfo& args);
		void ApplyDecoderCTL(const CallbackInfo& args);
		
		void SetBitrate(const CallbackInfo& args);
		Napi::Value GetBitrate(const CallbackInfo& args);
};
