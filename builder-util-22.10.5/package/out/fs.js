"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlinkIfExists = unlinkIfExists;
exports.statOrNull = statOrNull;
exports.exists = exists;
exports.walk = walk;
exports.copyFile = copyFile;
exports.copyOrLinkFile = copyOrLinkFile;
exports.copyDir = copyDir;
exports.USE_HARD_LINKS = exports.DO_NOT_USE_HARD_LINKS = exports.FileCopier = exports.CopyFileTransformer = exports.CONCURRENCY = exports.MAX_FILE_REQUESTS = void 0;

function _bluebirdLst() {
  const data = _interopRequireDefault(require("bluebird-lst"));

  _bluebirdLst = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = require("fs-extra");

  _fsExtra = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _statMode() {
  const data = require("stat-mode");

  _statMode = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = require("./log");

  _log = function () {
    return data;
  };

  return data;
}

function _promise() {
  const data = require("./promise");

  _promise = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MAX_FILE_REQUESTS = 8;
exports.MAX_FILE_REQUESTS = MAX_FILE_REQUESTS;
const CONCURRENCY = {
  concurrency: MAX_FILE_REQUESTS
};
exports.CONCURRENCY = CONCURRENCY;

class CopyFileTransformer {
  constructor(afterCopyTransformer) {
    this.afterCopyTransformer = afterCopyTransformer;
  }

}

exports.CopyFileTransformer = CopyFileTransformer;

function unlinkIfExists(file) {
  return (0, _fsExtra().unlink)(file).catch(() => {});
}

async function statOrNull(file) {
  return (0, _promise().orNullIfFileNotExist)((0, _fsExtra().stat)(file));
}

async function exists(file) {
  try {
    await (0, _fsExtra().access)(file);
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Returns list of file paths (system-dependent file separator)
 */


async function walk(initialDirPath, filter, consumer) {
  let result = [];
  const queue = [initialDirPath];
  let addDirToResult = false;
  const isIncludeDir = consumer == null ? false : consumer.isIncludeDir === true;

  while (queue.length > 0) {
    const dirPath = queue.pop();

    if (isIncludeDir) {
      if (addDirToResult) {
        result.push(dirPath);
      } else {
        addDirToResult = true;
      }
    }

    const childNames = await (0, _promise().orIfFileNotExist)((0, _fsExtra().readdir)(dirPath), []);
    childNames.sort();
    let nodeModuleContent = null;
    const dirs = []; // our handler is async, but we should add sorted files, so, we add file to result not in the mapper, but after map

    const sortedFilePaths = await _bluebirdLst().default.map(childNames, name => {
      if (name === ".DS_Store" || name === ".gitkeep") {
        return null;
      }

      const filePath = dirPath + path.sep + name;
      return (0, _fsExtra().lstat)(filePath).then(stat => {
        if (filter != null && !filter(filePath, stat)) {
          return null;
        }

        const consumerResult = consumer == null ? null : consumer.consume(filePath, stat, dirPath, childNames);

        if (consumerResult === false) {
          return null;
        } else if (consumerResult == null || !("then" in consumerResult)) {
          if (stat.isDirectory()) {
            dirs.push(name);
            return null;
          } else {
            return filePath;
          }
        } else {
          return consumerResult.then(it => {
            if (it != null && Array.isArray(it)) {
              nodeModuleContent = it;
              return null;
            } // asarUtil can return modified stat (symlink handling)


            if ((it != null && "isDirectory" in it ? it : stat).isDirectory()) {
              dirs.push(name);
              return null;
            } else {
              return filePath;
            }
          });
        }
      });
    }, CONCURRENCY);

    for (const child of sortedFilePaths) {
      if (child != null) {
        result.push(child);
      }
    }

    dirs.sort();

    for (const child of dirs) {
      queue.push(dirPath + path.sep + child);
    }

    if (nodeModuleContent != null) {
      result = result.concat(nodeModuleContent);
    }
  }

  return result;
}

const _isUseHardLink = process.platform !== "win32" && process.env.USE_HARD_LINKS !== "false" && (require("is-ci") || process.env.USE_HARD_LINKS === "true");

function copyFile(src, dest, isEnsureDir = true) {
  return (isEnsureDir ? (0, _fsExtra().ensureDir)(path.dirname(dest)) : Promise.resolve()).then(() => copyOrLinkFile(src, dest, null, false));
}
/**
 * Hard links is used if supported and allowed.
 * File permission is fixed ??? allow execute for all if owner can, allow read for all if owner can.
 *
 * ensureDir is not called, dest parent dir must exists
 */


function copyOrLinkFile(src, dest, stats, isUseHardLink, exDevErrorHandler) {
  if (isUseHardLink === undefined) {
    isUseHardLink = _isUseHardLink;
  }

  if (stats != null) {
    const originalModeNumber = stats.mode;
    const mode = new (_statMode().Mode)(stats);

    if (mode.owner.execute) {
      mode.group.execute = true;
      mode.others.execute = true;
    }

    mode.group.read = true;
    mode.others.read = true;
    mode.setuid = false;
    mode.setgid = false;

    if (originalModeNumber !== stats.mode) {
      if (_log().log.isDebugEnabled) {
        const oldMode = new (_statMode().Mode)({
          mode: originalModeNumber
        });

        _log().log.debug({
          file: dest,
          oldMode,
          mode
        }, "permissions fixed from");
      } // https://helgeklein.com/blog/2009/05/hard-links-and-permissions-acls/
      // Permissions on all hard links to the same data on disk are always identical. The same applies to attributes.
      // That means if you change the permissions/owner/attributes on one hard link, you will immediately see the changes on all other hard links.


      if (isUseHardLink) {
        isUseHardLink = false;

        _log().log.debug({
          dest
        }, "copied, but not linked, because file permissions need to be fixed");
      }
    }
  }

  if (isUseHardLink) {
    return (0, _fsExtra().link)(src, dest).catch(e => {
      if (e.code === "EXDEV") {
        const isLog = exDevErrorHandler == null ? true : exDevErrorHandler();

        if (isLog && _log().log.isDebugEnabled) {
          _log().log.debug({
            error: e.message
          }, "cannot copy using hard link");
        }

        return doCopyFile(src, dest, stats);
      } else {
        throw e;
      }
    });
  }

  return doCopyFile(src, dest, stats);
}

function doCopyFile(src, dest, stats) {
  const promise = (0, _fsExtra().copyFile)(src, dest);

  if (stats == null) {
    return promise;
  }

  return promise.then(() => (0, _fsExtra().chmod)(dest, stats.mode));
}

class FileCopier {
  constructor(isUseHardLinkFunction, transformer) {
    this.isUseHardLinkFunction = isUseHardLinkFunction;
    this.transformer = transformer;

    if (isUseHardLinkFunction === USE_HARD_LINKS) {
      this.isUseHardLink = true;
    } else {
      this.isUseHardLink = _isUseHardLink && isUseHardLinkFunction !== DO_NOT_USE_HARD_LINKS;
    }
  }

  async copy(src, dest, stat) {
    let afterCopyTransformer = null;

    if (this.transformer != null && stat != null && stat.isFile()) {
      let data = this.transformer(src);

      if (data != null) {
        if (typeof data === "object" && "then" in data) {
          data = await data;
        }

        if (data != null) {
          if (data instanceof CopyFileTransformer) {
            afterCopyTransformer = data.afterCopyTransformer;
          } else {
            await (0, _fsExtra().writeFile)(dest, data);
            return;
          }
        }
      }
    }

    const isUseHardLink = afterCopyTransformer == null && (!this.isUseHardLink || this.isUseHardLinkFunction == null ? this.isUseHardLink : this.isUseHardLinkFunction(dest));
    await copyOrLinkFile(src, dest, stat, isUseHardLink, isUseHardLink ? () => {
      // files are copied concurrently, so, we must not check here currentIsUseHardLink ??? our code can be executed after that other handler will set currentIsUseHardLink to false
      if (this.isUseHardLink) {
        this.isUseHardLink = false;
        return true;
      } else {
        return false;
      }
    } : null);

    if (afterCopyTransformer != null) {
      await afterCopyTransformer(dest);
    }
  }

}
/**
 * Empty directories is never created.
 * Hard links is used if supported and allowed.
 */


exports.FileCopier = FileCopier;

function copyDir(src, destination, options = {}) {
  const fileCopier = new FileCopier(options.isUseHardLink, options.transformer);

  if (_log().log.isDebugEnabled) {
    _log().log.debug({
      src,
      destination
    }, `copying${fileCopier.isUseHardLink ? " using hard links" : ""}`);
  }

  const createdSourceDirs = new Set();
  const links = [];
  return walk(src, options.filter, {
    consume: async (file, stat, parent) => {
      if (!stat.isFile() && !stat.isSymbolicLink()) {
        return;
      }

      if (!createdSourceDirs.has(parent)) {
        await (0, _fsExtra().ensureDir)(parent.replace(src, destination));
        createdSourceDirs.add(parent);
      }

      const destFile = file.replace(src, destination);

      if (stat.isFile()) {
        await fileCopier.copy(file, destFile, stat);
      } else {
        links.push({
          file: destFile,
          link: await (0, _fsExtra().readlink)(file)
        });
      }
    }
  }).then(() => _bluebirdLst().default.map(links, it => (0, _fsExtra().symlink)(it.link, it.file), CONCURRENCY));
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


const DO_NOT_USE_HARD_LINKS = file => false; // eslint-disable-next-line @typescript-eslint/no-unused-vars


exports.DO_NOT_USE_HARD_LINKS = DO_NOT_USE_HARD_LINKS;

const USE_HARD_LINKS = file => true; exports.USE_HARD_LINKS = USE_HARD_LINKS;
// __ts-babel@6.0.4
//# sourceMappingURL=fs.js.map