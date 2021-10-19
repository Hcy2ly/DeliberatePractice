// 下面是一个模拟next方法返回值的例子。
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false } :
        { value: undefined, done: true };
    }
  };
}
// 对于遍历器对象来说，done: false 和 value: undefined属性都是可以省略的，因此上面的makeIterator函数可以简写成下面的形式。
// nextIndex < array.length ?
//   { value: array[nextIndex++] } :
//   { done: true };

// 由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。下面是一个无限运行的遍历器对象的例子。
var it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...

// 遍历器生成函数idMaker，返回一个遍历器对象（即指针对象）。但是并没有对应的数据结构，或者说，遍历器对象自己描述了一个数据结构出来。
function idMaker() {
  var index = 0 // ts

  return {
    next: function () {
      return { value: index++, done: false };
    }
  };
}

// 如果使用 TypeScript 的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。
// interface Iterable {
//   [Symbol.iterator]() : Iterator
// }

// interface Iterator {
//   next(value?: any) : IterationResult
// }

// interface IterationResult {
//   value: any
//   done: boolean
// }



// =================================================================================================
// 给对象添 Iterator 接口
// 1. 在原型链上添加
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  var iterator = { next: next };

  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    }
    return { done: true };
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
  console.log(i); // 1, 2, 3
}



// 2. 在对象自身上直接部署
let obj = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        }
        return { value: undefined, done: true };
      }
    };
  }
};



// 3. 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。

let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}

// 注意，普通对象部署数组的Symbol.iterator方法，并无效果。
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}

// 注意，如果Symbol.iterator方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。 【重要的是方法，不是属性名字！】
var obj = {};

obj[Symbol.iterator] = () => 1;

[...obj] // TypeError: [] is not a function



// 遍历器对象除了 next()，还有 return() 和 throw()
// return ()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

// 函数readLinesSync接受一个文件对象作为参数，返回一个遍历器对象，其中除了next()方法，还部署了return()方法。下面的两种情况，都会触发执行return()方法。
// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}

// 情况一输出文件的第一行以后，就会执行return()方法，关闭这个文件；
// 情况二会在执行return()方法关闭文件之后，再抛出错误。
// 注意，return ()方法必须返回一个对象，这是 Generator 语法决定的。

// throw()方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。