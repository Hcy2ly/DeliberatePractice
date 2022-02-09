# ts

1. namespace 命名空间 规定 interface 定义接口可见范围。

2. enum 枚举类型

3. 枚举类型用于定义数值集合

   ```
   enum Color {Red, Green, Blue};
   let c: Color = Color.Blue;
   console.log(c); // 输出 2
   ```

4. 如果某个属性的值是计算出来的，那么它后面一位的成员必须要初始化值。

   ```
   const getValue = () => {
    return 0
   }

    enum List {
      A = getValue(),
      B = 2, // 此处必须要初始化值，不然编译不通过
      C
    }
    console.log(List.A) // 0
    console.log(List.B) // 2
    console.log(List.C) // 3
   ```

5. 类型定义之 联合类型 和 交叉类型。

   - 联合类型： 多个类型合并的类型

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

   - 交叉类型： 多种类型的集合，联合对象将具有所联合类型的所有成员
     1. 一个类型为两个类型的交叉类型
        写法 1: type C = (interface A) & (interface B)
        写法 2: interface C extends A {
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

6. 映射类型

   - Readonly 和 Partial
     js 中常常出现的任务是将一个已知的类型的每个属性变为可选：

     ```
       interface PersonPartial {
         name?:string;
         age?:number;
       }
     ```

     或者只读：

     ```
       interface PersonReadonly {
         readonly name: string;
         readonly age: number;
       }
     ```

     在 ts 里面有 Readonly、Partial 这两种映射类型，来规定属性是只读还是可选：

     ```
     type Readonly<T> = {
       readonly [P in keyof T]: T[P];
     }
     type Partial<T> = {
       [P in keyof T]?: T[P];
     }
     ```

     所以如果我们要使得某个类型的属性均为可选的，可以用：

     ```
     Partial<Person>
     ```

     只读的，可以用：

     ```
     Readonly<Person>
     ```

   - keyof 和 typeof
     keyof 用于

     ```
      interface Map<T> {
        [key: string]: T;
      }

      let keys: keyof Map<number>; // string
      let value: Map<number>['foo']; // number
     ```

     T 用来定义一个通用类型，泛型。表示一个一旦被声明就会作用于后面的类型，在这里 T 作为被后续传入的类型控制内部属性的值类型。
     **keyof 操作符可以用于获取某种类型的所有键，其返回类型是联合类型**
     _与 typeof 联合使用：_

     ```
      interface Color {
        red: string,
        blue: string
      }

      const COLORS = {
        red: 'red',
        blue: 'blue'
      }

      // 首先通过 typeof 操作符获取 color 变量的类型，然后通过 keyof 操作符获取该类型的所有键， ====> 所有键名的联合类型
      type Colors = keyof typeof COLORS // 即字符串字面量联合类型 'red' | 'blue'
      type Colors2 = keyof COLORS // 即字符串字面量联合类型 'red' | 'blue'

      // Type '"yellow"' is not assignable to type '"red" | "blue"'. "yellow"不在键名里面
      color = 'yellow' // Error
     ```
