/**
 * @fileoverview File wrapper declaration.
 * @author Joshua Crowe, Apprentice Web & Database Developer
 * @copyright Crowes 2017.
 */

/**
* @const
* @type {fs}
* @external
*/
const FileSystem = require('graceful-fs');

/**
* @const
* @type {mkdirp}
* @external
*/
const MakeDirectory = require('mkdirp');

/**
* @const
* @type {path}
* @external
*/
const Path = require('path');

/**
* @const
* @type {FileStreamer}
* @external
*/
const FileStreamer = require('./types/FileStreamer');


/**
* @class
* @classdesc Operate on the file system of the server.
*/
class File {

  /**
  * @description Get the dependency of this wrapper.
  * @returns {fs} FileSystem.
  */
  get root () {
    return FileSystem;
  }

  /**
  * @description Get the constants from fs.
  * @returns {Object.<String>} FileSystem constants.
  */
  get constants () {
    return FileSystem.constants;
  }


  /**
  * @description Read a file.
  * @param {String} filePath Path to the file to read.
  * @returns {Promise.<String>} File contents.
  * @fires fs#readFile
  */
  static readFile (filePath, fileEncoding) {
    return new Promise(function (fileResolve, fileReject) {
      FileSystem.readFile(filePath, fileEncoding, function (fileError, fileContents) {
        if (fileError) fileReject(fileError); fileResolve(fileContents);
      });
    });
  }

  /**
  * @description Resolve a file extension from the file path.
  * @param {String} filePath Path to the file.
  * @returns {String} Extension of the file.
  * @fires path#extname
  */
  static extensionFile (filePath) {
    return Path.extname(filePath);
  }

  /**
  * @description Resolve a file name from the path.
  * @param {String} filePath Path to the file.
  * @param {String} fileExtension Extension of the file to ignore.
  * @returns {String} File name.
  * @fires path#basename
  */
  static pathFile (filePath, fileExtension) {
    return Path.basename(filePath, fileExtension);
  }

  /**
  * @description Resolve the directory a file is in.
  * @param {String} filePath Path to the file.
  * @returns {String} Directory of the file.
  * @fires path#dirname
  */
  static directoryFile (filePath) {
    return Path.dirname(filePath);
  }

  /**
  * @description Stream from or to a file.
  * @param {String} filePath Path to the file.
  * @param {String} fileStream Type of stream (read/write)
  * @returns {FileStreamer} Stream to the file.
  */
  static streamFile (filePath, fileStream) {
    return new FileStreamer(fileStream, filePath);
  }


  /**
  * @description Append to a file.
  * @param {String} filePath Path to the file to append to.
  * @param {String} fileData Data to append to the file.
  * @returns {Promise.<void>}
  * @fires fs#appendFile
  */
  static appendFile (filePath, fileData) {
    return new Promise(function (fileResolve, fileReject) {
      FileSystem.appendFile(filePath, fileData, fileError => {
        if (fileError) directoryReject(fileError); fileResolve();
      })
    })
  }

  /**
  * @description Rename a file.
  * @param {String} filePath Path to the file to rename.
  * @param {String} fileRenme New name for the file.
  * @returns {Promise.<void>}
  * @fires fs#renameFile
  */
  static renameFile (filePath, fileRename) {
    return new Promise(function (fileResolve, fileReject) {
      const fileNew = filePath.substring(0, filePath.lastIndexOf('/') + 1);

      FileSystem.rename(filePath, (fileNew + fileRename), fileError => {
        if (fileError) fileReject(fileError); fileResolve();
      });
    });
  }

  /**
  * @description Write to a file.
  * @param {String} filePath Path to the file to write to.
  * @param {String} fileData Data to write to the file.
  * @returns {Promise.<void>}
  * @fires fs#writeFile
  */
  static writeFile (filePath, fileData) {
    return new Promise(function (fileResolve, fileReject) {
      FileSystem.writeFile(filePath, fileData, fileError => {
        if (fileError) fileReject(fileError); fileResolve();
      });
    });
  }

  /**
   * @description Delete a file.
   * @param {String} filePath Path to the file to delete.
   * @returns {Promise.<void>}
   * @fires fs#unlink
   */
  static deleteFile (filePath) {
    return new Promise(function (fileResolve, fileReject) {
      FileSystem.unlink(filePath, fileError => {
        if (fileError) fileReject(fileError); fileResolve();
      });
    });
  }

  /**
  * @description Try a directory for permissions.
  * @param {String} directoryPath Path to the directory to try.
  * @returns {Promise.<void>}
  * @fires fs#access
  */
  static tryDirectory (directoryPath) {
    return new Promise(function (directoryResolve, directoryReject) {
      FileSystem.access(directoryPath, directoryError => {
        if (directoryError) directoryReject(directoryError); directoryResolve();
      });
    });
  }

  /**
   * @description Read a directory.
   * @param {String} directoryPath Path to the directory to read.
   * @returns {Promise.<Array.<String>>} Items in the directory.
   * @fires fs#readdir
   */
  static readDirectory (directoryPath) {
    return new Promise(function (directoryResolve, directoryReject) {
      FileSystem.readdir(directoryPath, function (directoryError, directoryContents) {
        if (directoryError) directoryReject(directoryError); directoryResolve(directoryContents);
      });
    });
  }

  /**
  * @description Create a directory.
  * @param {String} directoryPath Path to the new directory.
  * @returns {Promise.<void>}
  * @fires fs#mkdir
  */
  static createDirectory (directoryPath) {
    return new Promise(function (directoryResolve, directoryReject) {
      MakeDirectory(directoryPath, directoryError => {
        if (directoryError) directoryReject(directoryError); directoryResolve();
      });
    });
  }

  /**
   * @description Delete a directory.
   * @param {String} directoryPath Path to the directory to delete.
   * @returns {Promise.<void>}
   * @fires fs#rmdir
   */
  static deleteDirectory (directoryPath) {
    return new Promise(function (directoryResolve, directoryReject) {
      FileSystem.rmdir(directoryPath, directoryError => {
        if (directoryError) directoryReject(directoryError); directoryResolve();
      });
    });
  }

}

/**
* @exports {File}
*/
module.exports = File;
