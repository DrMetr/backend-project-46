const genDiff = (arg1, arg2) => {
  let diff = [];
  let arr1 = Object.entries(arg1),
    arr2 = Object.entries(arg2);

  arr1.forEach(([key, value]) => {
    if (arg2.hasOwnProperty(key) && arg2[key] === value) {
      diff.push([" ", `${key}: ${value}`]);
    } else if (arg2.hasOwnProperty(key) && arg2[key] !== value) {
      diff.push(["-", `${key}: ${value}`]);
      diff.push(["+", `${key}: ${arg2[key]}`]);
    } else {
      diff.push(["-", `${key}: ${value}`]);
    }
  });

  arr2.forEach(([key, value]) => {
    if (!arg1.hasOwnProperty(key)) {
      diff.push(["+", `${key}: ${value}`]);
    }
  });

  return `{\n${diff
    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
    .map((i) => "  " + i.join(" "))
    .join("\n")}\n}`;
};

module.exports = genDiff;
