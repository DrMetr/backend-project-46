import _ from "lodash";

const formatDifferencesBasic = (diffs, style) => {
  let indentStyle;
  switch (style) {
    case "stylish":
      indentStyle = "..";
      break;
    case "spaces":
      indentStyle = "  ";
      break;
    default:
      throw new Error("No such style");
  }

  let arr = diffs
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue, children, indent }) => {
      indent = indent || 1;
      if (_.isPlainObject(value)) {
        value = formatNestedValue(value, indent + 1, indentStyle);
      }

      if (_.isPlainObject(newValue)) {
        value = formatNestedValue(newValue, indent + 1, indentStyle);
      }
      let sign;
      switch (operation) {
        case "added":
          sign = "+ ";
          break;
        case "deleted":
          sign = "- ";
          break;
        case "nested":
          return `  ${key}: ${formatDifferencesBasic(children, style)}`;
        case "changed":
          return `- ${key}: ${value}\n${indentStyle.repeat(indent)}+ ${key}: ${newValue}`;
        default:
          sign = "  ";
      }

      return `${sign}${key}: ${value}`;
    });
  return `{\n${indentStyle}${arr.join(`\n${indentStyle}`)}\n}`;
};

const formatNestedValue = (obj, indent, indentStyle, resultStr = "") => {
  let [[key, value]] = Object.entries(obj);
  if (!_.isPlainObject(value))
    return `{\n${indentStyle.repeat(indent + 1)}${key}: ${value}\n${indentStyle.repeat(indent)}}`;
  return formatNestedValue(value, indent + 1, indentStyle, resultStr);
};

export default formatDifferencesBasic;
