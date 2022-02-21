/**
 * 插入位置  返回 target 在 nums 应该被插入的位置 - 优化代码版
 * @param {number[]} nums  不重复升序数组
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let start = 0, end = nums.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (nums[middle] < target) {
      start = middle + 1
    } else {
      end = middle - 1 // 左边的index没变 右边的end是有改变的 所以取 target <=  arr[middle] 的时候的start下标
    }
  }

  return start; // 以左节点为最终插入节点
}
const nums0 = [1, 3, 5, 6] // 可插入5前 也可插入5后
const target0 = 5
console.log(searchInsert(nums0, target0))

const nums = [-1, 0, 2, 3, 6, 9, 12]
const target = 4
console.log(searchInsert(nums, target))

const nums2 = [4]
const target2 = 4
console.log(searchInsert(nums2, target2))

const nums3 = [3]
const target3 = 2
console.log(searchInsert(nums3, target3))

const nums4 = [1, 3]
const target4 = 0
console.log(searchInsert(nums4, target4))


// // 初始版本
// var searchInsert2 = function (nums, target) {
//   if (nums.length === 0) return 0; // 如果数组不存在 插入第一项

//   let start = 0, end = nums.length - 1;

//   while (start < end) {
//     const middle = Math.floor((start + end) / 2);
//     if (nums[middle] === target) {
//       return middle
//     } else {
//       if ((nums[middle] > target)) {
//         end = middle - 1
//       } else {
//         start = middle + 1
//       }
//     }
//   }

//   if (start >= end) {
//     if (nums[start] >= target) {
//       return start
//     } else {
//       return start + 1
//     }
//   }
// }
// console.log(searchInsert2(nums0, target0)) // 2
// console.log(searchInsert2(nums, target)) // 4
// console.log(searchInsert2(nums2, target2)) // 0
// console.log(searchInsert2(nums3, target3)) // 0
// console.log(searchInsert2(nums4, target4)) // 0