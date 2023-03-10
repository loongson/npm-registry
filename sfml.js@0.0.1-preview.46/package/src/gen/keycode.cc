#include <map>
#include <string>

namespace node_sfml {
namespace gen {

std::map<int, std::string> keycode_itoa;
std::map<std::string, int> keycode_atoi;

void InitKeyCode() {
  keycode_itoa[-1] = "Unknown";
  keycode_atoi["Unknown"] = -1;
  keycode_itoa[0] = "A";
  keycode_atoi["A"] = 0;
  keycode_itoa[1] = "B";
  keycode_atoi["B"] = 1;
  keycode_itoa[2] = "C";
  keycode_atoi["C"] = 2;
  keycode_itoa[3] = "D";
  keycode_atoi["D"] = 3;
  keycode_itoa[4] = "E";
  keycode_atoi["E"] = 4;
  keycode_itoa[5] = "F";
  keycode_atoi["F"] = 5;
  keycode_itoa[6] = "G";
  keycode_atoi["G"] = 6;
  keycode_itoa[7] = "H";
  keycode_atoi["H"] = 7;
  keycode_itoa[8] = "I";
  keycode_atoi["I"] = 8;
  keycode_itoa[9] = "J";
  keycode_atoi["J"] = 9;
  keycode_itoa[10] = "K";
  keycode_atoi["K"] = 10;
  keycode_itoa[11] = "L";
  keycode_atoi["L"] = 11;
  keycode_itoa[12] = "M";
  keycode_atoi["M"] = 12;
  keycode_itoa[13] = "N";
  keycode_atoi["N"] = 13;
  keycode_itoa[14] = "O";
  keycode_atoi["O"] = 14;
  keycode_itoa[15] = "P";
  keycode_atoi["P"] = 15;
  keycode_itoa[16] = "Q";
  keycode_atoi["Q"] = 16;
  keycode_itoa[17] = "R";
  keycode_atoi["R"] = 17;
  keycode_itoa[18] = "S";
  keycode_atoi["S"] = 18;
  keycode_itoa[19] = "T";
  keycode_atoi["T"] = 19;
  keycode_itoa[20] = "U";
  keycode_atoi["U"] = 20;
  keycode_itoa[21] = "V";
  keycode_atoi["V"] = 21;
  keycode_itoa[22] = "W";
  keycode_atoi["W"] = 22;
  keycode_itoa[23] = "X";
  keycode_atoi["X"] = 23;
  keycode_itoa[24] = "Y";
  keycode_atoi["Y"] = 24;
  keycode_itoa[25] = "Z";
  keycode_atoi["Z"] = 25;
  keycode_itoa[26] = "Num0";
  keycode_atoi["Num0"] = 26;
  keycode_itoa[27] = "Num1";
  keycode_atoi["Num1"] = 27;
  keycode_itoa[28] = "Num2";
  keycode_atoi["Num2"] = 28;
  keycode_itoa[29] = "Num3";
  keycode_atoi["Num3"] = 29;
  keycode_itoa[30] = "Num4";
  keycode_atoi["Num4"] = 30;
  keycode_itoa[31] = "Num5";
  keycode_atoi["Num5"] = 31;
  keycode_itoa[32] = "Num6";
  keycode_atoi["Num6"] = 32;
  keycode_itoa[33] = "Num7";
  keycode_atoi["Num7"] = 33;
  keycode_itoa[34] = "Num8";
  keycode_atoi["Num8"] = 34;
  keycode_itoa[35] = "Num9";
  keycode_atoi["Num9"] = 35;
  keycode_itoa[36] = "Escape";
  keycode_atoi["Escape"] = 36;
  keycode_itoa[37] = "LControl";
  keycode_atoi["LControl"] = 37;
  keycode_itoa[38] = "LShift";
  keycode_atoi["LShift"] = 38;
  keycode_itoa[39] = "LAlt";
  keycode_atoi["LAlt"] = 39;
  keycode_itoa[40] = "LSystem";
  keycode_atoi["LSystem"] = 40;
  keycode_itoa[41] = "RControl";
  keycode_atoi["RControl"] = 41;
  keycode_itoa[42] = "RShift";
  keycode_atoi["RShift"] = 42;
  keycode_itoa[43] = "RAlt";
  keycode_atoi["RAlt"] = 43;
  keycode_itoa[44] = "RSystem";
  keycode_atoi["RSystem"] = 44;
  keycode_itoa[45] = "Menu";
  keycode_atoi["Menu"] = 45;
  keycode_itoa[46] = "LBracket";
  keycode_atoi["LBracket"] = 46;
  keycode_itoa[47] = "RBracket";
  keycode_atoi["RBracket"] = 47;
  keycode_itoa[48] = "Semicolon";
  keycode_atoi["Semicolon"] = 48;
  keycode_itoa[49] = "Comma";
  keycode_atoi["Comma"] = 49;
  keycode_itoa[50] = "Period";
  keycode_atoi["Period"] = 50;
  keycode_itoa[51] = "Quote";
  keycode_atoi["Quote"] = 51;
  keycode_itoa[52] = "Slash";
  keycode_atoi["Slash"] = 52;
  keycode_itoa[53] = "Backslash";
  keycode_atoi["Backslash"] = 53;
  keycode_itoa[54] = "Tilde";
  keycode_atoi["Tilde"] = 54;
  keycode_itoa[55] = "Equal";
  keycode_atoi["Equal"] = 55;
  keycode_itoa[56] = "Hyphen";
  keycode_atoi["Hyphen"] = 56;
  keycode_itoa[57] = "Space";
  keycode_atoi["Space"] = 57;
  keycode_itoa[58] = "Enter";
  keycode_atoi["Enter"] = 58;
  keycode_itoa[59] = "Backspace";
  keycode_atoi["Backspace"] = 59;
  keycode_itoa[60] = "Tab";
  keycode_atoi["Tab"] = 60;
  keycode_itoa[61] = "PageUp";
  keycode_atoi["PageUp"] = 61;
  keycode_itoa[62] = "PageDown";
  keycode_atoi["PageDown"] = 62;
  keycode_itoa[63] = "End";
  keycode_atoi["End"] = 63;
  keycode_itoa[64] = "Home";
  keycode_atoi["Home"] = 64;
  keycode_itoa[65] = "Insert";
  keycode_atoi["Insert"] = 65;
  keycode_itoa[66] = "Delete";
  keycode_atoi["Delete"] = 66;
  keycode_itoa[67] = "Add";
  keycode_atoi["Add"] = 67;
  keycode_itoa[68] = "Subtract";
  keycode_atoi["Subtract"] = 68;
  keycode_itoa[69] = "Multiply";
  keycode_atoi["Multiply"] = 69;
  keycode_itoa[70] = "Divide";
  keycode_atoi["Divide"] = 70;
  keycode_itoa[71] = "Left";
  keycode_atoi["Left"] = 71;
  keycode_itoa[72] = "Right";
  keycode_atoi["Right"] = 72;
  keycode_itoa[73] = "Up";
  keycode_atoi["Up"] = 73;
  keycode_itoa[74] = "Down";
  keycode_atoi["Down"] = 74;
  keycode_itoa[75] = "Numpad0";
  keycode_atoi["Numpad0"] = 75;
  keycode_itoa[76] = "Numpad1";
  keycode_atoi["Numpad1"] = 76;
  keycode_itoa[77] = "Numpad2";
  keycode_atoi["Numpad2"] = 77;
  keycode_itoa[78] = "Numpad3";
  keycode_atoi["Numpad3"] = 78;
  keycode_itoa[79] = "Numpad4";
  keycode_atoi["Numpad4"] = 79;
  keycode_itoa[80] = "Numpad5";
  keycode_atoi["Numpad5"] = 80;
  keycode_itoa[81] = "Numpad6";
  keycode_atoi["Numpad6"] = 81;
  keycode_itoa[82] = "Numpad7";
  keycode_atoi["Numpad7"] = 82;
  keycode_itoa[83] = "Numpad8";
  keycode_atoi["Numpad8"] = 83;
  keycode_itoa[84] = "Numpad9";
  keycode_atoi["Numpad9"] = 84;
  keycode_itoa[85] = "F1";
  keycode_atoi["F1"] = 85;
  keycode_itoa[86] = "F2";
  keycode_atoi["F2"] = 86;
  keycode_itoa[87] = "F3";
  keycode_atoi["F3"] = 87;
  keycode_itoa[88] = "F4";
  keycode_atoi["F4"] = 88;
  keycode_itoa[89] = "F5";
  keycode_atoi["F5"] = 89;
  keycode_itoa[90] = "F6";
  keycode_atoi["F6"] = 90;
  keycode_itoa[91] = "F7";
  keycode_atoi["F7"] = 91;
  keycode_itoa[92] = "F8";
  keycode_atoi["F8"] = 92;
  keycode_itoa[93] = "F9";
  keycode_atoi["F9"] = 93;
  keycode_itoa[94] = "F10";
  keycode_atoi["F10"] = 94;
  keycode_itoa[95] = "F11";
  keycode_atoi["F11"] = 95;
  keycode_itoa[96] = "F12";
  keycode_atoi["F12"] = 96;
  keycode_itoa[97] = "F13";
  keycode_atoi["F13"] = 97;
  keycode_itoa[98] = "F14";
  keycode_atoi["F14"] = 98;
  keycode_itoa[99] = "F15";
  keycode_atoi["F15"] = 99;
  keycode_itoa[100] = "Pause";
  keycode_atoi["Pause"] = 100;
}

}  // namespace gen
}  // namespace node_sfml
