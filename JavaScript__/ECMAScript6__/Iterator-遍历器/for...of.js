// for...of 使用
// 1. 数组。 数组原生具备iterator接口（即默认部署了Symbol.iterator属性），for...of循环本质上就是调用这个接口产生的遍历器。
const arr = ['red', 'green', 'blue'];
for (let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr); //空对象obj部署了数组arr的Symbol.iterator属性，结果obj的for...of循环，产生了与arr完全一样的结果。
for (let v of obj) {
  console.log(v); // red green blue
}


// for...of循环可以代替数组实例的forEach方法。
const arr = ['red', 'green', 'blue'];
arr.forEach(function (element, index) {
  console.log(element); // red green blue
  console.log(index);   // 0 1 2
});


// JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。ES6 提供for...of循环，允许遍历获得键值。如果要通过for...of循环，获取数组的键值对，可以借助数组实例的entries方法。
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
  console.log(a); // 0 1 2 3
}
for (let a of arr) {
  console.log(a); // a b c d
}


// for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"   注意：没有返回键名为foo的值hello
}



// 2. Set 和 Map 结构
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map().set("edition", 6).set("committee", "TC39").set("standard", "ECMA-262");
for (var [key, value] of es6) {
  console.log(key + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262
for (var es of es6) {
  console.log(es);
}
// [edition, 6]
// [committee, TC39]
// [standard, ECMA-262]

// 注意两个细节：1. Set和Map结构的遍历顺序按照成员添加顺序； 2. Set 遍历返回的是值v，Map遍历返回的是数组[k, v]。



// 3. 计算生成的数据结构 - 使用 entries() | keys() | values() 等属性方法计算生成的数据结构
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']



// 4. 类似数组的对象
// 4.1 类似数组的对象包括好几类。下面是for...of循环用于字符串、DOM NodeList 对象、arguments对象的例子。
// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// 特别： 对于字符串来说，for...of循环还会正确识别 32 位 UTF-16 字符。。
for (let x of 'a\uD83D\uDC0A') {
  console.log(x);
}
// 'a'
// '\uD83D\uDC0A'


// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}


// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'


// 4.2 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。
let arrayLike = { length: 2, 0: 'a', 1: 'b' };

// 报错
for (let x of arrayLike) {
  console.log(x);
}

// 正确
for (let x of Array.from(arrayLike)) { // 利用Array.from为其添加Iterator接口
  console.log(x);
}


// 5. 普通对象。  for..of 不能直接用，会报错，因为没有Iterator接口
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function

// 但是想用有两种解决方案：
// 5.1 利用 Object.keys() 方法将对象键名变成一个数组
for (var key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key]);
}

// 5.2 利用 Generator 函数将对象重新包装
const obj = { a: 1, b: 2, c: 3 }

function* entries(obj) { // generator函数
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]; // 返回一个数组
  }
} // 最后大概可以理解为是：yield* [[a, 1], [b, 2], [c, 3]]

for (let [key, value] of entries(obj)) { // 遍历每个返回的数组
  console.log(key, '->', value);
}
// a -> 1
// b -> 2
// c -> 3
