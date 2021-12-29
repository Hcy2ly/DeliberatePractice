/**
 * 题目：反转字符串-编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
 * 要求：不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  // 节省代码 利用数组封装好的方法
  // return s.reverse();

  // 原生for循环
  for (let left = 0, right = s.length - 1; left < right; ++left, --right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
  }

  return s;
};

const str = ["h", "e", "l", "l", "o"];
console.log(reverseString(str));

/**
 * 题目： 反转字符串中的单词 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const arr = s.split(" ");
  const newArr = arr.map((e) => {
    return e.split("").reverse().join("");
  });

  return newArr.join(" ");
};

const str2 = "Let's take LeetCode contest";
console.log(reverseWords(str2)); // s'teL ekat edoCteeL tsetnoc
