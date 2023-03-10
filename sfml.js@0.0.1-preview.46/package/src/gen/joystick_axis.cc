#include <map>
#include <string>

namespace node_sfml {
namespace gen {

std::map<int, std::string> joystick_axis_itoa;
std::map<std::string, int> joystick_axis_atoi;

void InitJoystickAxis() {
  joystick_axis_itoa[0] = "X";
  joystick_axis_atoi["X"] = 0;
  joystick_axis_itoa[1] = "Y";
  joystick_axis_atoi["Y"] = 1;
  joystick_axis_itoa[2] = "Z";
  joystick_axis_atoi["Z"] = 2;
  joystick_axis_itoa[3] = "R";
  joystick_axis_atoi["R"] = 3;
  joystick_axis_itoa[4] = "U";
  joystick_axis_atoi["U"] = 4;
  joystick_axis_itoa[5] = "V";
  joystick_axis_atoi["V"] = 5;
  joystick_axis_itoa[6] = "PovX";
  joystick_axis_atoi["PovX"] = 6;
  joystick_axis_itoa[7] = "PovY";
  joystick_axis_atoi["PovY"] = 7;
}

}  // namespace gen
}  // namespace node_sfml
