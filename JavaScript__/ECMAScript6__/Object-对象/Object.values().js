// 1.1 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。
let obj = {
  foo: "o",
  baz: 20,
}
console.log(Object.values(obj)); // ['o', 20]


// 1.2 特殊情况：返回数组的成员顺序，与属性的遍历部分介绍的排列规则一致，排列规则在【属性的枚举性和遍历】这里。
const obj2 = { 100: "a", 2: "b", 7: "c" };
console.log(Object.values(obj2)); // ['b,' 'c', 'a']


// 1.3 Object.value只会遍历对象自身的可遍历属性。
const obj3 = Object.create({}, { p: { value: 10 } }); //用create创建的对象属性的属性p，如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。
console.log(Object.values(obj3)); // []
console.log(Object.getOwnPropertyDescriptors(obj3));
// Object.getOwnPropertyDescriptors() 返回p被创建时候的默认属性。
// {
//   p: {
//     value: 10,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   }
// }

// 只要把enumerable改成true，Object.values就会返回属性p的值。
const obj4 = Object.create({}, {
  p: {
    value: 10,
    enumerable: true,
    configurable: true,
    writable: true,
  }
})
console.log(Object.values(obj4));    // [10]


// 1.4 Object.values()会过滤属性名为Symbol值的属性值。
const obj5 = {
  [Symbol("a")] : 1,
  a : 2,
}
console.log(Object.values(obj5)); // [ 2 ]
console.log(Object.keys(obj5), Reflect.ownKeys(obj5)); // [ 'a' ] [ 'a', Symbol(a) ]
// 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。


// 1.5 如果Object.values()方法的参数是一个字符串，会返回各个字符组成的一个数组。
console.log(Object.values("foo"));      //["f","o","o"]
//上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。


// 1.6 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。如果参数为undefined或者null会报错。
console.log(Object.values(123));        // []
console.log(Object.values(true));       // []
// console.log(Object.values(undefined));  // 报错 error
// console.log(Object.values(null))        // 报错 error


// 1.7 ts 中有 enum 枚举类型 Object.values(枚举)的时候，key、value 都会被遍历出来
// （只能在ts文件中用） 例如：
// enum GENDER {
//   man = 1,
//   woman= 2
// }

// Object.values(GENDER) // -> 'man', 'woman', 1, 2