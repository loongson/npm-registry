import { InstallOptions } from './install.typings';
/**
 * Installs a JRE copy for the app
 * @param options Installation Options for the JRE
 * @return Promise<string> - Resolves to the installation directory or rejects an error
 * @example
 *  const njc = require('node-java-connector')
 *
 *  // Use default options
 *  njc.install()
 *    .then(dir => {
 *      // Do stuff
 *    })
 *    .catch(err => {
 *      // Handle the error
 *    })
 *
 *  // or custom ones
 *  njc.install({ 11, os: 'aix', arch: 'ppc64', openjdk_impl: 'openj9' })
 *    .then(dir => {
 *      // Do stuff
 *    })
 *    .catch(err => {
 *      // Handle the error
 *    })
 */
export declare function install(givenOptions?: InstallOptions): Promise<string | undefined>;
export declare function getUrlToCall(options: InstallOptions): string;
