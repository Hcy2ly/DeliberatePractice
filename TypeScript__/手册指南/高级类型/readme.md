# 高级类型

1. 交叉类型
   将多个类型合并成一个类型。 ===> 类型为多个类型的集合
   **我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用。** ===> 用于 interface

   ```
    interface Person {
      // ...
    }
    interface Man {
      // ...
    }

    const a: Person & Man = {
      // ... 为Person和Man的结合体
    }
   ```

2. 联合类型
   多个类型满足一个就行。 ===> 类型为多个类型其中之一

   ```
   // 基础类型
   function fn(e: number | string) {
     // ... e为number或者string
   }
   // 复杂类型
   function fn2(obj: Person | Man) {
     ... 唯一能确定的是，obj是Person和Man共有的结构
   }
   ```

3. 类型保护与区分类型
