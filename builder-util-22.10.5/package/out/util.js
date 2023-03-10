"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeToYaml = serializeToYaml;
exports.removePassword = removePassword;
exports.exec = exec;
exports.doSpawn = doSpawn;
exports.spawnAndWrite = spawnAndWrite;
exports.spawn = spawn;
exports.use = use;
exports.isEmptyOrSpaces = isEmptyOrSpaces;
exports.isTokenCharValid = isTokenCharValid;
exports.addValue = addValue;
exports.replaceDefault = replaceDefault;
exports.getPlatformIconFileName = getPlatformIconFileName;
exports.isPullRequest = isPullRequest;
exports.isEnvTrue = isEnvTrue;
exports.executeAppBuilder = executeAppBuilder;
exports.retry = retry;
Object.defineProperty(exports, "safeStringifyJson", {
  enumerable: true,
  get: function () {
    return _builderUtilRuntime().safeStringifyJson;
  }
});
Object.defineProperty(exports, "asArray", {
  enumerable: true,
  get: function () {
    return _builderUtilRuntime().asArray;
  }
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function () {
    return _log().log;
  }
});
Object.defineProperty(exports, "debug", {
  enumerable: true,
  get: function () {
    return _log().debug;
  }
});
Object.defineProperty(exports, "TmpDir", {
  enumerable: true,
  get: function () {
    return _tempFile().TmpDir;
  }
});
Object.defineProperty(exports, "Arch", {
  enumerable: true,
  get: function () {
    return _arch().Arch;
  }
});
Object.defineProperty(exports, "getArchCliNames", {
  enumerable: true,
  get: function () {
    return _arch().getArchCliNames;
  }
});
Object.defineProperty(exports, "toLinuxArchString", {
  enumerable: true,
  get: function () {
    return _arch().toLinuxArchString;
  }
});
Object.defineProperty(exports, "getArchSuffix", {
  enumerable: true,
  get: function () {
    return _arch().getArchSuffix;
  }
});
Object.defineProperty(exports, "archFromString", {
  enumerable: true,
  get: function () {
    return _arch().archFromString;
  }
});
Object.defineProperty(exports, "defaultArchFromString", {
  enumerable: true,
  get: function () {
    return _arch().defaultArchFromString;
  }
});
Object.defineProperty(exports, "AsyncTaskManager", {
  enumerable: true,
  get: function () {
    return _asyncTaskManager().AsyncTaskManager;
  }
});
Object.defineProperty(exports, "DebugLogger", {
  enumerable: true,
  get: function () {
    return _DebugLogger().DebugLogger;
  }
});
Object.defineProperty(exports, "copyFile", {
  enumerable: true,
  get: function () {
    return _fs().copyFile;
  }
});
Object.defineProperty(exports, "exists", {
  enumerable: true,
  get: function () {
    return _fs().exists;
  }
});
Object.defineProperty(exports, "deepAssign", {
  enumerable: true,
  get: function () {
    return _deepAssign().deepAssign;
  }
});
exports.InvalidConfigurationError = exports.ExecError = exports.debug7z = void 0;

function _zipBin() {
  const data = require("7zip-bin");

  _zipBin = function () {
    return data;
  };

  return data;
}

function _appBuilderBin() {
  const data = require("app-builder-bin");

  _appBuilderBin = function () {
    return data;
  };

  return data;
}

