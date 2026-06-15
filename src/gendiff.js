/*
const genDiff = (arg1, arg2) => {
  let diff = [];
  let arr1 = Object.entries(arg1),
    arr2 = Object.entries(arg2);

  arr1.forEach(([key, value]) => {
    if (arg2[key] && arg2[key] === value) {
      diff.push([" ", `${key}: ${value}`]);
    } else if (arg2[key] && arg2[key] !== value) {
      diff.push(["-", `${key}: ${value}`]);
      diff.push(["+", `${key}: ${arg2[key]}`]);
    } else {
      diff.push(["-", `${key}: ${value}`]);
    }
  });

  arr2.forEach(([key, value]) => {
    if (!arg1[key]) {
      diff.push(["+", `${key}: ${value}`]);
    }
  });

  return `{\n${diff
    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    .map((i) => "  " + i.join(" "))
    .join("\n")}\n}`;
};
*/

const genDiff = (arg1, arg2) => {
  let diff = [];
  let arr1 = Object.entries(arg1),
    arr2 = Object.entries(arg2);
  arr1.forEach(([key, value]) => {
    if (arg2[key] && arg2[key] === value) {
      diff.push({ operation: "unchanged", key: key, value: value });
    } else if (arg2[key] && arg2[key] !== value) {
      diff.push({
        operation: "changed",
        key: key,
        value: arg1[key],
        newValue: arg2[key],
      });
    } else {
      diff.push({ operation: "deleted", key: key, value: arg1[key] });
    }
  });

  arr2.forEach(([key, value]) => {
    if (!arg1[key]) {
      diff.push({ operation: "added", key: key, value: value });
    }
  });
  return formatDiff(diff);
};

const formatDiff = (diff) => {
  let arr = diff
    .sort((a, b) => (a.key > b.key ? 1 : -1))
    .map(({ operation, key, value, newValue }) => {
      if (operation === "changed")
        return `  - ${key}: ${value}\n  + ${key}: ${newValue}`;
      if (operation === "unchanged") return `    ${key}: ${value}`;
      if (operation === "deleted") return `  - ${key}: ${value}`;
      if (operation === "added") return `  + ${key}: ${value}`;
    });
  return `{\n${arr.join("\n")}\n}`;
};

module.exports = genDiff;
