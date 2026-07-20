import _ from "lodash";

const formatDifferencesPlain = (diffs, parent = "") => {
  if (parent !== "") parent = parent + ".";
  const formatValue = (val) => {
    if (_.isPlainObject(val)) return "[complex value]";
    if (typeof val === "string") return `'${val}'`;
    if (val === "") return `''`;
    return val;
  };

  return diffs
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue, children }) => {
      switch (operation) {
        case "added":
          return `Property '${parent}${key}' was added with value: ${formatValue(value)}`;
        case "deleted":
          return `Property '${parent}${key}' was removed`;
        case "changed":
          return `Property '${parent}${key}' was updated. From ${formatValue(value)} to ${formatValue(newValue)}`;
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
