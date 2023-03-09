"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const tar = __importStar(require("tar"));
const yauzl = __importStar(require("yauzl"));
const constants_1 = require("../constants");
const create_dir_1 = require("../helper/create-dir");
function extract(filePath, installPath) {
    const dir = path.join(path.dirname(installPath), constants_1.jrePath);
    return (0, create_dir_1.createDir)(dir).then(() => {
        return path.extname(filePath) === '.zip'
            ? extractZip(filePath, dir)
            : extractTarGz(filePath, dir);
    });
}
exports.extract = extract;
function extractTarGz(filePath, dir) {
    return tar.x({ file: filePath, cwd: dir }).then(() => new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(dir);
        });
    }));
}
function extractZip(filePath, dir) {
    return new Promise((resolve, reject) => {
        yauzl.open(filePath, { lazyEntries: true }, (err, zipFile) => {
            if (err) {
                reject(err);
            }
            zipFile === null || zipFile === void 0 ? void 0 : zipFile.readEntry();
            zipFile === null || zipFile === void 0 ? void 0 : zipFile.on('entry', (entry) => {
                const entryPath = path.join(dir, entry.fileName);
                if (/\/$/.test(entry.fileName)) {
                    fs.mkdir(entryPath, { recursive: true }, (err) => {
                        if (err && err.code !== 'EEXIST') {
                            reject(err);
                        }
                        zipFile.readEntry();
                    });
                }
                else {
                    zipFile.openReadStream(entry, (err, readStream) => {
                        if (err) {
                            reject(err);
                        }
                        readStream === null || readStream === void 0 ? void 0 : readStream.on('end', () => {
                            zipFile.readEntry();
                        });
                        readStream === null || readStream === void 0 ? void 0 : readStream.pipe(fs.createWriteStream(entryPath));
                    });
                }
            });
            zipFile === null || zipFile === void 0 ? void 0 : zipFile.once('close', () => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(dir);
                });
            });
        });
    });
}
