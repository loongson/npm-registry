# dwebp-bin ![GitHub Actions Status](https://github.com/1000ch/dwebp-bin/workflows/test/badge.svg?branch=main)

> [WebP](https://developers.google.com/speed/webp/) is a modern image format that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster.

## Install

```sh
$ npm install dwebp-bin
```

WebP requires following libraries on Linux. See [detail](https://developers.google.com/speed/webp/docs/compiling#compiling_on_unix-like_platforms).

```sh
$ sudo apt-get install libjpeg-dev libpng-dev libtiff-dev libgif-dev
```

## Usage

```js
import {execFile} from 'node:child_process';
import dwebp from 'dwebp-bin';

execFile(dwebp, ['input.webp', '-o', 'output.png'], error => {
  if (error) {
    throw error;
  }

  console.log('Image is converted!');
});
```

## CLI

```sh
$ npm install --global dwebp-bin
```

```sh
$ dwebp input.webp -o output.png
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
