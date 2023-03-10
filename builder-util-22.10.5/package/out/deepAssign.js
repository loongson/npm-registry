"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepAssign = deepAssign;

function isObject(x) {
  if (Array.isArray(x)) {
    return false;
  }

  const type = typeof x;
  return type === "object" || type === "function";
}

function assignKey(target, from, key) {
  const value = from[key]; // https://github.com/electron-userland/electron-builder/pull/562

  if (value === undefined) {
    return;
  }

  const prevValue = target[key];

  if (prevValue == null || value == null || !isObject(prevValue) || !isObject(value)) {
    target[key] = value;
  } else {
    target[key] = assign(prevValue, value);
  }
}

function assign(to, from) {
  if (to !== from) {
    for (const key of Object.getOwnPropertyNames(from)) {
      assignKey(to, from, key);
    }
  }

  return to;
}

function deepAssign(target, ...objects) {
  for (const o of objects) {
    if (o != null) {
      assign(target, o);
    }
  }

  return target;
} 
// __ts-babel@6.0.4
//# sourceMappingURL=deepAssign.js.map