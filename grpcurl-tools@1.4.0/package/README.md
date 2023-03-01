# grpcurl-tools

NPM package for installing grpcurl command-line tools for osx and linux

Usage:

```
npm install grpcurl-tools
```

Once installed, `grpcurl` will be installed to `node_modules/.bin/grpcurl` and can be used normally from npm scripts in the associated package.json file.

This tool install _should_ support mac/osx and linux in both 32-bit and 64-bit environments.

## What happens...

The npm package will download the release associated with the version of `grpcurl-tools` installed from the following location:

* https://github.com/fullstorydev/grpcurl/releases

This package will attempt to identify the correct download zip and extract the files at install time.
