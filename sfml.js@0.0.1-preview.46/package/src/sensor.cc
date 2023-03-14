#include "sensor.h"
#include "vector3-inl.h"

namespace node_sfml {
namespace gen {
extern void InitSensorType();
}  // namespace gen

namespace sensor {

using std::map;
using std::string;
using v8::Local;
using v8::MaybeLocal;
using v8::Object;
using v8::String;
using v8::Value;

NAN_MODULE_INIT(Init) {
  gen::InitSensorType();

  Nan::SetMethod(target, "sensorIsAvailable", IsAvailable);
  Nan::SetMethod(target, "sensorSetEnabled", SetEnabled);
  Nan::SetMethod(target, "sensorGetValue", GetValue);

  Local<Object> type = Nan::New<Object>();
  for (auto it = gen::sensor_type_atoi.begin();
       it != gen::sensor_type_atoi.end();
       it++) {
    Nan::Set(type,
             Nan::New<String>(it->first).ToLocalChecked(),
             Nan::New(it->second));
  }

  Nan::Set(target, Nan::New<String>("sensorType").ToLocalChecked(), type);
}

NAN_METHOD(IsAvailable) {
  if (info.Length() != 1) {
    Nan::ThrowError("Invalid arguments count.");
    return;
  }

  sf::Sensor::Type sensor_type = static_cast<sf::Sensor::Type>(
      Nan::To<sf::Uint32>(info[0].As<v8::Uint32>()).FromJust());
  info.GetReturnValue().Set(sf::Sensor::isAvailable(sensor_type));
}

NAN_METHOD(SetEnabled) {
  if (info.Length() != 2) {
    Nan::ThrowError("Invalid arguments count.");
    return;
  }

  sf::Sensor::Type sensor_type = static_cast<sf::Sensor::Type>(
      Nan::To<sf::Uint32>(info[0].As<v8::Uint32>()).FromJust());
  bool enabled = Nan::To<bool>(info[1].As<v8::Boolean>()).FromJust();
  sf::Sensor::setEnabled(sensor_type, enabled);
}

NAN_METHOD(GetValue) {
  if (info.Length() != 1) {
    Nan::ThrowError("Invalid arguments count.");
    return;
  }

  sf::Sensor::Type sensor_type = static_cast<sf::Sensor::Type>(
      Nan::To<sf::Uint32>(info[0].As<v8::Uint32>()).FromJust());
  sf::Vector3f value = sf::Sensor::getValue(sensor_type);

  MaybeLocal<Value> maybe_temp;
  Nan::TryCatch try_catch;
  maybe_temp = vector3::Vector3F::NewRealInstance(info.GetIsolate(), value);
  if (maybe_temp.IsEmpty()) {
    try_catch.ReThrow();
    return;
  }
  info.GetReturnValue().Set(maybe_temp.ToLocalChecked());
}

}  // namespace sensor
}  // namespace node_sfml
