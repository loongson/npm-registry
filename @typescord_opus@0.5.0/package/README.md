# @typescord/opus [![Build](https://github.com/discordjs/opus/workflows/Build/badge.svg)](https://github.com/discordjs/opus/actions?query=workflow%3ABuild) [![Prebuild](https://github.com/typescord/opus/workflows/Prebuild/badge.svg)](https://github.com/typescord/opus/actions?query=workflow%3APrebuild)
> Native bindings to libopus v1.3

## Usage

```js
const { Opus } = require('@typescord/opus');

// Create the encoder.
// Specify 48kHz sampling rate and 2 channel size.
const opus = new Opus(48000, 2);

// Encode and decode.
const encoded = opus.encode(buffer);
const decoded = opus.decode(encoded);
```

## Platform support
⚠ Node.js 12.0.0 or newer is required.

- Linux x64 & ia32
- Linux arm (RPi 1 & 2)
- Linux arm64 (RPi 3)
- Windows x64
- macOS x64
