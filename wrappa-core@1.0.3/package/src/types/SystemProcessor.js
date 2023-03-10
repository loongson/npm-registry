class SystemProcessor {

  /**
  * @description Represent a processor.
  * @constructor
  * @param {Object} processorCPU Node.js OS.cpus()
  * @returns {SystemProcessor} Processor of the system.
  */
  constructor (processorCPU) {
    this.processorModel = processorCPU.model,
    this.processorSpeed = processorCPU.speed

    this.processorTime = Object.values(processorCPU.times)
      .reduce((s, k) => s + parseInt(k));
    this.processorMode = new Map([
      ['User', processorCPU.times.user],
      ['Nice', processorCPU.times.nice],
      ['SYS', processorCPU.times.sys],
      ['Idle', processorCPU.times.idle],
      ['IRQ', processorCPU.times.irq]
    ]);
  }

}

/**
* @exports {SystemProcessor}
*/
module.exports = SystemProcessor;
