#!/usr/bin/env node

import { program } from 'commander';
import collectCode from '../src';

program
  .version('1.0.0')
  .argument('<entryFile>', 'Entry file (.js, .jsx, .ts, .tsx)')
  .option('-o, --output <outputFile>', 'Output file (default: stdout)')
  .parse(process.argv);

const options = program.opts();
const entryFile: string = program.args[0];
const outputFile: string | null = options.output || null;

collectCode(entryFile, outputFile);