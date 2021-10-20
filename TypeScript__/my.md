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

3. 类型定义之 联合类型 和 交叉类型。
  * 联合类型： 多个类型合并的类型
    1. 基础类型联合：string | number
    2. （自定义）对象类型联合：（需要两个对象中都存在某一个属性）
      interface Women{
        age: number,
        sex: string,
        cry(): void
      }
      interface Man{
        age: number,
        sex: string,
      }
      declare function People(): Women | Man;
      let people = People();
      people.age = 18; //ok
      people.cry();//error 非共同成员
  
  * 交叉类型： 多种类型的集合，联合对象将具有所联合类型的所有成员
    1. 一个类型为两个类型的交叉类型 
      写法1: type C = (interface A) & (interface B)
      写法2: interface C extends A {
              ...B
            }
    2. 给一个变量的默认值 声明交叉类型
        interface People {
          age: number,
          height： number
        }
        interface Man{
          sex: string
        }
        const lilei = (man: People & Man) => {
          console.log(man.age)
          console.log(man.height)
          console.log(man.sex)
        }
        lilei({age: 18,height: 180,sex: 'male'});

4. 