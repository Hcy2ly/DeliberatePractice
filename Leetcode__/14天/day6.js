/**
 * 题目：给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 思路：滑动窗口
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let end = -1;
  let len = s.length;
  let max = 0;
  const map = new Map();

  if (len <= 1) {
    return len;
  }

  for (let i = 0; i < s.length; i++) {
    // 如果当前的值存在，并且在[start, end]之间，说明重复了
    if (map.has(s[i]) && map.get(s[i]) >= start) {
      // start 值需要取之前下标的下一个
      start = map.get(s[i]) + 1;
    }

    map.set(s[i], i);
    end = i;

    max = Math.max(max, end - start + 1);
  }

  return max;
};
const str = "a";
const str2 = "absndbabsnh";
const str3 = "ab";
const str4 = "dvdf";
console.log(lengthOfLongestSubstring(str2));

// 记录思路
// 1. 设置开始下标 和结束下标
// 2. 结束下标 - 开始下标 + 1  = 长度
// 3. 利用 map 存不同的值的 下标，并且再下一次出现的时候，更换为最近一次的下标
// 4. 例如： "[a,b,c,d],b,c,a,b" max==4   ===>   "a,[b,c,d],b,c,a,b" 当轮询到下标为4的b的时候，end就不能赋值了，所以 max==3 ...
// 5. 从4可以引申，当我在轮询过程中遇到相同字符，我需要把开始下标改成相同字符上一次的下标+1。

// // 官方解答
// var lengthOfLongestSubstring = function (s) {
//   // 哈希集合，记录每个字符是否出现过
//   const occ = new Set();
//   const n = s.length;
//   // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
//   let rk = -1,
//     ans = 0;
//   for (let i = 0; i < n; ++i) {
//     if (i != 0) {
//       // 左指针向右移动一格，移除一个字符
//       occ.delete(s.charAt(i - 1));
//     }
//     while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
//       // 不断地移动右指针
//       occ.add(s.charAt(rk + 1));
//       ++rk;
//     }
//     console.log(i, rk, occ);
//     // 第 i 到 rk 个字符是一个极长的无重复字符子串
//     ans = Math.max(ans, rk - i + 1);
//   }
//   return ans;
// };

/**
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 * @param {string} s
 * @return {string[]}
 */
var permutation = function (s) {
  // s.reduce();
};
