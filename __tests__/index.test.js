const genDiff = require("../src/gendiff.js");
const fs = require("fs");
const expected = require("../__fixtures__/resultString.js");

test("genDiff from hexlet jsons", () => {
  const data = ["data/filename1.json", "data/filename2.json"]
    .map((item) => fs.readFileSync(item, "utf-8", (e) => console.log(e)))
    .map((item) => JSON.parse(item));
  expect(genDiff(...data)).toBe(expected);
});
