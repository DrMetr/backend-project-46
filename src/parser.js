import { extname } from "path";
import yaml from "js-yaml";
import getData from "./getData.js";

const parserOptions = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (filepath) => {
  const extension = extname(filepath).slice(1); // extname возвращает строку в виде ".json", так что нужно срезать точку, иначе parseOptions ругается
  const fullPath = getData(filepath);
  return parserOptions[extension](fullPath);
};

export default parse;
