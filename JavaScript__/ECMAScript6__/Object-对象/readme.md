# Object 对象

1. Object.values() 方法弊端
   Object.values() 方法的基本使用场景：

    1. 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值。

    2. 返回数组的成员顺序，与属性的遍历部分介绍的排列规则一致，排列规则在属性的可枚举性和遍历这里。

    3. Object.value只会遍历对象自身的可遍历属性。对于create的属性必须是对象，对象默认不为显性属性

    4. Object.values()会过滤属性名为Symbol值的属性值。

    5. 如果Object.values()方法的参数是一个字符串，会返回各个字符组成的一个数组。

    6. 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。如果参数为undefined或者null会报错。

    7. 针对.ts文件使用Object.values() 不安全，因为 ts 中有 enum 枚举类型，Object.values(枚举)的时候，key、value 都会被遍历出来。
