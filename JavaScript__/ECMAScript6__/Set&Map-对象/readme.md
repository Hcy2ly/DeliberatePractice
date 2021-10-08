# Set & Map 对象

## Set 对象

1. 基本用法
    ES6 提供的新的数据结构 Set。类似于数组，但是成员的值都是唯一的，没有重复的值。
    Set本身就是一个构造函数，用来生成 Set 数据结构。// const a = new Set() | const arr = [], b = new Set(arr)
    Set 函数可以接受一个数组（或者具有比 iterable 遍历器接口的其他数据结构）作为参数，用来初始化。
    Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法 // Set.prototype[symbol.iterator] === Set.prototype.values

2. 属性和操作
    1. 属性
      Set.prototype.constructor // 构造函数，默认就是 Set 函数 本身。
      Set.prototype.size // 返回 Set 实例的成员总数。

    2. Set 实例的方法分为两大类
        1. 操作方法：操作数据。 // 共有四种操作方法。
          * 1.1 方法一 添加成员
              Set.prototype.add(value) // 返回 Set 结构本身
          * 1.2 方法二 删除成员
              Set.prototype.delete(value) // 返回 boolean 值，告知 value 是否被删除
          * 1.3 方法三 添加成员
              Set.prototype.has(value) // 返回 boolean 值，告知当前 value 是否为 Set 成员
          * 1.4 方法四 删除成员
              Set.prototype.clear() // 无返回值，清空所有成员

        2. 遍历方法：遍历成员。 // 四种遍历方法
          * 2.1  方法一  返回键值的遍历器
              Set.prototype.values()
          * 2.2  方法二  返回键名的遍历器
              Set.prototype.keys()
          * 2.3  方法三  返回键值对遍历器
              Set.prototype.entries()
          * 2.4  方法四  使用回调函数遍历每个成员
              Set.prototype.forEach(function (value) { })

## WeakSet 对象

1. 含义
    1. WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
    2. 与Set类似，也是不重复的集合。但是它与Set有两个区别：
      1. WeakSet 的成员只能是对象，而不能是其他类型的值
      2. 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
      这是因为垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。
      因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
      由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，*因此 ES6 规定 WeakSet 不可遍历。*

2. 方法
    1. WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
    2. WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
    3. WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

3. 总结
    1. WeakSet 没有size和forEach属性，没有办法遍历它的成员。
    2. WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
      const foos = new WeakSet()
      class Foo {
        constructor() {
          foos.add(this)
        }
        method () {
          if (!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
          }
        }
      }
      上面代码保证了Foo的实例方法，只能在Foo的实例上调用。
      这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。

## Map

1. 含义和基本用法