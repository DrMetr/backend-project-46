import _ from "lodash";

const formatDifferencesBasic = (diffs, style, indent = 2) => {
  let indentStyle = "..";
  if (style === "spaces") indentStyle = "  ";
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

          return formatDifferencesBasic(nestedChildren, style, indent + 1);
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
          return `${indentStyle.repeat(indent)}${key}: ${formatDifferencesBasic(
            children,
            style,
            indent + 1,
          )}`;
        case "changed":
          return `${indentStyle.repeat(indent)}- ${key}: ${value}\n${indentStyle.repeat(indent)}+ ${key}: ${newValue}`;
      }

      return `${indentStyle.repeat(indent)}${sign}${key}: ${value}`;
    });
  return `{\n${arr.join(`\n`)}\n${indentStyle.repeat(indent)}}`;
};

export default formatDifferencesBasic;
