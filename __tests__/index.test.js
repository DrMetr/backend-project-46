import genDiff from "../src/gendiff.js";
import expected from "../__fixtures__/resultString.js";
import expected2 from "../__fixtures__/resultString2.js";

const filenames1 = ["filename1.json", "filename2.json"];
const filenames2 = ["filename1.yml", "filename2.yml"];
const filenames3 = ["file1.json", "file2.json"];

test("genDiff from hexlet jsons", () => {
  expect(genDiff(...filenames1)).toBe(expected);
});

test("genDiff from hexlet ymls", () => {
  expect(genDiff(...filenames2)).toBe(expected);
});

test("genDiff from hexlet jsons with nested values", () => {
  expect(genDiff(...filenames3, "plain")).toBe(expected2);
});
