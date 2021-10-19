# Iterator (遍历器) 

1. 概念
    JavaScript 有表示 ‘集合’ 的数据结构，主要是数组（Array）和对象（Object），ES6添加了 Map 和 Set 对象。这样就有了四种数据集合。用户还可以组合使用他们。比如数组的成员是Map，Map的成员是对象这样。于是就需要一种统一的接口机制，来处理所有不同的数据结构。

    遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

    Iterator 的作用有三个：
      一是为各种数据结构，提供一个统一的、简便的访问接口；
      二是使得数据结构的成员能够按某种次序排列；
      三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

    Iterator 的遍历过程是这样的。

    （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

    （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

    （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

    （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

    每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

2. 默认 Iterator 接口
  Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环。for...of默认去寻找Iterator接口并调用。
  **一种数据结构如果部署了Iterator接口，我们就称这种数据结构是“可遍历的”**
  *ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”*
  Symbol.iterator属性本身是一个函数，是当前数据结构默认的遍历器生成函数。
  执行这个函数，就会返回一个遍历器。
  至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。
  const obj = { // 含有 Symbol.iterator 属性方法，可遍历，可使用 for...of
    [Symbol.iterator] : function () { // 遍历器返回一个 next 指针
      return { 
        next: function () { // next 方法，返回一个对象，有两个属性 {value, done}
          return {
            value: 1,
            done: true
          };
        }
      };
    }
  };

3. 原生具备 Iterator 接口的数据结构如下。
    Array
    Map
    Set
    String
    TypedArray
    函数的 arguments 对象
    NodeList 对象

    数组的🌰：
      let arr = ['a', 'b', 'c'];
      let iter = arr[Symbol.iterator](); // 可以看出arr原生就具有遍历器接口，部署在arr的Symbol.iterator属性上。so调用这个属性，就得到遍历器对象

      iter.next() // { value: 'a', done: false }
      iter.next() // { value: 'b', done: false }
      iter.next() // { value: 'c', done: false }
      iter.next() // { value: undefined, done: true }

    **对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们**
    除此之外，其他数据结构（*主要是对象*）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

4. 为啥对象没有部署 Iterator 接口
    因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。
    
    **本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。**不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了，*so我们把对象转换成具备Iterator接口的数据结构（比如Map对象）就可。*
    
    一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

5. 给对象部署 Iterator 接口 [Iterator.js]
    一是在原型链上部署 
    二是直接在当前对象部署
    三是直接把数组的原生 Array.prototype[Symbol.iterator] 复制过来

6. 调用 Iterator 接口的场合
  下面这些场合下，会默认调用 Iterator 接口（即Symbol.Iterator方法）。
    1. 解构赋值
      对数组和Set结构进行结构赋值的时候 | const set = new Set().add('a').add('b'); const [x, y] = set; // x='a', y='b'
    2. 扩展运算符
      扩展运算符（...）也会默认调用 | ...set // 'a', 'b'
      也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。| let arr = [...iterable];
    3. yield*
      yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
    4. 其他（由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口）
      比如： for...of
            Array.from()
            Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
            Promise.all()
            Promise.race()

7. 字符串的 Iterator 接口
  字符串是一个类似数组的对象，也原生具有 Iterator 接口。调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。
    var someString = "hi";
    typeof someString[Symbol.iterator]
    // "function"

    var iterator = someString[Symbol.iterator]();

    iterator.next()  // { value: "h", done: false }
    iterator.next()  // { value: "i", done: false }
    iterator.next()  // { value: undefined, done: true }

    注意： 如果想要修改原生遍历器，可以覆盖重新赋值。
    var str = new String("hi");

    [...str] // ["h", "i"]

    str[Symbol.iterator] = function() {
      return {
        next: function() {
          if (this._first) {
            this._first = false;
            return { value: "bye", done: false };
          } else {
            return { done: true };
          }
        },
        _first: true
      };
    };

    [...str] // ["bye"]
    str // "hi"
    上面字符串 str 的Symbol.iterator方法被修改了，所以扩展运算符（...）返回的值变成了bye，而字符串本身还是hi。

8. Iterator 接口 和 Generator 函数
  直接使用generator函数，yield设置返回值，简单实现[Symbol.Iterator]方法。
    let obj = {
      *[Symbol.iterator]() {
        yield 'hello';
        yield 'world';
      }
    };
    
9. 遍历器对象
  遍历器对象除了具有next()方法，还可以具有return()方法和throw()方法。如果你自己写遍历器对象生成函数，那么next()方法是必须部署的，return()方法和throw()方法是否部署是可选的。
  return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法。

10. for ... of 
    ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。
    
    一个数据结构只要部署了[Symbol.iterator]属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的[Symbol.iterator]方法。
    
    for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
    1. 数组
    2. Set 和 Map 结构
    3. 计算生成的数据结构 - 有些数据结构是在现有数据结构的基础上，计算生成的。比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
        - entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
        - keys() 返回一个遍历器对象，用来遍历所有的键名。
        - values() 返回一个遍历器对象，用来遍历所有的键值。
      通过这三个方法调用后生成的遍历器对象，所遍历的都是计算生成的数据结构。
    4. 类似数组的对象。 
        1. 对于【字符串、DOM NodeList 对象、arguments对象】原生具备 Iterator 接口, for...of 循环可直接用来遍历 。
        2. 对于【{length: 2, 0: "a", 1: "b" }】这种 类似数组但是没有原生Iterator接口 的对象，利用 Array.from 为其添加 Iterator 接口，使其可以使用 for...of 遍历。
    5. 对于普通对象【{'a': "aa", 'b': "bb"}】,for...of 结构不能直接使用，可用 for...in 遍历键名。想用for...of的解决方案是：1-使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。2-使用 Generator 函数将对象重新包装一下。 
    6. 与其他遍历方法的比较
        1. for循环  比较麻烦，不如数组内置方法forEach
        2. forEach  无法跳出循环，不能return or break
        3. for...in 遍历对象键名or数组下标  缺点：1. 遍历的key都会变成string类型，包括number的数组下标。 2. 不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。3. 某些情况下，for...in循环会以任意顺序遍历键名。**总之，for...in循环主要是为遍历对象而设计的，不适用于遍历数组。**
        4. 自己的优点：
            1. 有着同for...in一样的简洁语法，但是没有for...in那些缺点。
            2. 不同于forEach方法，它可以与break、continue和return配合使用。
            3. 提供了遍历所有数据结构的统一操作接口。


