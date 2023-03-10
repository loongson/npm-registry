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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cbQsStringify = exports.nsServerStrToDuraLevel = exports.duraLevelToNsServerStr = exports.goDurationStrToMs = exports.msToGoDurationStr = exports.CompoundTimeout = exports.PromiseHelper = void 0;
const generaltypes_1 = require("./generaltypes");
const parse_duration_1 = __importDefault(require("parse-duration"));
const qs = __importStar(require("querystring"));
/**
 * @internal
 */
class PromiseHelper {
    /**
     * @internal
     */
    static wrapAsync(fn, callback) {
        // If a callback in in use, we wrap the promise with a handler which
        // forwards to the callback and return undefined.  If there is no
        // callback specified.  We directly return the promise.
        if (callback) {
            const prom = fn();
            prom
                .then((res) => callback(null, res))
                .catch((err) => callback(err, null));
            return prom;
        }
        return fn();
    }
    /**
     * @internal
     */
    static wrap(fn, callback) {
        const prom = new Promise((resolve, reject) => {
            fn((err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
        if (callback) {
            prom
                .then((res) => callback(null, res))
                .catch((err) => callback(err, null));
        }
        return prom;
    }
}
exports.PromiseHelper = PromiseHelper;
/**
 * @internal
 */
class CompoundTimeout {
    /**
     * @internal
     */
    constructor(timeout) {
        this._start = process.hrtime();
        this._timeout = timeout;
    }
    /**
     * @internal
     */
    left() {
        if (this._timeout === undefined) {
            return undefined;
        }
        const period = process.hrtime(this._start);
        const periodMs = period[0] * 1e3 + period[1] / 1e6;
        if (periodMs > this._timeout) {
            return 0;
        }
        return this._timeout - periodMs;
    }
    /**
     * @internal
     */
    expired() {
        const timeLeft = this.left();
        if (timeLeft === undefined) {
            return false;
        }
        return timeLeft <= 0;
    }
}
exports.CompoundTimeout = CompoundTimeout;
/**
 * @internal
 */
function msToGoDurationStr(ms) {
    if (ms === undefined) {
        return undefined;
    }
    return `${ms}ms`;
}
exports.msToGoDurationStr = msToGoDurationStr;
/**
 * @internal
 */
function goDurationStrToMs(str) {
    if (str === undefined) {
        return undefined;
    }
    const duration = parse_duration_1.default(str);
    if (duration === null) {
        return undefined;
    }
    return duration;
}
exports.goDurationStrToMs = goDurationStrToMs;
/**
 * @internal
 */
function duraLevelToNsServerStr(level) {
    if (level === undefined) {
        return undefined;
    }
    if (typeof level === 'string') {
        return level;
    }
    if (level === generaltypes_1.DurabilityLevel.None) {
        return 'none';
    }
    else if (level === generaltypes_1.DurabilityLevel.Majority) {
        return 'majority';
    }
    else if (level === generaltypes_1.DurabilityLevel.MajorityAndPersistOnMaster) {
        return 'majorityAndPersistActive';
    }
    else if (level === generaltypes_1.DurabilityLevel.PersistToMajority) {
        return 'persistToMajority';
    }
    else {
        throw new Error('invalid durability level specified');
    }
}
exports.duraLevelToNsServerStr = duraLevelToNsServerStr;
/**
 * @internal
 */
function nsServerStrToDuraLevel(level) {
    if (level === 'none') {
        return generaltypes_1.DurabilityLevel.None;
    }
    else if (level === 'majority') {
        return generaltypes_1.DurabilityLevel.Majority;
    }
    else if (level === 'majorityAndPersistActive') {
        return generaltypes_1.DurabilityLevel.MajorityAndPersistOnMaster;
    }
    else if (level === 'persistToMajority') {
        return generaltypes_1.DurabilityLevel.PersistToMajority;
    }
    else {
        throw new Error('invalid durability level string');
    }
}
exports.nsServerStrToDuraLevel = nsServerStrToDuraLevel;
/**
 * @internal
 */
function cbQsStringify(values, options) {
    const cbValues = {};
    for (const i in values) {
        if (values[i] === undefined) {
            // skipped
        }
        else if (typeof values[i] === 'boolean') {
            if (options && options.boolAsString) {
                cbValues[i] = values[i] ? 'true' : 'false';
            }
            else {
                cbValues[i] = values[i] ? 1 : 0;
            }
        }
        else {
            cbValues[i] = values[i];
        }
    }
    return qs.stringify(cbValues);
}
exports.cbQsStringify = cbQsStringify;
