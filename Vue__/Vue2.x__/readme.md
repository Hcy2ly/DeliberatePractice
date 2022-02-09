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

5. mixins
   mixins 选项用于接入一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 Vue.extend() 一样的选项合并逻辑。也就是说，如果你的混入包含一个 created 钩子，而创建组件本身也有一个，那么两个函数都会被调用。**Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。**

   ```
   var mixin = {
   created: function () { console.log(1) }
   }
   var vm = new Vue({
   created: function () { console.log(2) },
   mixins: [mixin]
   })
   // => 1
   // => 2
   ```

6. Vue.extend(options)  
    {Object} options
   使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
   data 选项是特例，需要注意，在 Vue.extend() 中他必须是函数

   ```
   <div id="mount-point"></div>
   ```

   ```
   // 创建构造器
   var Profile = Vue.extend({
   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>', // 节点
   data: function () { // 必须为函数
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
   }
   })
   // 创建 Profile 实例，并挂载到一个元素上。
   new Profile().$mount('#mount-point')
   ```
