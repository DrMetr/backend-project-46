import _ from "lodash";

const formatDifferencesPlain = (diffs, parent = "") => {
  if (parent !== "") parent = parent + ".";

  return diffs
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue, children }) => {
      if (typeof value === "string") value = `'${value}'`;
      if (typeof newValue === "string") newValue = `'${newValue}'`;
      if (_.isPlainObject(value) && operation !== "nested")
        value = "[complex value]";
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
