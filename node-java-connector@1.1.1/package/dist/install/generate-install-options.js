"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstallOptions = void 0;
const install_typings_1 = require("./install.typings");
function generateInstallOptions(parameter) {
    const optionsWithDefault = Object.assign(Object.assign({}, install_typings_1.defaultOptions), parameter);
    if (!optionsWithDefault.os) {
        optionsWithDefault.os = getOperatingSystem();
    }
    if (!optionsWithDefault.arch) {
        optionsWithDefault.arch = getArchitecture();
    }
    return optionsWithDefault;
}
exports.generateInstallOptions = generateInstallOptions;
function getOperatingSystem() {
    switch (process.platform) {
        case 'aix':
            return 'aix';
        case 'darwin':
            return 'mac';
        case 'linux':
            return 'linux';
        case 'sunos':
            return 'solaris';
        case 'win32':
            return 'windows';
        default:
            throw new Error('Unsupported operating system');
    }
}
function getArchitecture() {
    if ((0, install_typings_1.isSupportedArchitecture)(process.arch)) {
        return process.arch;
    }
    switch (process.arch) {
        case 'ia32':
            return 'x32';
        case 'arm64':
            return 'aarch64';
        case 's390':
            return 's390x';
        default:
            throw new Error('Unsupported architecture');
    }
}
