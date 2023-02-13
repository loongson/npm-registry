"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLinuxArchString = toLinuxArchString;
exports.getArchCliNames = getArchCliNames;
exports.getArchSuffix = getArchSuffix;
exports.archFromString = archFromString;
exports.defaultArchFromString = defaultArchFromString;
exports.getArtifactArchName = getArtifactArchName;
exports.Arch = void 0;
var Arch;
exports.Arch = Arch;

(function (Arch) {
  Arch[Arch["ia32"] = 0] = "ia32";
  Arch[Arch["x64"] = 1] = "x64";
  Arch[Arch["armv7l"] = 2] = "armv7l";
  Arch[Arch["arm64"] = 3] = "arm64";
    Arch[Arch["loong64"] = 4] = "loong64";
    Arch[Arch["mips64el"] = 5] = "mips64el";
  Arch[Arch["universal"] = 6] = "universal";
})(Arch || (exports.Arch = Arch = {}));

function toLinuxArchString(arch, targetName) {
  switch (arch) {
    case Arch.x64:
      return "amd64";

    case Arch.ia32:
      return targetName === "pacman" ? "i686" : "i386";

    case Arch.armv7l:
      return targetName === "snap" || targetName === "deb" ? "armhf" : "armv7l";

    case Arch.arm64:
      return targetName === "pacman" ? "aarch64" : "arm64";

    case Arch.loong64:
      return targetName === "pacman" || targetName === "flatpak" ? "loong64" : "loongarch64";

    case Arch.mips64el:
      return targetName === "pacman" || targetName === "flatpak" ? "mips64el" : "mips64el";

    default:
      throw new Error(`Unsupported arch ${arch}`);
  }
}

function getArchCliNames() {
  return [Arch[Arch.ia32], Arch[Arch.x64], Arch[Arch.armv7l], Arch[Arch.arm64], Arch[Arch.loong64], Arch[Arch.mips64el]];
}

function getArchSuffix(arch, defaultArch) {
  return arch === defaultArchFromString(defaultArch) ? "" : `-${Arch[arch]}`;
}

function archFromString(name) {
  switch (name) {
    case "x64":
      return Arch.x64;

    case "ia32":
      return Arch.ia32;

    case "arm64":
      return Arch.arm64;

    case "armv7l":
      return Arch.armv7l;

    case "loong64":
      return Arch.loong64;

    case "mips64el":
      return Arch.mips64el;

    case "universal":
      return Arch.universal;

    default:
      throw new Error(`Unsupported arch ${name}`);
  }
}

function defaultArchFromString(name) {
  return name ? archFromString(name) : Arch.x64;
}

function getArtifactArchName(arch, ext) {
  let archName = Arch[arch];
  const isAppImage = ext === "AppImage" || ext === "appimage";

  if (arch === Arch.x64) {
    if (isAppImage || ext === "rpm") {
      archName = "x86_64";
    } else if (ext === "deb" || ext === "snap") {
      archName = "amd64";
    }
  } else if (arch === Arch.ia32) {
    if (ext === "deb" || isAppImage || ext === "snap") {
      archName = "i386";
    } else if (ext === "pacman" || ext === "rpm") {
      archName = "i686";
    }
  } else if (arch === Arch.armv7l) {
    if (ext === "snap") {
      archName = "armhf";
    }
  } else if (arch === Arch.arm64) {
    if (ext === "pacman" || ext === "rpm") {
      archName = "aarch64";
    }
  }
    else if (arch === Arch.loong64) {
        if (ext === "pacman" || ext === "rpm" || ext === "flatpak") {
            archName = "loong64";
        }
    }
    else if (arch === Arch.mips64el) {
        if (ext === "pacman" || ext === "rpm" || ext === "flatpak") {
            archName = "mips64el";
        }
    }

  return archName;
} 
// __ts-babel@6.0.4
//# sourceMappingURL=arch.js.map
