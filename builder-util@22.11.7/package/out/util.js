"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = exports.executeAppBuilder = exports.InvalidConfigurationError = exports.isEnvTrue = exports.isPullRequest = exports.getPlatformIconFileName = exports.replaceDefault = exports.addValue = exports.isTokenCharValid = exports.isEmptyOrSpaces = exports.use = exports.ExecError = exports.spawn = exports.spawnAndWrite = exports.doSpawn = exports.exec = exports.removePassword = exports.serializeToYaml = exports.debug7z = exports.deepAssign = exports.asArray = exports.exists = exports.copyFile = exports.DebugLogger = exports.AsyncTaskManager = exports.defaultArchFromString = exports.archFromString = exports.getArchSuffix = exports.toLinuxArchString = exports.getArchCliNames = exports.Arch = exports.debug = exports.log = exports.TmpDir = exports.safeStringifyJson = void 0;
const _7zip_bin_1 = require("7zip-bin");
const app_builder_bin_1 = require("app-builder-bin");
const builder_util_runtime_1 = require("builder-util-runtime");
const chalk = require("chalk");
const child_process_1 = require("child_process");
const crypto_1 = require("crypto");
const debug_1 = require("debug");
const js_yaml_1 = require("js-yaml");
const path = require("path");
const log_1 = require("./log");
const source_map_support_1 = require("source-map-support");
if (process.env.JEST_WORKER_ID == null) {
    source_map_support_1.install();
}
var builder_util_runtime_2 = require("builder-util-runtime");
Object.defineProperty(exports, "safeStringifyJson", { enumerable: true, get: function () { return builder_util_runtime_2.safeStringifyJson; } });
var temp_file_1 = require("temp-file");
Object.defineProperty(exports, "TmpDir", { enumerable: true, get: function () { return temp_file_1.TmpDir; } });
var log_2 = require("./log");
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return log_2.log; } });
Object.defineProperty(exports, "debug", { enumerable: true, get: function () { return log_2.debug; } });
var arch_1 = require("./arch");
Object.defineProperty(exports, "Arch", { enumerable: true, get: function () { return arch_1.Arch; } });
Object.defineProperty(exports, "getArchCliNames", { enumerable: true, get: function () { return arch_1.getArchCliNames; } });
Object.defineProperty(exports, "toLinuxArchString", { enumerable: true, get: function () { return arch_1.toLinuxArchString; } });
Object.defineProperty(exports, "getArchSuffix", { enumerable: true, get: function () { return arch_1.getArchSuffix; } });
Object.defineProperty(exports, "archFromString", { enumerable: true, get: function () { return arch_1.archFromString; } });
Object.defineProperty(exports, "defaultArchFromString", { enumerable: true, get: function () { return arch_1.defaultArchFromString; } });
var asyncTaskManager_1 = require("./asyncTaskManager");
Object.defineProperty(exports, "AsyncTaskManager", { enumerable: true, get: function () { return asyncTaskManager_1.AsyncTaskManager; } });
var DebugLogger_1 = require("./DebugLogger");
Object.defineProperty(exports, "DebugLogger", { enumerable: true, get: function () { return DebugLogger_1.DebugLogger; } });
var fs_1 = require("./fs");
Object.defineProperty(exports, "copyFile", { enumerable: true, get: function () { return fs_1.copyFile; } });
Object.defineProperty(exports, "exists", { enumerable: true, get: function () { return fs_1.exists; } });
var builder_util_runtime_3 = require("builder-util-runtime");
Object.defineProperty(exports, "asArray", { enumerable: true, get: function () { return builder_util_runtime_3.asArray; } });
var deepAssign_1 = require("./deepAssign");
Object.defineProperty(exports, "deepAssign", { enumerable: true, get: function () { return deepAssign_1.deepAssign; } });
exports.debug7z = debug_1.default("electron-builder:7z");
function serializeToYaml(object, skipInvalid = false, noRefs = false) {
    return js_yaml_1.dump(object, {
        lineWidth: 8000,
        skipInvalid,
        noRefs,
    });
}
exports.serializeToYaml = serializeToYaml;
function removePassword(input) {
    return input.replace(/(-String |-P |pass:| \/p |-pass |--secretKey |--accessKey |-p )([^ ]+)/g, (match, p1, p2) => {
        if (p1.trim() === "/p" && p2.startsWith("\\\\Mac\\Host\\\\")) {
            // appx /p
            return `${p1}${p2}`;
        }
        return `${p1}${crypto_1.createHash("sha256").update(p2).digest("hex")} (sha256 hash)`;
    });
}
exports.removePassword = removePassword;
function getProcessEnv(env) {
    if (process.platform === "win32") {
        return env == null ? undefined : env;
    }
    const finalEnv = {
        ...(env || process.env),
    };
    // without LC_CTYPE dpkg can returns encoded unicode symbols
    // set LC_CTYPE to avoid crash https://github.com/electron-userland/electron-builder/issues/503 Even "en_DE.UTF-8" leads to error.
    const locale = process.platform === "linux" ? process.env.LANG || "C.UTF-8" : "en_US.UTF-8";
    finalEnv.LANG = locale;
    finalEnv.LC_CTYPE = locale;
    finalEnv.LC_ALL = locale;
    return finalEnv;
}
function exec(file, args, options, isLogOutIfDebug = true) {
    if (log_1.log.isDebugEnabled) {
        const logFields = {
            file,
            args: args == null ? "" : removePassword(args.join(" ")),
        };
        if (options != null) {
            if (options.cwd != null) {
                logFields.cwd = options.cwd;
            }
            if (options.env != null) {
                const diffEnv = { ...options.env };
                for (const name of Object.keys(process.env)) {
                    if (process.env[name] === options.env[name]) {
                        delete diffEnv[name];
                    }
                }
                logFields.env = builder_util_runtime_1.safeStringifyJson(diffEnv);
            }
        }
        log_1.log.debug(logFields, "executing");
    }
    return new Promise((resolve, reject) => {
        child_process_1.execFile(file, args, {
            ...options,
            maxBuffer: 1000 * 1024 * 1024,
            env: getProcessEnv(options == null ? null : options.env),
        }, (error, stdout, stderr) => {
            if (error == null) {
                if (isLogOutIfDebug && log_1.log.isDebugEnabled) {
                    const logFields = {
                        file,
                    };
                    if (stdout.length > 0) {
                        logFields.stdout = stdout;
                    }
                    if (stderr.length > 0) {
                        logFields.stderr = stderr;
                    }
                    log_1.log.debug(logFields, "executed");
                }
                resolve(stdout.toString());
            }
            else {
                let message = chalk.red(removePassword(`Exit code: ${error.code}. ${error.message}`));
                if (stdout.length !== 0) {
                    if (file.endsWith("wine")) {
                        stdout = stdout.toString();
                    }
                    message += `\n${chalk.yellow(stdout.toString())}`;
                }
                if (stderr.length !== 0) {
                    if (file.endsWith("wine")) {
                        stderr = stderr.toString();
                    }
                    message += `\n${chalk.red(stderr.toString())}`;
                }
                reject(new Error(message));
            }
        });
    });
}
exports.exec = exec;
function logSpawn(command, args, options) {
    // use general debug.enabled to log spawn, because it doesn't produce a lot of output (the only line), but important in any case
    if (!log_1.log.isDebugEnabled) {
        return;
    }
    const argsString = removePassword(args.join(" "));
    const logFields = {
        command: command + " " + (command === "docker" ? argsString : removePassword(argsString)),
    };
    if (options != null && options.cwd != null) {
        logFields.cwd = options.cwd;
    }
    log_1.log.debug(logFields, "spawning");
}
function doSpawn(command, args, options, extraOptions) {
    if (options == null) {
        options = {};
    }
    options.env = getProcessEnv(options.env);
    if (options.stdio == null) {
        const isDebugEnabled = log_1.debug.enabled;
        // do not ignore stdout/stderr if not debug, because in this case we will read into buffer and print on error
        options.stdio = [extraOptions != null && extraOptions.isPipeInput ? "pipe" : "ignore", isDebugEnabled ? "inherit" : "pipe", isDebugEnabled ? "inherit" : "pipe"];
    }
    logSpawn(command, args, options);
    try {
        return child_process_1.spawn(command, args, options);
    }
    catch (e) {
        throw new Error(`Cannot spawn ${command}: ${e.stack || e}`);
    }
}
exports.doSpawn = doSpawn;
function spawnAndWrite(command, args, data, options) {
    const childProcess = doSpawn(command, args, options, { isPipeInput: true });
    const timeout = setTimeout(() => childProcess.kill(), 4 * 60 * 1000);
    return new Promise((resolve, reject) => {
        handleProcess("close", childProcess, command, () => {
            try {
                clearTimeout(timeout);
            }
            finally {
                resolve(undefined);
            }
        }, error => {
            try {
                clearTimeout(timeout);
            }
            finally {
                reject(error);
            }
        });
        childProcess.stdin.end(data);
    });
}
exports.spawnAndWrite = spawnAndWrite;
function spawn(command, args, options, extraOptions) {
    return new Promise((resolve, reject) => {
        handleProcess("close", doSpawn(command, args || [], options, extraOptions), command, resolve, reject);
    });
}
exports.spawn = spawn;
function handleProcess(event, childProcess, command, resolve, reject) {
    childProcess.on("error", reject);
    let out = "";
    if (childProcess.stdout != null) {
        childProcess.stdout.on("data", (data) => {
            out += data;
        });
    }
    let errorOut = "";
    if (childProcess.stderr != null) {
        childProcess.stderr.on("data", (data) => {
            errorOut += data;
        });
    }
    childProcess.once(event, (code) => {
        if (log_1.log.isDebugEnabled) {
            const fields = {
                command: path.basename(command),
                code,
                pid: childProcess.pid,
            };
            if (out.length > 0) {
                fields.out = out;
            }
            log_1.log.debug(fields, "exited");
        }
        if (code === 0) {
            if (resolve != null) {
                resolve(out);
            }
        }
        else {
            reject(new ExecError(command, code, out, errorOut));
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
exports.use = use;
function isEmptyOrSpaces(s) {
    return s == null || s.trim().length === 0;
}
exports.isEmptyOrSpaces = isEmptyOrSpaces;
function isTokenCharValid(token) {
    return /^[.\w/=+-]+$/.test(token);
}
exports.isTokenCharValid = isTokenCharValid;
function addValue(map, key, value) {
    const list = map.get(key);
    if (list == null) {
        map.set(key, [value]);
    }
    else if (!list.includes(value)) {
        list.push(value);
    }
}
exports.addValue = addValue;
function replaceDefault(inList, defaultList) {
    if (inList == null || (inList.length === 1 && inList[0] === "default")) {
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
exports.replaceDefault = replaceDefault;
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
exports.getPlatformIconFileName = getPlatformIconFileName;
function isPullRequest() {
    // TRAVIS_PULL_REQUEST is set to the pull request number if the current job is a pull request build, or false if it???s not.
    function isSet(value) {
        // value can be or null, or empty string
        return value && value !== "false";
    }
    return (isSet(process.env.TRAVIS_PULL_REQUEST) || isSet(process.env.CIRCLE_PULL_REQUEST) || isSet(process.env.BITRISE_PULL_REQUEST) || isSet(process.env.APPVEYOR_PULL_REQUEST_NUMBER));
}
exports.isPullRequest = isPullRequest;
function isEnvTrue(value) {
    if (value != null) {
        value = value.trim();
    }
    return value === "true" || value === "" || value === "1";
}
exports.isEnvTrue = isEnvTrue;
class InvalidConfigurationError extends Error {
    constructor(message, code = "ERR_ELECTRON_BUILDER_INVALID_CONFIGURATION") {
        super(message);
        this.code = code;
    }
}
exports.InvalidConfigurationError = InvalidConfigurationError;
function executeAppBuilder(args, childProcessConsumer, extraOptions = {}, maxRetries = 0) {
    const command = app_builder_bin_1.appBuilderPath;
    const env = {
        ...process.env,
        SZA_PATH: _7zip_bin_1.path7za,
        FORCE_COLOR: chalk.level === 0 ? "0" : "1",
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
                ...extraOptions,
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
    }
    else {
        return retry(runCommand, maxRetries, 1000);
    }
}
exports.executeAppBuilder = executeAppBuilder;
async function retry(task, retriesLeft, interval) {
    try {
        return await task();
    }
    catch (error) {
        log_1.log.info(`Above command failed, retrying ${retriesLeft} more times`);
        if (retriesLeft > 0) {
            await new Promise(resolve => setTimeout(resolve, interval));
            return await retry(task, retriesLeft - 1, interval);
        }
        else {
            throw error;
        }
    }
}
exports.retry = retry;
//# sourceMappingURL=util.js.map