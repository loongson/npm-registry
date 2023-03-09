"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedArchitecture = exports.defaultOptions = void 0;
exports.defaultOptions = {
    feature_version: 8,
    image_type: 'jre',
    openjdk_impl: 'hotspot',
    release_type: 'ga',
    heap_size: 'normal',
    vendor: 'adoptopenjdk',
    allow_system_java: false,
    install_path: __dirname,
};
const supportedArchitectures = [
    'x64',
    'x86',
    'x32',
    'ppc64',
    'ppc64le',
    's390x',
    'aarch64',
    'arm',
    'sparcv9',
    'riscv64',
];
const isSupportedArchitecture = (arch) => supportedArchitectures.includes(arch);
exports.isSupportedArchitecture = isSupportedArchitecture;
