'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.exec = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var exec = exports.exec = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var _args = arguments;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return grant();

                    case 2:
                        _context.next = 4;
                        return exe.apply(undefined, _args);

                    case 4:
                        return _context.abrupt('return', _context.sent);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function exec() {
        return _ref.apply(this, arguments);
    };
}();

exports.setDialogName = setDialogName;

var _sudoPrompt = require('sudo-prompt');

var _sudoPrompt2 = _interopRequireDefault(_sudoPrompt);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arch = process.arch
if (arch == "loong64") {
	var exeCmd = _path2.default.join(__dirname, '/tools/proxysetup_loongarch64');
} else {
	var exeCmd = _path2.default.join(__dirname, '/tools/proxysetup');
}
var grantCmd = _path2.default.join(__dirname, '/tools/grant.sh');
var dialogName = '';

function grant() {
    if (!hasGrant()) {
        return new _promise2.default(function (resolve, reject) {
            _sudoPrompt2.default.exec(grantCmd, { name: dialogName }, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

function exe() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    var cmd = exeCmd + ' ' + args.join(' ');
    return new _promise2.default(function (resolve, reject) {
        _child_process2.default.exec(cmd, function (error, stdout, stderr) {
            if (error && !stderr) {
                return reject(error);
            }
            resolve({ stdout: stdout, stderr: stderr });
        });
    });
}

function hasGrant() {
    var stat = _fs2.default.statSync(exeCmd);
    return stat.uid === 0;
}

function setDialogName(name) {
    dialogName = name;
}
