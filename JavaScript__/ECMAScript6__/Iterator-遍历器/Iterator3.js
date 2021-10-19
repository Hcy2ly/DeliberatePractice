// Symbol.iterator()方法的最简单实现，还是使用下一章要介绍的 Generator 函数。

let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  *[Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
// 上面代码中，Symbol.iterator()方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。