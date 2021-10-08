/*********
 * Set本身是一个构造函数，用来生成Set的数据结构
 */
const s = new Set();

[2, 3, 4, 6, 5, 3, 4].forEach(x => s.add(x));

for (let i of s) {
  console.log(i)
}
// 这里通过add()方法向Set构造函数的实例s添加值，结果表明Set结构不会添加重复值。【日常用Set方法初始化可以用来给数组去重】


/*********
 * Set 函数可以接受一个数组（或者具有比 iterable 遍历器接口的其他数据结构）作为参数，用来初始化。
*/
// 1. 例一
const set = new Set([1, 2, 3, 4, 4]);
console.log([...set]) // [1, 2, 3, 4]
// 2. 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(items.size) // 5
// 3. 例三 存对象数组也ok ps：两个空对象是不同的值。
const objArr = [{}, {}]
const divSet = new Set(objArr);
console.log(divSet.size) // 2
// 总结：Set方法可以去除数组的重复成员 [...new Set(array)]，这种方法同样适用于去除字符串的重复字符。
console.log([...new Set('ababbc')].join('')) // abc

/********
 * Set 实例的属性和方法
 */

/********
 * 属性
 * Set.prototype.constructor // 构造函数，默认就是 Set 函数 本身。
 * Set.prototype.size // 返回 Set 实例的成员总数。
 */

/********
 * Set 实例的方法分为两大类
 * 1. 操作方法：操作数据。// 共有四种操作方法。
 * 1.1 方法一 添加成员
 * Set.prototype.add(value) // 返回 Set 结构本身
 * 1.2 方法二 删除成员
 * Set.prototype.delete(value) // 返回 boolean 值，告知 value 是否被删除
 * 1.3 方法三 添加成员
 * Set.prototype.has(value) // 返回 boolean 值，告知当前 value 是否为 Set 成员
 * 1.4 方法四 删除成员
 * Set.prototype.clear() // 无返回值，清空所有成员
 */

// 代码案例
s.add(1).add(2).add(2); // 注意2被加入了两次
s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false 说明2只被加入了一次

// 普通对象和Set对象在判断是否包括一个键上面有什么写法区别？
// 普通对象的写法
const propertiesObj = {
  'width': 1,
  'height': 1
};
if (propertiesObj['width']) {
  // ...
}

// Set的写法
const propertiesSet = new Set();
propertiesSet.add('width');
propertiesSet.add('height');
if (propertiesSet.has('width')) {
  // ...
}
// 总结：组合Array.form，可以得出一种去除数组重复成员的简便方法。 [./set实现数组去重.js]


/********
 * 2. 遍历方法：遍历成员。 四种遍历方法
 * 2.1  方法一  返回键值的遍历器
 * Set.prototype.values()
 * 2.2  方法二  返回键名的遍历器
 * Set.prototype.keys()
 * 2.3  方法三  返回键值对遍历器
 * Set.prototype.entries()
 * 2.4  方法四  使用回调函数遍历每个成员
 * Set.prototype.forEach(function (value) { })
 */

// **: 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。
const curSet = new Set();
curSet.add(2)
curSet.add(1)
console.log(curSet.keys(), [...curSet.keys()], curSet.values())

// (1) keys、values、entries 都会返回一个 遍历器对象 Iterator。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
let colorSet = new Set(['red', 'green', 'blue']);

for (let item of colorSet.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of colorSet.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of colorSet.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// 总结: Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values) // true

// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
for (let x of colorSet) { // for ... of  针对可遍历对象调用symbol.iterator遍历操作
  console.log(x);
}
// red
// green
// blue

// (2) forEach
// Set 对象也有 forEach 方法，对某个成员执行某种操作，没有返回值。
let setForEach = new Set([1, 4, 9]);
setForEach.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

// forEach 的方法的参数是一个回调函数，该函数接受三个参数，其中前两个是value 和key  对于 Set 结构而言， value 就是 key。最后一个是集合本身（上例省略了该参数）
// 另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

// (3) 遍历的应用
// ... 扩展运算符内部使用 for of 实现，so也可用于 Set 结构。扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。
let arr = [...colorSet];
console.log(arr)
// ['red', 'green', 'blue']

// 而且，数组的map和filter方法也可以间接用于 Set 了。
let numSet = new Set([1, 2, 3]);
numSet2 = new Set([...numSet].map(x => x * 2));
// 返回Set结构：{2, 4, 6}
numSet3 = new Set([...numSet2].filter(x => (x % 2) == 0));
// 返回Set结构：{2}
console.log(numSet2, numSet3)

// Set 可很好的实现两个数组的 并集（Union）、交集（Intersect）和差集（Difference）。
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

// 提供了两种方法，直接在遍历操作中改变原来的 Set 结构。
// 方法一
let firstSet = new Set([1, 2, 3]);
firstSet = new Set([...firstSet].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let secondSet = new Set([1, 2, 3]);
secondSet = new Set(Array.from(secondSet, val => val * 2));
// set的值是2, 4, 6