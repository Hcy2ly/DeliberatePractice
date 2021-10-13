// Map数据结构与其他数据结构的相互转化

// 1. Map转为数组。  最方便的方法，就是使用扩展运算符（...）。
const map = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
const map2arr = [...map]


// 2. 数组转为Map。 将数组传入 Map 构造函数，就可以转为 Map。
const arr = [
  [true, 7],
  [{ foo: 3 }, ['abc']]
]
const arr2map = new Map(arr)

// 3. Map转为对象。
// 3.1 如果所有 Map 的键都是字符串，它可以无损地转为对象。
// 3.2 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);

const map2obj = strMapToObj(myMap) // { yes: true, no: false }

// 4. 对象转为Map。 对象转为 Map 可以通过 Object.entries()。
let obj = { "a": 1, "b": 2 };
const obj2map = new Map(Object.entries(obj))

// 或者自己写一个
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap(obj) // Map {"a" => 1, "b" => 2}

// 5. Map转JSON
// 5.1 Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap) // '{"yes":true,"no":false}'

// 5.2 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
mapToArrayJson(myMap) // '[[true,7],[{"foo":3},["abc"]]]'


// 6. JSON转Map
// 6.1 JSON 转为 Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}') // Map {'yes' => true, 'no' => false}

// 6.2 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]') // Map {true => 7, Object {foo: 3} => ['abc']}