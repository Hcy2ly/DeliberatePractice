/**
 * 当前是零就把当前零值和当前for循环非零值调换
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead. 不能拷贝额外的数组呢
 */
var moveZeroes = function (nums) {
  // 这道题目的正确思路其实是想让我们更换位置
  if (nums == null || nums.length <= 1) {
    return;
  }
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      nums[index] = nums[i];
      if (index != i) {
        nums[i] = 0;
      }
      index++;
    }
  }

  return nums;
};

// const arr = [1, 0, 3, 0, 6, 0, 0, 7];
// const arr2 = [0, 1, 0];
// console.log(moveZeroes(arr));
// console.log(moveZeroes(arr2));

/**
 * 两数之和 || - 输入有序数组
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let [x, y] = [-1, -1];
  const map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    if (!map.has(numbers[i])) {
      map.set(target - numbers[i], i + 1);
    } else {
      [x, y] = [map.get(numbers[i]), i + 1];
    }
  }

  return [x, y];
};

const arr3 = [1, 3, 6, 7];
const arr4 = [2, 7, 11, 15];
const arr5 = [-1, 0];
console.log(twoSum(arr3, 9));
console.log(twoSum(arr5, -1));
