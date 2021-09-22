// 字符串相乘

let multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return "0"

  // 用于保存计算结果
  let res = []

  // 从个位数开始逐位相乘
  for (let i = 0; i < num1.length; i++) {
    // num1 尾元素
    let tmp1 = +num1[num1.length - 1 - i]

    for (let j = 0; j < num2.length; j++) {
      // num2尾元素
      let tmp2 = +num2[num2.length - 1 - j]

      // 判断结果集索引位置是否有值
      let pos = res[i + j] ? res[i + j] + tmp1 * tmp2 : tmp1 * tmp2
      // 赋值给当前索引位置
      res[i + j] = pos % 10
      // 是否进位 这样简化res去除不必要的"0"
      pos >= 10 && (res[i + j + 1] = res[i + j + 1] ? res[i + j + 1] + Math.floor(pos / 10) : Math.floor(pos / 10));
    }
  }
  return res.reverse().join("");
}