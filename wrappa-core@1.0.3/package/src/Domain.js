/**
 * @fileoverview Domain wrapper declaration.
 * @author Joshua Crowe, Apprentice Web & Database Developer
 * @copyright Crowes 2017.
 */

/**
* @const
* @type {DNS}
* @external
*/
const DomainNameServer = require('dns');

/**
* @class
* @classdesc Operate on the DNS of the server.
*/
class Domain {

  /**
   * @description Get the server IPs.
   * @returns {Array.<String>} Server IPs.
   * @fires dns#getServers
   */
  get server () {
    return DomainNameServer.getServers();
  }

  /**
   * @description Set the server IPs.
   * @param {Array.<String>} serverSets Server IPs.
   * @returns {Array.<String>} Server IPs.
   * @fires dns#setServers
   */
  set server (serverSets) {
    DomainNameServer.setServers(serverSets);
    return this.server;
  }

  /**
  * @description Lookup the IP address for a domain.
  * @param {String} ipHostname Name of the host.
  * @returns {Promise.<String>} IP address for the domain.
  * @fires dns#lookup
  */
  static ip (ipHostname) {
    return new Promise((ipResolve, ipReject) => {
      DomainNameServer.lookup(ipHostname, (ipError, ipAddress) => {
        if (ipError) ipReject(ipError); ipResolve(ipAddress);
      });
    });
  }

  /**
  * @description Lookup a domain for an IP address.
  * @param {String} hostIP IP address of the server.
  * @param {Number} hostPort Port of the server.
  * @returns {Promise.<String>} Domain of the server.
  * @fires dns#lookupService
  */
  static host (hostIP, hostPort) {
    return new Promise((hostResolve, hostReject) => {
      DomainNameServer.lookupService(hostIP, hostPort, (hostError, hostHostname) => {
        if (hostError) hostReject(hostError); hostResolve(hostHostname);
      });
    });
  }

  /**
  * @description Look up a record for a server.
  * @param {String} recordAddress Address for the server.
  * @param {String} recordType Type of record to look up.
  * @returns {Promise.<String>} Record of the server.
  * @fires dns#resolve
  */
  static record (recordAddress, recordType) {
    return new Promise((recordResolve, recordReject) => {
      DomainNameServer.resolve(recordAddress, recordType, (recordError, recordRecord) => {
        if (recordError) recordRecord(recordError); recordResolve(recordRecord);
      });
    });
  }

}

/**
* @exports {Domain}
*/
module.exports = Domain;
