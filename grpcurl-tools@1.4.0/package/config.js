const path = require('path');
const { name, version } = require('./package.json');

// github project
const project = 'fullstorydev/grpcurl';

const platform = {
  darwin_x32: 'osx_x86_32',
  darwin_x64: 'osx_x86_64',
  linux_x32: 'linux_x86_32',
  linux_x64: 'linux_x86_64',
  // win32_x32: 'win32',
  // win32_x64: 'win64',
}[`${process.platform}_${process.arch === 'ia32' ? 'x32' : process.arch}`];

if (!platform) {
  throw new Error(`The platform "${process.platform}-${process.arch}" is not supported.`);
}

module.exports = {
    name, 
    version,
    outputPath: path.join(__dirname, 'tools'),
    releaseUrl: `https://api.github.com/repos/${project}/releases`,
    fileName: `grpcurl_${version}_${platform}.tar.gz`,
};