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
