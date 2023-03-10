class SystemUser {

  /**
  * @description Represents a user of a system.
  * @constructor
  * @param {Object} userInfo Node.js OS .userInfo()
  * @returns {SystemUser} SystemUser instance.
  */
  constructor (userInfo) {
    this.userName = userInfo.username,
    this.userDirectory = userInfo.homedir
  }

}

/**
* @exports {SystemUser}
*/
module.exports = SystemUser;
