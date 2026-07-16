import { readFileSync } from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const parse = (filepath) => {
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
      return new Error("No such file or extension");
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (name) =>
    path.resolve(__dirname, "..", "__fixtures__", name);

  let [fileObject] = [filepath]
    .map((file) =>
      file.includes("__fixtures__")
        ? path.resolve(__dirname, "..", file)
        : getFixturePath(file),
    )
    .map((file) => makeObject(file));
  return fileObject;
};

export default parse;
