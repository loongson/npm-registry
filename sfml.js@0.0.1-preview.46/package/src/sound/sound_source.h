#ifndef SRC_SOUND_SOUND_SOURCE_H_
#define SRC_SOUND_SOUND_SOURCE_H_

#include <nan.h>
#include <map>

#include <SFML/Audio/SoundSource.hpp>

namespace node_sfml {
namespace sound {

class SoundSource : public Nan::ObjectWrap {
 public:
  struct SimpleActions {
    void (*play)(SoundSource*);
    void (*pause)(SoundSource*);
    void (*stop)(SoundSource*);
  };

  enum SoundType {
    kMusic,
    kSound,
  };

  static void SetCommonPrototype(v8::Local<v8::FunctionTemplate>* _tpl);
  static void AtExit(void* argv);

 public:
  static NAN_METHOD(Play);
  static NAN_METHOD(Pause);
  static NAN_METHOD(Stop);
  static NAN_METHOD(GetStatus);

#define SOUND_SOURCE_SIMPLE_SETTER_AND_GETTERS(V)                              \
  V(Pitch, float, double, Number)                                              \
  V(Volume, float, double, Number)                                             \
  V(RelativeToListener, bool, bool, v8::Boolean)                               \
  V(MinDistance, float, double, Number)                                        \
  V(Attenuation, float, double, Number)

#define DECLARE_SIMPLE_SETTER_AND_GETTER(name, _, __, ___)                     \
  static NAN_METHOD(Set##name);                                                \
  static NAN_METHOD(Get##name);
  SOUND_SOURCE_SIMPLE_SETTER_AND_GETTERS(DECLARE_SIMPLE_SETTER_AND_GETTER);
#undef DECLARE_SIMPLE_SETTER_AND_GETTER

  // TODO(XadillaX): SetPosition / GetPosition

 public:
  explicit SoundSource(SoundType type,
                       sf::SoundSource* sound_source,
                       SimpleActions = {nullptr, nullptr, nullptr});
  ~SoundSource();

  template <class T>
  inline const T& sound_source() const {
    return *reinterpret_cast<T*>(_sound_source.get());
  }
  template <class T>
  inline T& sound_source() {
    return *reinterpret_cast<T*>(_sound_source.get());
  }

 private:
  static void Stop(SoundType type,
                   SoundSource* source,
                   bool delete_ptr = false);

 protected:
  std::unique_ptr<sf::SoundSource> _sound_source;
  SimpleActions _simple_actions;
  SoundType _type;

  static std::map<SoundSource*, SoundType> registered_sounds;
};

}  // namespace sound
}  // namespace node_sfml

#endif  // SRC_SOUND_SOUND_SOURCE_H_
