#!/usr/bin/env node
// CommonJS (.cjs)

const genDiff = require("../src/gendiff.js");
const { Command } = require("commander");
const program = new Command();
const { readFileSync } = require("node:fs");
const { cwd } = require("node:process");
const path = require("node:path");

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
  .option("-h, --help", "show help")
  .action((filepath1, filepath2) => {
    const opts = program.opts();
    if (opts.help) console.log(program.description());
    if (opts.version) console.log(program.version);

    const makeJSON = (x) =>
      JSON.parse(readFileSync(path.resolve(`${cwd()}`, x), "utf-8"));
    let [f1, f2] = [makeJSON(filepath1), makeJSON(filepath2)];
    console.log(genDiff(f1, f2));
  });

program.parse();
