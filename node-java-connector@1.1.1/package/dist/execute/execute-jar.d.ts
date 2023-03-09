/// <reference types="node" />
import { ChildProcess } from 'child_process';
/**
 * Starts the jar at the given path
 *
 * @export
 * @param {string} jarPath path to the jar-file which should be executed
 * @param {string[]} [args] optional arguments that will be appended while executing
 * @param {string} [jrePath] optional path to a JRE installation if other than default.
 * @returns {Promise<ChildProcess>}
 */
export declare function executeJar(jarPath: string, args?: string[], jrePath?: string): Promise<ChildProcess>;
