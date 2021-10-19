// 默认调用 Iterator 接口的场景   -  针对存在 [Symbol.Iterator] 接口的数据结构
// Array
// Map
// Set
// String
// TypedArray
// 函数的 arguments 对象
// NodeList 对象

// 1. 解构赋值 - 针对数组和set结构
let set = new Set().add('a').add('b').add('c');

let [x, y] = set; // x='a'; y='b'

let [first, ...rest] = set; // first='a'; rest=['b','c'];



// 2. 扩展运算符（...）
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd'] // ['a', 'b', 'c', 'd']



// 3. yield* 后面接可遍历的数据结构时，会默认调用 Iterator 接口
let generator = function* () {
  yield 1; // 返回 1
  yield* [2, 3, 4]; // 遍历返回 2、3、4
  yield 5; // 返回 5
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }


// 4. 其他
// for...of
// Array.from()
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a', 1], ['b', 2]])）
// Promise.all()
// Promise.race()

