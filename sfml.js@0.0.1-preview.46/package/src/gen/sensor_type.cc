#include <map>
#include <string>

namespace node_sfml {
namespace gen {

std::map<int, std::string> sensor_type_itoa;
std::map<std::string, int> sensor_type_atoi;

void InitSensorType() {
  sensor_type_itoa[0] = "Accelerometer";
  sensor_type_atoi["Accelerometer"] = 0;
  sensor_type_itoa[1] = "Gyroscope";
  sensor_type_atoi["Gyroscope"] = 1;
  sensor_type_itoa[2] = "Magnetometer";
  sensor_type_atoi["Magnetometer"] = 2;
  sensor_type_itoa[3] = "Gravity";
  sensor_type_atoi["Gravity"] = 3;
  sensor_type_itoa[4] = "UserAcceleration";
  sensor_type_atoi["UserAcceleration"] = 4;
  sensor_type_itoa[5] = "Orientation";
  sensor_type_atoi["Orientation"] = 5;
}

}  // namespace gen
}  // namespace node_sfml
