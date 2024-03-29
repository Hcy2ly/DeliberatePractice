// 首先，新建一个注册表实例
const registry = new FinalizationRegistry(heldValue => {
  // FinalizationRegistry()是系统提供的构造函数，返回一个清理器注册表实例，里面登记了所要执行的回调函数。回调函数作为FinalizationRegistry()的参数传入，它本身有一个参数heldValue。
});

// 然后，注册表实例的register()方法，用来注册所要观察的目标对象。
registry.register(theObject, 'some value');
// theObject就是所要观察的目标对象，一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用早前注册的回调函数，并将some value作为参数（前面的heldValue）传入回调函数。

// 注意，注册表不对目标对象theObject构成强引用，属于弱引用。因为强引用的话，原始对象就不会被垃圾回收机制清除，这就失去使用注册表的意义了。
// 回调函数的参数heldValue可以是任意类型的值，字符串、数值、布尔值、对象，甚至可以是undefined

// 最后，如果以后还想取消已经注册的回调函数，则要向register()传入第三个参数，作为标记值。这个标记值必须是对象，一般都用原始对象。接着，再使用注册表实例对象的unregister()方法取消注册。
registry.register(theObject, "some value", theObject);
// ...其他操作...
registry.unregister(theObject);
// register()方法的第三个参数就是标记值theObject。取消回调函数时，要使用unregister()方法，并将标记值作为该方法的参数。这里register()方法对第三个参数的引用，也属于弱引用。如果没有这个参数，则回调函数无法取消。

// 由于回调函数被调用以后，就不再存在于注册表之中了，所以执行unregister()应该是在回调函数还没被调用之前。


// 下面使用FinalizationRegistry，对前一节的缓存函数进行增强。

function makeWeakCached(f) {
  const cache = new Map();
  const cleanup = new FinalizationRegistry(key => {
    const ref = cache.get(key);
    if (ref && !ref.deref()) cache.delete(key);
  });

  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    cleanup.register(fresh, key);
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
// 上面示例与前一节的例子相比，就是增加一个清理器注册表，一旦缓存的原始对象被垃圾回收机制清除，会自动执行一个回调函数。该回调函数会清除缓存里面已经失效的键。

// 由于无法知道清理器何时会执行，所以最好避免使用它。另外，如果浏览器窗口关闭或者进程意外退出，清理器则不会运行。