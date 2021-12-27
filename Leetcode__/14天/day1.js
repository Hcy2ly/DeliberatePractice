// ****** 二分查找 *******

/**
 * 二分查找
 * @param  {array} 目标数组arr【是一个升序整型数组】
 * @param  {number} 目标元素值target
 * @return {number}  找到的目标元素值的下标，找不到为-1
 */
function binarySearch(arr, target) {
  // 定义左右指针
  let left = 0; // 左边默认为第一个元素下标
  let right = arr.length - 1; // 右边默认数组最后一个元素下标

  // 控制左指针小于等于右指针，走完一轮for循环遍历
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else if (arr[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
const arr = [-1, 0, 3, 5, 9, 12];
const arr2 = [2];
const target = 5;
const target2 = 2;
console.log(binarySearch(arr, target));
console.log(binarySearch(arr2, target2));

/**
 * 错误版本
 * @param  {function} isBadVersion() 可以判断传入的版本是否是错误版本
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions [1, 2, ..., n] 【版本在这里是一个递增的值】
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1,
      right = n;
    while (left < right) {
      // 循环直至区间左右端点相同
      const mid = Math.floor(left + (right - left) / 2); // 防止计算时溢出
      // 是错误版本 后面都是错误版本，不是错误版本说明前面都不是错误版本
      if (isBadVersion(mid)) {
        right = mid; // 答案在区间 [left, mid] 中
      } else {
        left = mid + 1; // 答案在区间 [mid+1, right] 中
      }
    }
    // 此时有 left == right，区间缩为一个点，即为答案
    return left;
  };
};

/**
 * 插入位置
 * @param {number[]} nums 是一个升序整数数组
 * @param {number} target 给定一个整数 输出第一个插入的位置
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (nums[middle] < target) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return start; // 以左节点为最终插入节点
};
console.log(searchInsert(arr, target));
console.log(searchInsert(arr2, target2));
