/**
 * 二分查找 --- debugger
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (nums, target) {
  let index = -1;
  if (!nums.length) return // 数组不存在

  const step = (start, end) => {
    if (start > end) return

    let middle = Math.floor((end + start) / 2); // 中间偏前的index

    if (nums[middle] === target) {
      index = middle
      return
    } else if (nums[middle] > target) {
      step(start, middle - 1)
    } else {
      step(middle + 1, end)
    }
  }

  step(0, nums.length - 1)
  return index
};


const arr = [-1, 0, 3, 5, 9, 12]
const arr2 = [2]
const target = 5
const target2 = 2
console.log(binarySearch(arr, target))
console.log(binarySearch(arr2, target2))

// 思路：
// 设定左右指针
// 找出中间位置，并判断该位置值是否等于 target
// nums[mid] == target 则返回该位置下标
// nums[mid] > target 则右侧指针移到中间
// nums[mid] < target 则左侧指针移到中间


/**
 * [二分查找算法实现]
 * @param  {array}  
 * @param  {number} val  [value]
 * @return {number}      [index]
 */
function binarySearch2(arr, val) {
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2)
    if (arr[mid] < val) {
      start = mid + 1
    } else if (arr[mid] > val) {
      end = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

module.exports = binarySearch2

console.log(binarySearch2(arr, target))
console.log(binarySearch2(arr2, target2))
