"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemJavaExists = void 0;
const find_java_home_1 = __importDefault(require("find-java-home"));
function systemJavaExists() {
    return __awaiter(this, void 0, void 0, function* () {
        let ret = false;
        const systemJavaHome = yield getSystemJavaHome();
        if (!!systemJavaHome && systemJavaHome !== '') {
            ret = true;
        }
        return ret;
    });
}
exports.systemJavaExists = systemJavaExists;
function getSystemJavaHome() {
    return __awaiter(this, void 0, void 0, function* () {
        let ret = '';
        yield (0, find_java_home_1.default)({ allowJre: true }, (err, home) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return;
            }
            ret = home;
        }));
        return ret;
    });
}
