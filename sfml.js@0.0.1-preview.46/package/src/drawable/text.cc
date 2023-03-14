#include "text.h"
#include "../font.h"
#include "../plugins/transformable_plugin-inl.h"
#include "../utils-inl.h"
#include "drawable-inl.h"
#include "package_plugin-inl.h"

namespace node_sfml {
namespace drawable {

using v8::FunctionTemplate;
using v8::Local;
using v8::Object;
using v8::String;

const char text_name[] = "Text";
Nan::Persistent<v8::Function> Text::constructor;

NAN_MODULE_INIT(Text::Init) {
  Drawable::Init<Text, text_name>(target);

  // Set Text's styles enumerations
  {
    Local<Object> style = Nan::New<Object>();

#define SET_STYLES(V)                                                          \
  V(Regular)                                                                   \
  V(Bold)                                                                      \
  V(Italic)                                                                    \
  V(Underlined)                                                                \
  V(StrikeThrough)

#define SET_PER_STYLE(name)                                                    \
  Nan::Set(style,                                                              \
           Nan::New(#name).ToLocalChecked(),                                   \
           Nan::New(sf::Text::Style::name));

    SET_STYLES(SET_PER_STYLE)

#undef SET_PER_STYLE
#undef SET_STYLES

    Nan::Set(Nan::Get(target, Nan::New("Text").ToLocalChecked())
                 .ToLocalChecked()
                 .As<Object>(),
             Nan::New("Style").ToLocalChecked(),
             style);
  }
}

void Text::SetPrototype(Local<FunctionTemplate>* _tpl) {
  transformable::SetPrototype<Text>(_tpl);
  package_plugin_bounds::SetPrototype<sf::Text>(_tpl);
  package_plugin_color_and_thickness::SetPrototype<sf::Text>(_tpl);

  v8::Local<v8::FunctionTemplate>& tpl = *_tpl;
  Nan::SetPrototypeMethod(tpl, "setFont", SetFont);
  Nan::SetPrototypeMethod(tpl, "setString", SetString);
  Nan::SetPrototypeMethod(tpl, "setCharacterSize", SetCharacterSize);
  Nan::SetPrototypeMethod(tpl, "setLineSpacing", SetLineSpacing);
  Nan::SetPrototypeMethod(tpl, "setLetterSpacing", SetLetterSpacing);
  Nan::SetPrototypeMethod(tpl, "setStyle", SetStyle);
}

NAN_METHOD(Text::New) {
  if (info.Length() == 0) {
    Text* text = new Text();
    text->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
    return;
  }

  sf::String sf_string;

  V8StringToSFString(info.GetIsolate(), info[0].As<String>(), sf_string);
  Local<Object> font_object = info[1].As<Object>();
  sf::Uint32 character_size = Nan::To<sf::Uint32>(info[2]).FromJust();

  Text* text = new Text(sf_string, font_object, character_size);
  text->Wrap(info.This());
  info.GetReturnValue().Set(info.This());
}

NAN_METHOD(Text::SetString) {
  Text* text = Nan::ObjectWrap::Unwrap<Text>(info.Holder());
  sf::Text& raw = text->raw<sf::Text>();
  V8StringToSFString(info.GetIsolate(), info[0].As<String>(), text->_string);
  raw.setString(text->string());
}

NAN_METHOD(Text::SetFont) {
  Text* text = Nan::ObjectWrap::Unwrap<Text>(info.Holder());
  text->SetFont(info[0].As<Object>());
}

#define SET_META_VALUE(method_name, call_method, cast_type, nan_to_type)       \
  NAN_METHOD(Text::method_name) {                                              \
    Nan::ObjectWrap::Unwrap<Text>(info.Holder())                               \
        ->raw<sf::Text>()                                                      \
        .call_method(                                                          \
            static_cast<cast_type>(Nan::To<nan_to_type>(info[0]).FromJust())); \
  }

SET_META_VALUE(SetCharacterSize, setCharacterSize, sf::Uint32, sf::Uint32);
SET_META_VALUE(SetLineSpacing, setLineSpacing, float, double);
SET_META_VALUE(SetLetterSpacing, setLetterSpacing, float, double);
SET_META_VALUE(SetStyle, setStyle, sf::Text::Style, sf::Uint32);

Text::Text() : Drawable(new sf::Text()) {}

Text::Text(const sf::String& string,
           Local<Object> font,
           unsigned int character_size)
    : Drawable() {
  _string = string;
  _raw = new sf::Text(_string,
                      Nan::ObjectWrap::Unwrap<font::Font>(font)->font(),
                      character_size);
  _font.Reset(font);
}

Text::~Text() {
  _font.Reset();
}

void Text::SetFont(Local<Object> font) {
  font::Font* font_wrap = Nan::ObjectWrap::Unwrap<font::Font>(font);
  raw<sf::Text>().setFont(font_wrap->font());
  _font.Reset(font);
}

}  // namespace drawable
}  // namespace node_sfml
