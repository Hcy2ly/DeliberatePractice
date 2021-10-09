const a = {};
const b = {};

const map = new Map();

map.set(a, 1)
map.set(b, 1)

console.log(map.has(a)) // true
console.log(map.has(b)) // true

// ps: 你会发现，键的唯一性是存储空间地址的比较，不单单是值的比较。


// Map 可以接受一个数组作为参数，该数组的成员是一个表示键值对的数组。
const map1 = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map1.size // 2
map1.has('name') // true
map1.get('name') // "张三"
map1.has('title') // true
map1.get('title') // "Author"

// =======> 实际上他是这样实现的
const arr = [
  ['name', '张三'],
  ['title', 'Author']
]
const map2 = new Map()
arr.forEach(([key, value]) => map2.set(key, value))

// 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。
// so, Set 和 Map 都可以用来生成新的 Map
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
console.log(m2.get('baz'))// 3
const m3 = new Map(m2); // map 对象也可以成为 Map 的参数，因为它具有 iterator 接口
console.log(m3.get('baz'))// 3

// Set是通过add添加值（=键）。如果值（=键）相同就add 不进来。
// Map是通过 set() 方法设置键值。set()方法设值可以覆盖当前键之前的值。
const m4 = new Map();
m4
  .set(1, 'aaa')
  .set(1, 'bbb');

console.log(m4.get(1)) // "bbb"

// 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。
const m5 = new Map();
const aaArr = ['aa'];
m5.set(aaArr, 555);
console.log(m5.get(aaArr), m5.get(['aa'])) // 555 undefined

// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和 - 0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

// map 相关属性的操作方法
const theMap = new Map();
theMap.set(undefined, 'nah');
console.log(theMap.get(undefined)) // "nah"
console.log(theMap.has(undefined)) // true
theMap.delete(undefined)
console.log(theMap.has(undefined))  // false 说明被删了没了
theMap.set(1, 'hello').set(2, 'world!')
console.log(theMap.size) // 2
theMap.clear()
console.log(theMap.size) // 0

// Map 的 values 属性和 Object.values 的区别。
const map_ = new Map();
map_.set(100, 'a').set(2, 'b').set(7, 'c')
console.log(map_.values()); // ['a,' 'b', 'c'] 按照存进去的顺序排列

const obj_ = { 100: "a", 2: "b", 7: "c" };
console.log(Object.values(obj_)); // ['b,' 'c', 'a']  若属性可排序，按照从小到大的排序顺序排列

// 上面我们可以注意到，Map 的遍历顺序就是插入顺序。用 for ... of 测试所有遍历器属性和方法
const mm = new Map(
  [
    ['F', 'no'],
    ['T', 'yes'],
  ]
)
for (let key of mm.keys()) {
  console.log(key)
}
// F
// T

for (let value of mm.values()) {
  console.log(value)
}
// no
// yes

for (let [key, value] of mm.entries()) {
  console.log([key, value])
}
['F', 'no']
['T', 'yes']

for (let [key, value] of mm) {
  console.log([key, value])
}
// [ 'F', 'no' ]
// [ 'T', 'yes' ]

// 总结: Map 结构的默认遍历器接口（Symbol.iterator属性），其实就是entries方法。即 map[Symbol.iterator] === map.entries // true
