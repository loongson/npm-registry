const { resolve } = require('path');
const { find } = require('@discordjs/node-pre-gyp');

const bindingPath = find(resolve(__dirname, '..', 'package.json'));
module.exports = require(bindingPath);
