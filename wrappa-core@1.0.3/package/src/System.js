/**
 * @fileoverview System wrapper declaration.
 * @author Joshua Crowe, Apprentice Web & Database Developer
 * @copyright Crowes 2017.
 */

/**
* @const
* @type {os}
* @external
*/
const OperatingSystem = require('os');

/**
* @const
* @type {SystemProcessor}
* @external
*/
const SystemProcessor = require('./types/SystemProcessor');

/**
* @const
* @type {SystemMemory}
* @external
*/
const SystemMemory = require('./types/SystemMemory');

/**
* @const
* @type {SystemUser}
* @external
*/
const SystemUser = require('./types/SystemUser');


/**
* @class
* @classdesc Read information about the server.
*/
class System {

  /**
  * @description Get the name of the system.
  * @readonly
  * @returns {String} Name of the system.
  * @fires os#hostname
  */
  static get name () {
    return OperatingSystem.hostname();
  }

  /**
  * @description Get the current user of the system.
  * @readonly
  * @returns {SystemUser} User of the system.
  * @fires os#userInfo
  */
  static get user () {
    return new SystemUser(OperatingSystem.userInfo());
  }

  /**
  * @description Get the architecture of the system.
  * @readonly
  * @returns {String} Architecture of the system.
  * @fires os#arch
  */
  static get architecture () {
    switch (OperatingSystem.arch()) {
      case "arm": return "ARM 32-Bit"
      case "ia32":
      case "x86":
      case "x32": return "32-Bit"
      case "arm64":
      case "x64": return "64-Bit"
    }
  }

  /**
  * @description Get the platform of the system.
  * @returns {String} Platform of the system.
  * @fires os#platform or os#type, os#release
  */
  static get platform () {
    switch (OperatingSystem.platform() || OperatingSystem.type()) {
      case "Darwin":
      case "darwin": return `Mac OS V${OperatingSystem.release()}`
      case "Windows_NT":
      case "win32": return `Windows V${OperatingSystem.release()}`
      case "Linux":
      case "linux": return `Linux V${OperatingSystem.release()}`
      default: return `${OperatingSystem.platform()} V${OperatingSystem.release()}`
    }
  }

  /**
  * @description Get the processors of the system.
  * @readonly
  * @returns {Array.<SystemProcessor>} Processors of the system.
  * @fires os#cpus
  */
  static get processors () {
    return OperatingSystem.cpus().map(cpu => new SystemProcessor(cpu));
  }

  /**
  * @description Get the memory of the system.
  * @readonly
  * @returns {SystemMemory} Memory of the system.
  * @fires os#freemem, os#totalmem
  */
  static get memory () {
    return new SystemMemory(OperatingSystem.freemem(), OperatingSystem.totalmem());
  }

  /**
  * @description Get the uptime of the system.
  * @readonly
  * @returns {Number} Uptime of system in seconds.
  * @fires os#uptime
  */
  static get uptime () {
    return Math.floor(OperatingSystem.uptime());
  }

}

/**
* @exports {System}
*/
module.exports = System;
