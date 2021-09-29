// 题目： 字符串单词反转

// 正则匹配 + js API
var reverseWords = function (s) {
  return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ')
  // reverse 颠倒
};


// 两端队列 js原生实现
var reverseWords2 = function (s) {
  // 思路
  // 1. 两端去除空格  ==>  实现trim
  // 2. 将出现空格前面的单词放入到队列中 最新的从头部连接（队列头部插入） => 实现[].reverse.join(' ')
  // 3. 也可用[] + chartAt + unshift 的方式在数组队列的头部加入当前这个单词 最后join  // charAt() 字符串方式 返回下标为几的元素

  let left = 0;
  let right = s.length - 1
  let words = ''
  let curWord = ''

  while (s[left] === ' ') left++; // 左边清除空字符串
  while (s[right] === ' ') right--; // 右边清除空字符串

  while (left <= right) {
    if (s[left] === ' ') {
      words = words ? (curWord ? curWord + ' ' : '') + words : curWord // 一旦遇空字符串 说明上一个单词已经完整 把它接入最后返回的单词words中  并把当前的单词清空
      curWord = ''

    } else {
      curWord += s[left] //发现连接字符 把当前单词拼接完整
    }

    left++;
  }

  words = words ? (curWord ? curWord + ' ' : '') + words : curWord // 最后没有空字符串  记得把最后的值连接到字符串上
  // console.log(words)
  return words
};

const str = ' hello world!  '
console.log(reverseWords(str))
console.log(reverseWords('  1'))
reverseWords2(str)
reverseWords2('  ')
reverseWords2('  1')

