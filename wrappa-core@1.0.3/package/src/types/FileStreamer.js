/**
* @const
* @type {fs}
* @external
*/
const FileSystem = require('graceful-fs');

/**
* @class FileStreamer
* @classdesc Stream to or from a file.
*/
class FileStreamer {

  /**
   * @description Stream from or to a file.
   * @constructor
   * @param {String} streamerType Type of stream to establish.
   * @param {String} streamerFile Path to the file.
   * @returns {FileStreamer} FileStreamer instance.
   * @fires fs#createReadStream or fs#createWriteStream
   */
  constructor (streamerType, streamerFile) {
    this.fileStreamerType = streamerType;
    this.fileStreamerFile = streamerFile;

    if (this.fileStreamerType === "read") {
      this.fileStreamerStream = FileSystem.createReadStream(this.fileStreamerFile);
    } else if (this.fileStreamerType === "write") {
      this.fileStreamerStream = FileSystem.createWriteStream(this.fileStreamerFile, {flags: 'a'});
    }
  }

  /**
   * @description Read the file.
   * @function readCallback Function to fire on data read.
   * @fires stream#on
   */
  read (readCallback) {
    if (this.fileStreamerType === 'read' && this.fileStreamerStream) {
      this.fileStreamerStream.on('data', readCallback);
    } else {
      throw Error("This is not a readable stream.");
    }
  }

  /**
   * @description Write to the file.
   * @param {String} writeData Data to write.
   * @fires FileStream#write
   */
  write (writeData) {
    if (this.fileStreamerType === 'write' && this.fileStreamerStream) {
      this.fileStreamerStream.write(writeData);
    } else {
      throw Error("This is not a writeable stream.");
    }
  }

  /**
   * @description Pipe to the file.
   * @param {Stream} pipeData Stream to pipe from.
   * @fires stream#pipe
   */
  pipe (pipeData) {
    if (this.fileStreamerType === 'write' && this.fileStreamerStream) {
      this.fileStreamerStream.pipe(pipeData);
    } else {
      throw Error("This is not a writeable stream");
    }
  }

}


/**
* @exports {FileStreamer}
*/
module.exports = FileStreamer;
