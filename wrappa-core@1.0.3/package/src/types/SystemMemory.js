class SystemMemory {

  /**
  * @description Represent system memory.
  * @constructor
  * @param {Number} memoryFree Free memory as bytes.
  * @param {Number} memoryTotal Free memory as bytes.
  * @returns {SystemMemory} Memory of the system.
  */
  constructor (memoryFree, memoryTotal) {
    this.memoryFree = memoryFree;
    this.memoryTotal = memoryTotal;
  }

  /**
  * Get the free memory percentage.
  * @returns {String} Free memory percentage.
  */
  get percentageFree () {
    return `${Math.floor((this.memoryFree / this.memoryTotal) * 100)}%`;
  }

  /**
  * Get the in-use memory percentage.
  * @returns {String} In-use memory percentage.
  */
  get percentageUse () {
    return `${100 - parseInt(this.percentageFree, 10)}%`;
  }

}

/**
* @exports {SystemMemory}
*/
module.exports = SystemMemory;
