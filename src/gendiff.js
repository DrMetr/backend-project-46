import _ from "lodash";
import chooseFormatFunction from "./formatters/index.js";

const genDiff = (arg1, arg2, style = "spaces", format = "basic") => {
  const diffs = getDifferences(arg1, arg2);
  const formatter = chooseFormatFunction(format);

  if (format === "plain") {
    return formatter(diffs);
  } else {
    return formatter(diffs, style);
  }
};

const getDifferences = (obj1, obj2) => {
  const [data1, data2] = [Object.keys(obj1), Object.keys(obj2)];
  let all = _.sortBy(_.union(data1, data2));
  return all.map((key) => {
    const [val1, val2, has1, has2] = [
      obj1[key],
      obj2[key],
      _.has(obj1, key),
      _.has(obj2, key),
    ];

    if (!has1)
      return {
        key,
        value: val2,
        operation: "added",
      };
    if (!has2)
      return {
        key,
        value: val1,
        operation: "deleted",
      };
    if (
      _.isPlainObject(val1) &&
      _.isPlainObject(val2) &&
      val1 !== null &&
      val2 !== null
    )
      return {
        key,
        operation: "nested",
        children: getDifferences(val1, val2),
      };
    if (val1 === val2) return { key, value: val2, operation: "unchanged" };
    return {
      key,
      value: val1,
      operation: "changed",
      newValue: val2,
    };
  });
};

export default genDiff;
