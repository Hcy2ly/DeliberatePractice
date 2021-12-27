// ****** 双指针 *******

/**
 * 平方排序
 * @param {number[]}   nums为递增整数数组
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let arr = [];

  // 如果最后一项就小于等于0，可以理解为是一个负整数递增数组
  if (nums[nums.length - 1] <= 0) {
    arr = nums.reverse().map((e) => e * e);
    return arr;
  }

  // 如果第一项就大于等于0，可以理解为是一个正整数递增数组
  if (nums[0] >= 0) {
    arr = nums.map((e) => e * e);
    return arr;
  }

  let n = nums.length - 1;
  let p = nums.length - 1;
  let j = 0;

  for (let m = 0; m <= n; m++) {
    function fn() {
      // console.log("----", m, n);

      if (nums[m] < 0) {
        if (nums[m] + nums[n] >= 0) {
          // 说明 nums[n]大于|nums[m]|
          arr[p] = nums[n] * nums[n];
          p--;
          n--;
          fn();
        } else {
          arr[p] = nums[m] * nums[m];
          p--;
        }
      } else {
        arr[j] = nums[m] * nums[m];
        j++;
      }
    }

    // console.log("---=====---", arr);
    fn();
  }

  return arr;
};

const numbers = [-5, -2, -1, 0, 1, 3, 4, 6];
const numbers2 = [-7, -3, 2, 3, 11];
const numbers3 = [-5, -3, -2, -1];
const numbers4 = [-3, 0, 2];
// console.log(sortedSquares(numbers));
// console.log(sortedSquares(numbers2));
// console.log(sortedSquares(numbers3));
// console.log(sortedSquares(numbers4));

// 思路
// 1. 先从0左右对半开  左边是小于0的 右边是大于0的
// 2. 再比较两边的值  左右边两的值相加是否大于0  大于0就把左边的值放在右边的值的前面
// * 自己的解法 --- 不好 ---- 没搞清楚这个题目想要自己做什么 ---- 其实最简单的理解就是当前值的平方数组排序
// * 至于其他的优势 -- 比如是递增的 ---- 0的左边的平方是递减，0的右边的平方是递增等。

/**
 * 平方快排
 * @param {*} nums
 * @returns
 */
var sortedSquares2 = function (nums) {
  // 左指针，指向原数组最左边
  let left = 0;
  // 右指针，指向原数组最右边
  let right = nums.length - 1;
  // 创建一个新数组，存储平方值
  let result = new Array(nums.length);
  // 得到元素值平方值，从新数组最后位置开始写
  let write = nums.length - 1;
  // 左右指针相遇（逐渐靠拢的过程）之后不再循环
  while (left <= right) {
    // 如果原数组的左指针对应的平方值大于右指针，那么往新数组最后位置写入左指针对应的平方值
    if (nums[left] * nums[left] > nums[right] * nums[right]) {
      result[write] = nums[left] * nums[left];
      // 左指针右移
      left++;
      // 移动新数组待写入的位置
      write--;
    } else {
      result[write] = nums[right] * nums[right];
      right--;
      write--;
    }
  }
  return result;
};

/**
 * 给一个数组，使其向右轮转 k 位
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead
 */

var rotate = function (nums, k) {
  const len = nums.length;
  let arr = [];
  for (let i = 0; i < len; i++) {
    let j = (i + k) % len;
    arr[j] = nums[i];
  }
  return arr;
};
const array1 = [1, 2, 3, 4, 5, 6, 7];
const r = 1;
console.log(rotate(array1, r)); // fix: [1, 3, 4, 5, 6, 7, 2]
