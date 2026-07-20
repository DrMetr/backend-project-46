import makeComparison from "./makeComparison.js";
import chooseFormatFunction from "./formatters/index.js";
import parse from "./parser.js";

const genDiff = (path1, path2, format = "stylish") => {
  const diffs = makeComparison(parse(path1), parse(path2));
  const formatter = chooseFormatFunction(format);

  return formatter(diffs);
};

export default genDiff;
