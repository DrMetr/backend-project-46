import { readFileSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

const getData = (filepath) => {
  const pathToFile = path.resolve(`${cwd()}`, "__fixtures__", filepath);
  return readFileSync(pathToFile, "utf-8", (err) => {
    console.log(err);
    return null;
  });
};
export default getData;
