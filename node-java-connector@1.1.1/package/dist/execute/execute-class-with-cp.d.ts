/// <reference types="node" />
import { ChildProcess } from 'child_process';
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
export declare function executeClassWithCP(className: string, classPaths?: string[], args?: string[], jrePath?: string): Promise<ChildProcess>;
