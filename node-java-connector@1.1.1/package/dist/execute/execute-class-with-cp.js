"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeClassWithCP = void 0;
const child_process_1 = require("child_process");
const java_command_1 = require("../helper/java-command");
/**
 * Starts the class at the given path with given classpaths
 *
 * @export
 * @param {string} className Java classname to execute.
 * @param {string[]} [classPaths] optional Zip/Jar files to include to classpath.
 * @param {string[]} [args] optional arguments that will be appended while executing
 * @param {string} [jrePath] optional path to a JRE installation if other than default.
 * @returns {Promise<ChildProcess>}
 */
function executeClassWithCP(className, classPaths, args, jrePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const jreInstallPath = resolveJREInstallPath(jrePath);
        const javaCommand = yield (0, java_command_1.getJavaCommand)(jreInstallPath);
        const output = (0, child_process_1.spawn)(javaCommand, getClassArgs(className, classPaths, args));
        if (output.stderr) {
            output.stderr.pipe(process.stderr);
        }
        return output;
    });
}
exports.executeClassWithCP = executeClassWithCP;
function getClassArgs(className, classPaths = [], args = []) {
    const ret = args.slice();
    ret.unshift(className);
    ret.unshift(joinPaths(classPaths));
    ret.unshift('-cp');
    return ret;
}
function joinPaths(paths = []) {
    const pathSep = process.platform === 'win32' ? ';' : ':';
    return `${paths.join(pathSep)}`;
}
function resolveJREInstallPath(jrePath) {
    if (jrePath != null) {
        return jrePath;
    }
    return __dirname;
}
