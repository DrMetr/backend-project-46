import genDiff from "../src/gendiff.js";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import expected from "../__fixtures__/resultString.js";
import expected2 from "../__fixtures__/resultString2.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) =>
  path.join(__dirname, "..", "__fixtures__", name);
const filenames1 = ["filename1.json", "filename2.json"];
const filenames2 = ["filename1.yml", "filename2.yml"];
const filenemes3 = ["file1.json", "file2.json"];

test("genDiff from hexlet jsons", () => {
  const data = filenames1
    .map((item) => getFixturePath(item))
    .map((item) => fs.readFileSync(item, "utf-8", (e) => console.log(e)))
    .map((item) => JSON.parse(item));
  expect(genDiff(...data, "spaces")).toBe(expected);
});

test("genDiff from hexlet ymls", () => {
  const data = filenames2
    .map((item) => getFixturePath(item))
    .map((item) => fs.readFileSync(item, "utf-8", (e) => console.log(e)))
    .map((item) => yaml.load(item));
  expect(genDiff(...data, "spaces")).toBe(expected);
});

test("genDiff from hexlet jsons with nested values", () => {
  const data = filenemes3
    .map((item) => getFixturePath(item))
    .map((item) => fs.readFileSync(item, "utf-8", (e) => console.log(e)))
    .map((item) => JSON.parse(item));
  expect(genDiff(...data, "spaces", "plain")).toBe(expected2);
});
