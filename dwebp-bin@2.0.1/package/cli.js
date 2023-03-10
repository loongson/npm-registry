#!/usr/bin/env node
import {spawn} from 'node:child_process';
import process from 'node:process';
import binPath from './index.js';

spawn(binPath, process.argv.slice(2), {
  stdio: 'inherit',
}).on('exit', process.exit);
