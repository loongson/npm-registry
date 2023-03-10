"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugLogger = void 0;

function _fsExtra() {
  const data = require("fs-extra");

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _util() {
  const data = require("./util");

  _util = function () {
    return data;
  };

  return data;
}

class DebugLogger {
  constructor(isEnabled = true) {
    this.isEnabled = isEnabled;
    this.data = {};
  }

  add(key, value) {
    if (!this.isEnabled) {
      return;
    }

    const dataPath = key.split(".");
    let o = this.data;
    let lastName = null;

    for (const p of dataPath) {
      if (p === dataPath[dataPath.length - 1]) {
        lastName = p;
        break;
      } else {
        if (o[p] == null) {
          o[p] = Object.create(null);
        } else if (typeof o[p] === "string") {
          o[p] = [o[p]];
        }

        o = o[p];
      }
    }

    if (Array.isArray(o[lastName])) {
      o[lastName].push(value);
    } else {
      o[lastName] = value;
    }
  }

  save(file) {
    // toml and json doesn't correctly output multiline string as multiline
    if (this.isEnabled && Object.keys(this.data).length > 0) {
      return (0, _fsExtra().outputFile)(file, (0, _util().serializeToYaml)(this.data));
    } else {
      return Promise.resolve();
    }
  }

} exports.DebugLogger = DebugLogger;
// __ts-babel@6.0.4
//# sourceMappingURL=DebugLogger.js.map