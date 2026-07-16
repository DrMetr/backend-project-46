import formatDifferencesStylish from "./stylish.js";
import formatDifferencesPlain from "./plain.js";
import formatDifferencesJSON from "./json.js";

const chooseFormatFunction = (format) => {
  const functions = {
    stylish: formatDifferencesStylish,
    plain: formatDifferencesPlain,
    json: formatDifferencesJSON,
  };
  return functions[format] ?? new Error("No such format");
};

export default chooseFormatFunction;