function _builderUtilRuntime() {
  const data = require("builder-util-runtime");

  _builderUtilRuntime = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

function _crypto() {
  const data = require("crypto");

  _crypto = function () {
    return data;
  };

  return data;
}

var _debug2 = _interopRequireDefault(require("debug"));

function _jsYaml() {
  const data = require("js-yaml");

  _jsYaml = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _sourceMapSupport() {
  const data = _interopRequireDefault(require("source-map-support"));

  _sourceMapSupport = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = require("./log");

  _log = function () {
    return data;
  };

  return data;
}

function _tempFile() {
  const data = require("temp-file");

  _tempFile = function () {
    return data;
  };

  return data;
}

function _arch() {
  const data = require("./arch");

  _arch = function () {
    return data;
  };

  return data;
}

function _asyncTaskManager() {
  const data = require("./asyncTaskManager");

  _asyncTaskManager = function () {
    return data;
  };

  return data;
}

function _DebugLogger() {
  const data = require("./DebugLogger");

  _DebugLogger = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = require("./fs");

  _fs = function () {
    return data;
  };

  return data;
}

function _deepAssign() {
  const data = require("./deepAssign");

  _deepAssign = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.JEST_WORKER_ID == null) {
  _sourceMapSupport().default.install();
}

const debug7z = (0, _debug2.default)("electron-builder:7z");
exports.debug7z = debug7z;

function serializeToYaml(object, skipInvalid = false, noRefs = false) {
  return (0, _jsYaml().dump)(object, {
    lineWidth: 8000,
    skipInvalid,
    noRefs
  });
}

function removePassword(input) {
  return input.replace(/(-String |-P |pass:| \/p |-pass |--secretKey |--accessKey |-p )([^ ]+)/g, (match, p1, p2) => {
    if (p1.trim() === "/p" && p2.startsWith("\\\\Mac\\Host\\\\")) {
      // appx /p
      return `${p1}${p2}`;
    }

    return `${p1}${(0, _crypto().createHash)("sha256").update(p2).digest("hex")} (sha256 hash)`;
  });
}

function getProcessEnv(env) {
  if (process.platform === "win32") {
    return env == null ? undefined : env;
  }

  const finalEnv = { ...(env || process.env)
  }; // without LC_CTYPE dpkg can returns encoded unicode symbols
  // set LC_CTYPE to avoid crash https://github.com/electron-userland/electron-builder/issues/503 Even "en_DE.UTF-8" leads to error.

  const locale = process.platform === "linux" ? process.env.LANG || "C.UTF-8" : "en_US.UTF-8";
  finalEnv.LANG = locale;
  finalEnv.LC_CTYPE = locale;
  finalEnv.LC_ALL = locale;
  return finalEnv;
}

function exec(file, args, options, isLogOutIfDebug = true) {
  if (_log().log.isDebugEnabled) {
    const logFields = {
      file,
      args: args == null ? "" : removePassword(args.join(" "))
    };

    if (options != null) {
      if (options.cwd != null) {
        logFields.cwd = options.cwd;
      }

      if (options.env != null) {
        const diffEnv = { ...options.env
        };

        for (const name of Object.keys(process.env)) {
          if (process.env[name] === options.env[name]) {
            delete diffEnv[name];
          }
        }

        logFields.env = (0, _builderUtilRuntime().safeStringifyJson)(diffEnv);
      }
    }

    _log().log.debug(logFields, "executing");
  }

  return new Promise((resolve, reject) => {
    (0, _child_process().execFile)(file, args, { ...options,
      maxBuffer: 1000 * 1024 * 1024,
      env: getProcessEnv(options == null ? null : options.env)
    }, (error, stdout, stderr) => {
      if (error == null) {
        if (isLogOutIfDebug && _log().log.isDebugEnabled) {
          const logFields = {
            file
          };

          if (stdout.length > 0) {
            logFields.stdout = stdout;
          }

          if (stderr.length > 0) {
            logFields.stderr = stderr;
          }

          _log().log.debug(logFields, "executed");
        }

        resolve(stdout.toString());
      } else {
        let message = _chalk().default.red(removePassword(`Exit code: ${error.code}. ${error.message}`));

        if (stdout.length !== 0) {
          if (file.endsWith("wine")) {
            stdout = stdout.toString();
          }

          message += `\n${_chalk().default.yellow(stdout.toString())}`;
        }

        if (stderr.length !== 0) {
          if (file.endsWith("wine")) {
            stderr = stderr.toString();
          }

          message += `\n${_chalk().default.red(stderr.toString())}`;
        }

        reject(new Error(message));
      }
    });
  });
}

function logSpawn(command, args, options) {
  // use general debug.enabled to log spawn, because it doesn't produce a lot of output (the only line), but important in any case
  if (!_log().log.isDebugEnabled) {
    return;
  }

  const argsString = removePassword(args.join(" "));
  const logFields = {
    command: command + " " + (command === "docker" ? argsString : removePassword(argsString))
  };

  if (options != null && options.cwd != null) {
    logFields.cwd = options.cwd;
  }

  _log().log.debug(logFields, "spawning");
}

function doSpawn(command, args, options, extraOptions) {
  if (options == null) {
    options = {};
  }

  options.env = getProcessEnv(options.env);

  if (options.stdio == null) {
    const isDebugEnabled = _log().debug.enabled; // do not ignore stdout/stderr if not debug, because in this case we will read into buffer and print on error


    options.stdio = [extraOptions != null && extraOptions.isPipeInput ? "pipe" : "ignore", isDebugEnabled ? "inherit" : "pipe", isDebugEnabled ? "inherit" : "pipe"];
  }

  logSpawn(command, args, options);

  try {
    return (0, _child_process().spawn)(command, args, options);
  } catch (e) {
    throw new Error(`Cannot spawn ${command}: ${e.stack || e}`);
  }
}

function spawnAndWrite(command, args, data, options) {
  const childProcess = doSpawn(command, args, options, {
    isPipeInput: true
  });
  const timeout = setTimeout(() => childProcess.kill(), 4 * 60 * 1000);
  return new Promise((resolve, reject) => {
    handleProcess("close", childProcess, command, () => {
      try {
        clearTimeout(timeout);
      } finally {
        resolve(undefined);
      }
    }, error => {
      try {
        clearTimeout(timeout);
      } finally {
        reject(error);
      }
    });
    childProcess.stdin.end(data);
  });
}

function spawn(command, args, options, extraOptions) {
  return new Promise((resolve, reject) => {
    handleProcess("close", doSpawn(command, args || [], options, extraOptions), command, resolve, reject);
  });
}

function handleProcess(event, childProcess, command, resolve, reject) {
  childProcess.on("error", reject);
  let out = "";

  if (childProcess.stdout != null) {
    childProcess.stdout.on("data", data => {
      out += data;
    });
  }

  let errorOut = "";

  if (childProcess.stderr != null) {
    childProcess.stderr.on("data", data => {
      errorOut += data;
    });
  }

  childProcess.once(event, code => {
    if (_log().log.isDebugEnabled) {
      const fields = {
        command: path.basename(command),
        code,
        pid: childProcess.pid
      };

      if (out.length > 0) {
        fields.out = out;
      }

      _log().log.debug(fields, "exited");
    }

    if (code === 0) {
      if (resolve != null) {
        resolve(out);
      }
    } else {
      reject(new ExecError(command, code, formatOut(out, "Output"), formatOut(errorOut, "Error output")));
    }
  });
}

function formatOut(text, title) {
  return text.length === 0 ? "" : `\n${title}:\n${text}`;
}

class ExecError extends Error {
  constructor(command, exitCode, out, errorOut, code = "ERR_ELECTRON_BUILDER_CANNOT_EXECUTE") {
    super(`${command} exited with code ${code}${formatOut(out, "Output")}${formatOut(errorOut, "Error output")}`);
    this.exitCode = exitCode;
    this.alreadyLogged = false;
    this.code = code;
  }

}

exports.ExecError = ExecError;

function use(value, task) {
  return value == null ? null : task(value);
}

function isEmptyOrSpaces(s) {
  return s == null || s.trim().length === 0;
}

function isTokenCharValid(token) {
  return /^[.\w/=+-]+$/.test(token);
}

function addValue(map, key, value) {
  const list = map.get(key);

  if (list == null) {
    map.set(key, [value]);
  } else if (!list.includes(value)) {
    list.push(value);
  }
}

function replaceDefault(inList, defaultList) {
  if (inList == null || inList.length === 1 && inList[0] === "default") {
    return defaultList;
  }

  const index = inList.indexOf("default");

  if (index >= 0) {
    const list = inList.slice(0, index);
    list.push(...defaultList);

    if (index !== inList.length - 1) {
      list.push(...inList.slice(index + 1));
    }

    inList = list;
  }

  return inList;
}

function getPlatformIconFileName(value, isMac) {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (!value.includes(".")) {
    return `${value}.${isMac ? "icns" : "ico"}`;
  }

  return value.replace(isMac ? ".ico" : ".icns", isMac ? ".icns" : ".ico");
}

function isPullRequest() {
  // TRAVIS_PULL_REQUEST is set to the pull request number if the current job is a pull request build, or false if it???s not.
  function isSet(value) {
    // value can be or null, or empty string
    return value && value !== "false";
  }

  return isSet(process.env.TRAVIS_PULL_REQUEST) || isSet(process.env.CIRCLE_PULL_REQUEST) || isSet(process.env.BITRISE_PULL_REQUEST) || isSet(process.env.APPVEYOR_PULL_REQUEST_NUMBER);
}

function isEnvTrue(value) {
  if (value != null) {
    value = value.trim();
  }

  return value === "true" || value === "" || value === "1";
}

class InvalidConfigurationError extends Error {
  constructor(message, code = "ERR_ELECTRON_BUILDER_INVALID_CONFIGURATION") {
    super(message);
    this.code = code;
  }

}

exports.InvalidConfigurationError = InvalidConfigurationError;

function executeAppBuilder(args, childProcessConsumer, extraOptions = {}, maxRetries = 0) {
  const command = _appBuilderBin().appBuilderPath;

  const env = { ...process.env,
    SZA_PATH: _zipBin().path7za,
    FORCE_COLOR: _chalk().default.level === 0 ? "0" : "1"
  };
  const cacheEnv = process.env.ELECTRON_BUILDER_CACHE;

  if (cacheEnv != null && cacheEnv.length > 0) {
    env.ELECTRON_BUILDER_CACHE = path.resolve(cacheEnv);
  }

  if (extraOptions.env != null) {
    Object.assign(env, extraOptions.env);
  }

  function runCommand() {
    return new Promise((resolve, reject) => {
      const childProcess = doSpawn(command, args, {
        env,
        stdio: ["ignore", "pipe", process.stdout],
        ...extraOptions
      });

      if (childProcessConsumer != null) {
        childProcessConsumer(childProcess);
      }

      handleProcess("close", childProcess, command, resolve, error => {
        if (error instanceof ExecError && error.exitCode === 2) {
          error.alreadyLogged = true;
        }

        reject(error);
      });
    });
  }

  if (maxRetries === 0) {
    return runCommand();
  } else {
    return retry(runCommand, maxRetries, 1000);
  }
}

async function retry(task, retriesLeft, interval) {
  try {
    return await task();
  } catch (error) {
    _log().log.info(`Above command failed, retrying ${retriesLeft} more times`);

    if (retriesLeft > 0) {
      await new Promise(resolve => setTimeout(resolve, interval));
      return await retry(task, retriesLeft - 1, interval);
    } else {
      throw error;
    }
  }
} 
// __ts-babel@6.0.4
//# sourceMappingURL=util.js.map