// 第一个非重复字符
function firstUniqChar() {
  if (!s) return " " // 字符串为空或者不存在等 返回“”
  
  let map = new Map()
  for (let c of s) {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1)
    } else {
      map.set(c, 1)
    }
  }
  for (let c of map.keys()) { // for of
    if (map.get(c) === 1) {
      return c
    }
  }

  return " " // 全是重复字母也返回“”
}
