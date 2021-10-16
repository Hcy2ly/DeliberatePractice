const wm = new WeakMap();
let key = {};
let obj = { foo: 1 };
wm.set(key, obj); // 这里用key作为引用
wm.set(obj, key); // 这里用obj作为引用

obj = null; // obj引用地址销毁
console.log(wm.get(key)); // Object {foo: 1}
console.log(wm.get(obj)); // undefined