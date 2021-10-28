# vue 的生命周期函数

1. created
   vue.js 中 created 方法是一个生命周期钩子函数，一个 vue 实例被生成后会调用这个函数。
   一般可以在 created 函数中调用 ajax 获取**页面初始化**所需的数据。
   此时 dom 没挂载，无法操作。

2. mounted
   已经挂载 dom 可以操作 dom，请求数据 修改 dom。

3. created 和 mounted 的区别在于 => 有没有初始化数据
   如果没有初始化数据 => 用 created 钩子请求初始化数据
   如果有 => 用 mounted 修改 dom 数据。

4. form 表单 rules 参数的规则检验
   staffPhone: [
   { required: true, message: '请输入管理员手机号', trigger: 'blur' },
   { pattern: /^1[3-9]\d{9}$/, message: `请输入正确手机号`, trigger: 'blur' },
   { validator: this.isRepeat } // 校验值方法
   ],
