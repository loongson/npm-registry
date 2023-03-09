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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJavaCommand = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const constants_1 = require("../constants");
const get_executable_1 = require("./get-executable");
const java_exists_1 = require("./java-exists");
function getJavaCommand(jreInstallPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return getJavaString(jreInstallPath);
        }
        catch (e) {
            // ignore exception
        }
        if (yield (0, java_exists_1.systemJavaExists)()) {
            return 'java';
        }
        throw Error('Unable to find locally-installed java or system-wide java');
    });
}
exports.getJavaCommand = getJavaCommand;
function getJavaString(jreInstallPath) {
    const pathOfJreFolder = path.join(path.resolve(jreInstallPath), '../', constants_1.jrePath);
    const files = (0, fs_1.readdirSync)(pathOfJreFolder);
    const file = files.filter((name) => !name.startsWith('._'));
    if (file.length > 1) {
        throw Error('JRE installation failed! Please install the package again.');
    }
    return path.join(pathOfJreFolder, file[0], (0, get_executable_1.getExecutable)());
}
