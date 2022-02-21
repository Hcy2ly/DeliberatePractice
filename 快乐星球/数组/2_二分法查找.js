/*******
 * 二分法查找
 * !!!选择二分查找，看是否有两个特性： 1. 数组为有序数组  2. 数组中无重复元素
 */


// 题目
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 - 1。

// 示例 1:
// 输入: nums = [-1, 0, 3, 5, 9, 12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4     

// 示例 2:
// 输入: nums = [-1, 0, 3, 5, 9, 12], target = 2
// 输出: -1
// 解释: 2 不存在 nums 中因此返回 - 1

// 提示：
// 你可以假设 nums 中的所有元素是不重复的。
// n 将在[1, 10000]之间。
// nums 的每个元素都将在[-9999, 9999]之间。


// 思路  ====> 二分递归查找
// 写二分法，区间的定义一般为两种，左闭右闭即[left, right]，或者左闭右开即[left, right)。  ===》原理区别 其实就是for循环中let i=0;i<=nums.length -1 还是 i< nums.length; 一个道理。

function binary_search(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let middle = Math.floor((right - left) / 2) + left  // 1. 考虑到数组长度为奇偶的情况，用 floor，中间值取靠左的元素。  2. 考虑到二分后的数组长度不变，但是查询的数组left、right下标会改变，中间值下标找规律就是 取左下标相对右下标的距离的一般半加上左下标
    if (arr[middle] === target) {
      return middle;
    } else if (arr[middle] < target) {
      // 说明target在 middle的右侧，查询范围变成 [middle+1, right]
      left = middle + 1;
      break;
    } else {
      // 说明target在 middle的左侧，查询范围变成 [left, middle-1]
      right = middle - 1;
      break;
    }
  }

  // 没找到返回 -1
  return -1;
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 9]
// const arr = [1, 2, 3, 4, 5, 6, 7]
// const arr = [1, 3, 4, 5, 6, 7]
// const arr = [1]
// const arr = []
const arr = [3]
const target = 3
console.log(binary_search(arr, target))