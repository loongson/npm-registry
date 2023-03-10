"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPrinter = setPrinter;
exports.log = exports.Logger = exports.PADDING = exports.debug = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

var _debug2 = _interopRequireDefault(require("debug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let printer = null;
const debug = (0, _debug2.default)("electron-builder");
exports.debug = debug;

function setPrinter(value) {
  printer = value;
}

const PADDING = 2;
exports.PADDING = PADDING;

class Logger {
  constructor(stream) {
    this.stream = stream;

    this.messageTransformer = it => it;
  }

  filePath(file) {
    const cwd = process.cwd();
    return file.startsWith(cwd) ? file.substring(cwd.length + 1) : file;
  } // noinspection JSMethodCanBeStatic


  get isDebugEnabled() {
    return debug.enabled;
  }

  info(messageOrFields, message) {
    this.doLog(message, messageOrFields, "info");
  }

  error(messageOrFields, message) {
    this.doLog(message, messageOrFields, "error");
  }

  warn(messageOrFields, message) {
    this.doLog(message, messageOrFields, "warn");
  }

  debug(fields, message) {
    if (debug.enabled) {
      this._doLog(message, fields, "debug");
    }
  }

  doLog(message, messageOrFields, level) {
    if (message === undefined) {
      this._doLog(messageOrFields, null, level);
    } else {
      this._doLog(message, messageOrFields, level);
    }
  }

  _doLog(message, fields, level) {
    // noinspection SuspiciousInstanceOfGuard
    if (message instanceof Error) {
      message = message.stack || message.toString();
    } else {
      message = message.toString();
    }

    const levelIndicator = level === "error" ? "⨯" : "•";
    const color = LEVEL_TO_COLOR[level];
    this.stream.write(`${" ".repeat(PADDING)}${color(levelIndicator)} `);
    this.stream.write(Logger.createMessage(this.messageTransformer(message, level), fields, level, color, PADDING + 2
    /* level indicator and space */
    ));
    this.stream.write("\n");
  }

  static createMessage(message, fields, level, color, messagePadding = 0) {
    if (fields == null) {
      return message;
    }

    const fieldPadding = " ".repeat(Math.max(2, 16 - message.length));
    let text = (level === "error" ? color(message) : message) + fieldPadding;
    const fieldNames = Object.keys(fields);
    let counter = 0;

    for (const name of fieldNames) {
      let fieldValue = fields[name];
      let valuePadding = null;

      if (fieldValue != null && typeof fieldValue === "string" && fieldValue.includes("\n")) {
        valuePadding = " ".repeat(messagePadding + message.length + fieldPadding.length + 2);
        fieldValue = "\n" + valuePadding + fieldValue.replace(/\n/g, `\n${valuePadding}`);
      } else if (Array.isArray(fieldValue)) {
        fieldValue = JSON.stringify(fieldValue);
      }

      text += `${color(name)}=${fieldValue}`;

      if (++counter !== fieldNames.length) {
        if (valuePadding == null) {
          text += " ";
        } else {
          text += "\n" + valuePadding;
        }
      }
    }

    return text;
  }

  log(message) {
    if (printer == null) {
      this.stream.write(`${message}\n`);
    } else {
      printer(message);
    }
  }

}

exports.Logger = Logger;
const LEVEL_TO_COLOR = {
  info: _chalk().default.blue,
  warn: _chalk().default.yellow,
  error: _chalk().default.red,
  debug: _chalk().default.white
};
const log = new Logger(process.stdout); exports.log = log;
// __ts-babel@6.0.4
//# sourceMappingURL=log.js.map