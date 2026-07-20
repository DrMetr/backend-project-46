import _ from "lodash";

const formatDifferencesBasic = (diffs, indent = 1) => {
  const countSpaces = (indent) => {
    let count = indent * 4 - 2;
    //if (count < 1) return "";
    return " ".repeat(count);
  };
  const countSpacesForClosingBraces = (indent) => {
    let count = indent * 4;
    if (count < 1) return "";
    return " ".repeat(count);
  };
  const checkValues = (val) => {
    if (_.isPlainObject(val)) {
      const nestedChildren = Object.keys(val).map((k) => ({
        key: k,
        value: val[k],
        operation: "unchanged",
      }));

      return formatDifferencesBasic(nestedChildren, indent + 1);
    }
    return val;
  };

  let arr = diffs.map(({ operation, key, value, newValue, children }) => {
    let sign = "  ";
    switch (operation) {
      case "added":
        sign = "+ ";
        break;
      case "deleted":
        sign = "- ";
        break;
      case "nested":
        return `${countSpaces(indent)}  ${key}: ${formatDifferencesBasic(
          children,
          indent + 1,
        )}`;
      case "changed":
        return `${countSpaces(indent)}- ${key}: ${checkValues(value)}\n${countSpaces(indent)}+ ${key}: ${checkValues(newValue)}`;
    }

    return `${countSpaces(indent)}${sign}${key}: ${checkValues(value)}`;
  });

  return `{\n${arr.join(`\n`)}\n${indent === 1 ? "" : countSpacesForClosingBraces(indent)}}`;
};

export default formatDifferencesBasic;
