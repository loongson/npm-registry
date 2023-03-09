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
exports.executeJar = void 0;
const child_process_1 = require("child_process");
const java_command_1 = require("../helper/java-command");
/**
 * Starts the jar at the given path
 *
 * @export
 * @param {string} jarPath path to the jar-file which should be executed
 * @param {string[]} [args] optional arguments that will be appended while executing
 * @param {string} [jrePath] optional path to a JRE installation if other than default.
 * @returns {Promise<ChildProcess>}
 */
function executeJar(jarPath, args, jrePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const jreInstallPath = resolveJREInstallPath(jrePath);
        const javaCommand = yield (0, java_command_1.getJavaCommand)(jreInstallPath);
        const output = (0, child_process_1.spawn)(javaCommand, getJarArgs(jarPath, args));
        if (output.stderr) {
            output.stderr.pipe(process.stderr);
        }
        return output;
    });
}
exports.executeJar = executeJar;
function getJarArgs(jarPath, args = []) {
    const ret = args.slice();
    ret.unshift(jarPath);
    ret.unshift('-jar');
    return ret;
}
function resolveJREInstallPath(jrePath) {
    if (jrePath != null) {
        return jrePath;
    }
    return __dirname;
}
