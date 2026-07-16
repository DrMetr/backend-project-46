#!/usr/bin/env node

import genDiff from "../src/gendiff.js";
import { Command } from "commander";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

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
      const makeObject = (filepath) => {
        try {
          const readFile = readFileSync(
            path.resolve(`${cwd()}`, filepath),
            "utf-8",
          );
          if (/\.json$/.test(filepath)) {
            return JSON.parse(readFile);
          }
          if (/\.ya?ml/.test(filepath)) {
            return yaml.load(readFile);
          }
          return new Error("No such file");
        } catch (error) {
          console.log(error);
          return null;
        }
      };

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const getFixturePath = (name) =>
        path.resolve(__dirname, "..", "__fixtures__", name);

      const files = [filepath1, filepath2];
      let [f1, f2] = files
        .map((file) => getFixturePath(file))
        .map((file) => makeObject(file));
      console.log(filepath1, filepath2);
      if (f1 && f2) console.log(genDiff(f1, f2, style, opts.format));
    }
  });

program.parse();
