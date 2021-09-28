/**
 * 防止重复点击
 */
export function preventRepeatedClick(loading) {
  return function (target, key, descriptor) {
    const originHandle = descriptor.value
    descriptor.value = async function (...args) {
      if (this[loading]) {
        return
      }

      try {
        set(this, loading, true)
        await originHandle.call(this, ...args)
      } catch (e) {
        window.console.error(`[${this.$options.name || 'anonymous'}.${key}]:`, e)
        throw e
      } finally {
        set(this, loading, false)
      }
    }

    return descriptor
  }
}

// 用法
// async handleSubmit() {
//   const res = await fn()
//   if (res && res.success) {
//     // 请求成功获取数据
//   } else {
//     // 请求失败
//   }
// },

