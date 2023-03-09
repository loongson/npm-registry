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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlToCall = exports.install = void 0;
/* eslint-disable unused-imports/no-unused-vars,@typescript-eslint/no-unused-vars */
const fs = __importStar(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const path = __importStar(require("path"));
const create_dir_1 = require("../helper/create-dir");
const java_exists_1 = require("../helper/java-exists");
const extract_1 = require("./extract");
const generate_install_options_1 = require("./generate-install-options");
const staticOpenJdkUrl = 'https://api.adoptopenjdk.net/v3/binary/latest/';
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
function install(givenOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((givenOptions === null || givenOptions === void 0 ? void 0 : givenOptions.allow_system_java) == true && (yield (0, java_exists_1.systemJavaExists)())) {
            return Promise.resolve(undefined);
        }
        const options = (0, generate_install_options_1.generateInstallOptions)(givenOptions);
        const url = getUrlToCall(options);
        const installPath = `${options.install_path}`;
        const jreKeyPath = path.join(installPath, 'jre');
        return download(jreKeyPath, url)
            .then((downloadPath) => moveOneFolderUp(downloadPath, installPath))
            .then((filePath) => (0, extract_1.extract)(filePath, installPath));
    });
}
exports.install = install;
function getUrlToCall(options) {
    return `${staticOpenJdkUrl}${options.feature_version}/${options.release_type}/${options.os}/${options.arch}/${options.image_type}/${options.openjdk_impl}/${options.heap_size}/${options.vendor}`;
}
exports.getUrlToCall = getUrlToCall;
function download(dir, url) {
    return new Promise((resolve, reject) => {
        (0, create_dir_1.createDir)(dir)
            .then(() => (0, node_fetch_1.default)(url))
            .then((response) => {
            var _a, _b;
            const fileName = (_a = response.headers
                .get('content-disposition')) === null || _a === void 0 ? void 0 : _a.split('=')[1];
            const destinationFilePath = path.join(dir, fileName !== null && fileName !== void 0 ? fileName : path.basename(url));
            const destStream = fs.createWriteStream(destinationFilePath);
            (_b = response.body) === null || _b === void 0 ? void 0 : _b.pipe(destStream).on('finish', () => resolve(destinationFilePath)).on('error', (err) => reject(err));
        })
            .catch((err) => reject(err));
    });
}
function moveOneFolderUp(filePath, installPath) {
    return new Promise((resolve, reject) => {
        const newFilePath = path.join(installPath, filePath.split(path.sep).slice(-1)[0]);
        fs.copyFile(filePath, newFilePath, (err) => {
            if (err) {
                reject(err);
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(newFilePath);
            });
        });
    });
}
