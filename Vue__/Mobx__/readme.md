# mobx

1.  behavior 接受一个数组，数组的元素为 storeBindingsBehavior, computedBehavior， observerBehavior 等。
2.  需要先引入 behaviors 再引入行为包，再使用行为。

    import computedBehavior from 'miniprogram-computed'
    import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'

    behaviors = [
    storeBindingsBehavior, // 使用 storeBindings，就要引入 store 的 behavior
    computedBehavior // 使用 computed 就要引入 compute 的 behavior
    ]

    storeBindings = [
    {
    store: prospectStore, // 引入包 看哪里声明了这个模块
    fields: ['state'], // 将 prospectStore 模块中的 state 变量值赋值取出来用 - 默认会挂在 data 上 在 wxml node 中可以直接使用
    },
    ]

    computed = {
    /\*_ 是否为客服消息按钮 _/
    isContactButton(data) {
    const { resourceType, outLinkType } = data?.data

        if (resourceType === RESOURCE_TYPE.WECHAT_PUBLIC_ACCOUNT) return true
        if (resourceType === RESOURCE_TYPE.LINK && outLinkType === OUT_LINK_TYPE.KE_FU) return true

        return false

    }
    }

3.  observers \ computed 里面需要用到 store 的时候 也需要先引入 behavior
