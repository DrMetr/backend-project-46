import _ from "lodash";

const formatDifferencesBasic = (diffs, indent = 1) => {
  const countSpaces = (indent) => {
    let count = indent * 4 - 2;
    if (count < 1) return "";
    return " ".repeat(count);
  };

  let arr = diffs
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue, children }) => {
      const checkValues = (val) => {
        if (_.isPlainObject(val) && operation !== "nested") {
          const nestedChildren = Object.keys(val).map((k) => ({
            key: k,
            value: val[k],
            operation: "unchanged",
          }));

          return formatDifferencesBasic(nestedChildren, indent + 1);
        }
        return val;
      };

      [value, newValue] = [value, newValue].map((item) => checkValues(item));

      let sign = "  ";
      switch (operation) {
        case "added":
          sign = "+ ";
          break;
        case "deleted":
          sign = "- ";
          break;
        case "nested":
          return `${countSpaces(indent)}${key}: ${formatDifferencesBasic(
            children,
            indent + 2,
          )}`;
        case "changed":
          return `${countSpaces(indent)}- ${key}: ${value}\n${countSpaces(indent)}+ ${key}: ${newValue}`;
      }

      return `${countSpaces(indent)}${sign}${key}: ${value}`;
    });
  return `{\n${arr.join(`\n`)}\n${indent === 1 ? "" : countSpaces(indent)}}`;
};

export default formatDifferencesBasic;
