import _ from "lodash";

const formatDifferencesPlain = (diffs, parent = "") => {
  if (parent !== "") parent = parent + ".";

  return diffs
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue, children }) => {
      const formatValue = (val) => {
        if (_.isPlainObject(val) && operation !== "nested")
          return "[complex value]";
        return val;
      };

      [value, newValue] = [value, newValue].map((item) => formatValue(item));
      switch (operation) {
        case "added":
          return `Property '${parent}${key}' was added with value: ${value}`;
        case "deleted":
          return `Property '${parent}${key}' was removed`;
        case "changed":
          return `Property '${parent}${key}' was updated. From ${value} to ${newValue}`;
        case "nested":
          return formatDifferencesPlain(children, parent + key);
        default:
          return "";
      }
    })
    .filter((item) => item !== "")
    .join("\n");
};

export default formatDifferencesPlain;
