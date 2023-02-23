const isObjectEqual = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  console.log(222, aProps, bProps);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    if (!bProps.includes(aProps[i])) {
      return false
    }
  }

  return true
}

const obj = { "name": "xx", "age": "12", "like": "233" }
const obj2 = { "age": "15", "name": "xx", "like": "ji" }
console.log(234, isObjectEqual(obj, obj2))