// 题目： 判断是否是回文字符串

// 使用api
function isPalindromeString(input) {
  if(typeof input !== 'string') return;
  return  input.split('').reverse().join('') === input
}

// 不使用api
function isPalindromeString(input) {
  if (typeof input !== 'string') return false;
  let i = 0, j = input.length - 1;
  while(i < j) {
      if(input.charAt(i) !== input.charAt(j)) return false
      i ++
      j --
  }
  return true
}