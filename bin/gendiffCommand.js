#!/usr/bin/env node

import genDiff from "../src/gendiff.js";
import { Command } from "commander";

const program = new Command();
program
  .name("gendiff")
  .version("1.0.0")
  .description(
    `Usage: gendiff [options] <filepath1> <filepath2>
    
    Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -f, --format [type]  output format
    -h, --help           display help for command
    `,
  )
  .argument("[filepath1]", "first filepath")
  .argument("[filepath2]", "second filepath")
  .argument("[style]", "style of the result")
  .option("-f, --format <type>", "output format plain by default")
  .option("-h, --help", "show help")
  .action((filepath1, filepath2, style) => {
    const opts = program.opts();
    if (opts.help) console.log(program.description());
    if (opts.version) console.log(program.version);

    if (filepath1 && filepath2) {
      console.log(genDiff(filepath1, filepath2, style, opts.format));
    }
  });

program.parse();
