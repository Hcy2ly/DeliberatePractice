/**
 * 二分查找 --- debugger
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let index = -1;
  if (!nums.length) return // 数组不存在

  const step = (start, end) => {
    if (start > end) return
    let middle = Math.floor((end + start) / 2); // 中间偏前的index
    if (nums[middle] === target) {
      index = middle
      return
    }
    if (nums[middle] > target) {
      step(start, middle)
    }
    if (nums[middle] < target) {
      step(middle, end)
    }
  }
  step(0, nums.length - 1)
  return index
};


const arr = [-1, 0, 3, 5, 9, 12]
const target = 2
console.log(search(arr, target))

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
 function binarySearch(arry, val) {  
	let start = 0
	let end = arry.length - 1
	while (start <= end) {
		let mid = start + Math.floor((end - start) / 2)
		if (arry[mid] < val) {
			start = mid + 1
		} else if (arry[mid] > val) {
			end = mid - 1
		} else {
			return mid
		} 
	} 
	return -1
} 
module.exports = binarySearch
