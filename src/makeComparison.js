import _ from "lodash";

const makeCompare = (arg1, arg2) => {
  const [data1, data2] = [Object.keys(arg1), Object.keys(arg2)];
  let all = _.sortBy(_.union(data1, data2));
  return all.map((key) => {
    const val1 = arg1[key],
      val2 = arg2[key],
      has1 = _.has(arg1, key),
      has2 = _.has(arg2, key);

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
    if (_.isPlainObject(val1) && _.isPlainObject(val2))
      return {
        key,
        operation: "nested",
        children: makeCompare(val1, val2),
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

export default makeCompare;
