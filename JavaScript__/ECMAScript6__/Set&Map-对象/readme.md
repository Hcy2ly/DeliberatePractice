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

1. 含义
  JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。
  ES6 提供了 Map 数据结构，类似对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
  其实，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

2. 基本用法
  const m = new Map(); // new 一个Map结构 实例
  const o = {p: 'Hello World'};
  m.set(o, 'content') // set方法设置键和默认值  键可以是任何类型
  m.get(o) // "content" // get通过键获取值
  m.has(o) // true   返回boolean值，告知map结构是否含有某个键
  m.delete(o) // true   返回boolean值，告知map结构是否删除成功某个键
  m.has(o) // false   键是唯一的

3. 用法的注意点
    1. 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
    2. 如果对同一个键多次赋值，后面的值将覆盖前面的值。
    3. 如果读取一个未知的键，则返回undefined。
    4. 如果 Map 的键是引用类型的值（数组、普通对象等），同样的值的两个实例，在 Map 结构中被视为两个键。

4. 属性
    1. size // size属性返回 Map 结构的成员总数。 const map = new Map(); map.set('foo', true).set('bar', false); map.size // 2
    2. Map.prototype.set(key, value) // set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是当前的Map对象，因此可以采用链式写法。
    3. Map.prototype.get(key) // get方法读取key对应的键值，如果找不到key，返回undefined。
    4. Map.prototype.has(key) // has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
    5. Map.prototype.delete(key) // delete方法删除某个键，返回true。如果删除失败，返回false。
    6. Map.prototype.clear() // clear方法清除所有成员，没有返回值。

5. 操作方法 [map.js]

6. 遍历方法
  Map 结构原生提供三个遍历器生成函数和一个遍历方法。
    1. Map.prototype.keys()：返回键名的遍历器。
    2. Map.prototype.values()：返回键值的遍历器。
    3. Map.prototype.entries()：返回所有成员的遍历器。
    4. Map.prototype.forEach()：遍历 Map 的所有成员。

7. 与其他数据结构的互相转换 [map2.js]
    1. Map转为数组
    2. 数组转为Map
    3. Map转为对象
    4. 对象转为Map
    5. Map转为JSON
    6. JSON转为Map

## WeakMap

1. 含义
  WeakMap结构与Map结构类似，也是用于生成键值对的集合。
  WeakMap与Map的区别有两点：
    一是WeakMap只接受对象（除null之外）的为键名，不接受其他类型的值作为键名。
    二是WeakMap的键名所指向的对象，不计入垃圾回收机制。
      WeakMap的设计目的在于，有时我们想在某个对象上存一些数据，但是会造成对这个对象的引用，例如
        const e1 = document.getElementById('foo');
        const e2 = document.getElementById('bar');
        const arr = [
          [e1, 'foo 元素'],
          [e2, 'bar 元素'],
        ];
      上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
      一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
        // 不需要 e1 和 e2 的时候，必须手动删除引用
        arr [0] = null;
        arr [1] = null;
      上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。
      WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
      基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
        const wm = new WeakMap();
        const element = document.getElementById('example');
        wm.set(element, 'some information');
        wm.get(element) // "some information"
        上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。也就是说，上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。
        总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。所以才说WeakMap结构有助于防止内存泄漏。
        注意，WeakMap 弱引用的只是针对键名，而不是键值。键值依然是正常引用。键名的引用要是没了，就会消失。
          const wm = new WeakMap();
          let key = {};
          let obj = { foo: 1 };
          wm.set(key, obj); // 这里用key作为引用
          wm.set(obj, key); // 这里用obj作为引用

          obj = null; // obj引用地址销毁
          console.log(wm.get(key)); // Object {foo: 1}
          console.log(wm.get(obj)); // undefined

2. 语法
  WeakMap 与 Map 的区别在 api 上的区别主要有两个：
    一是没有遍历操作（即没有 values(), keys(), entries() 方法），也没有size属性。因为它没法确认所有的键值，某个键名是否完全不可预测，跟垃圾回收机制是否运行相关。这一刻还可以取到键值，下一刻就被垃圾回收了，为了防止出现这种不确定性，就规定直接不能取到键值。
    二是没有clear清空操作，无法清空。因为没法确认长度，所以没法清空。
    so，WeakMap对象只有四个属性方法可用，set()、get()、delete()、has()

3. 如何观察 WeakMap 里面的引用是否消失？
  Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。这个按钮也能用来观察 WeakMap 里面的引用是否消失。
  或者知道key的话最简单就是 get() 方法

4. WeakMap 用途
    1. 经典场景

        ```js
            let myWeakmap = new WeakMap();
            myWeakmap.set(
              document.getElementById('logo'),
              {timesClicked: 0})
            ;
            document.getElementById('logo').addEventListener('click', function() {
              let logoData = myWeakmap.get(document.getElementById('logo'));
              logoData.timesClicked++;
            }, false);
        ```

      上面代码中，document.getElementById('logo')是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
  
    2. 部署私有属性

      ```
        const _counter = new WeakMap();
        const _action = new WeakMap();

        class Countdown {
          constructor(counter, action) {
            _counter.set(this, counter);
            _action.set(this, action);
          }
          dec() {
            let counter = _counter.get(this);
            if (counter < 1) return;
            counter--;
            _counter.set(this, counter);
            if (counter === 0) {
              _action.get(this)();
            }
          }
        }

        const c = new Countdown(2, () => console.log('DONE'));

        c.dec()
        c.dec()
        // DONE
      ```

      Countdown类的两个内部属性，是实例的弱引用，当实例被删除的时候，他们就就消失了，不会造成内存泄漏。

## WeakRef （ES2021推出来的）

1. 含义
  WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。
    const  target = {}
    let wr = new WeakRef(target)
    这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，wr的引用不会妨碍原始对象target被垃圾回收机制清除。

2. 方法
  WeakRef 实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。
    let target = {};
    let wr = new WeakRef(target);

    let obj = wr.deref();
    if (obj) { // target 未被垃圾回收机制清除
      // ...
    }
    // deref()方法可以判断原始对象是否已被清除

3. 作用
  弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。
    function makeWeakCached(f) {
      const cache = new Map();
      return key => {
        const ref = cache.get(key);
        if (ref) {
          const cached = ref.deref();
          if (cached !== undefined) return cached;
        }

        const fresh = f(key);
        cache.set(key, new WeakRef(fresh));
        return fresh;
      };
    }
    const getImageCached = makeWeakCached(getImage);
    // makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。
    注意，标准规定，一旦使用WeakRef()创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。

## FinalizationRegistry（清理器注册表功能- ES2021推出）

1. 含义
  ES2021 引入了清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数

2. 使用方法 [finalizationRegistry.js]
