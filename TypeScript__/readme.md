# ts

1. namespace 命名空间 规定 interface 定义接口可见范围。

2. enum 枚举类型
  1. 枚举类型用于定义数值集合
      enum Color {Red, Green, Blue};
      let c: Color = Color.Blue;
      console.log(c);    // 输出 2
  2. 如果某个属性的值是计算出来的，那么它后面一位的成员必须要初始化值。
      const getValue = () => {
        return 0
      }

      enum List {
        A = getValue(),
        B = 2,  // 此处必须要初始化值，不然编译不通过
        C
      }
      console.log(List.A) // 0
      console.log(List.B) // 2
      console.log(List.C) // 3
  3. 

3. 类型定义之 联合类型 和 交叉类型。
  联合类型： string | number
  交叉类型： type xx = (interface A) & (interface B)
  一个类型为两个类型的交叉类型 写法：
    1. type C = (interface A) & (interface B)
    2. interface C extends A {
      ...B
    }