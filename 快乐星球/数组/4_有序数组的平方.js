/*****
 * 有序数组的平方
 * ！！！考验 双指针 思维
*/

// 题目
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1： 输入：nums = [-4, -1, 0, 3, 10] 输出：[0, 1, 9, 16, 100] 解释：平方后，数组变为[16, 1, 0, 9, 100]，排序后，数组变为[0, 1, 9, 16, 100]

// 示例 2： 输入：nums = [-7, -3, 2, 3, 11] 输出：[4, 9, 9, 49, 121]

// 思路 
// 1. 暴力排序： 最直接的想法就是把平方后的值进行排序。
// 2. 双指针法：从左右出发，比较两端的值的大小，然后从右指针开始赋值。

function sortedSquares(arr) {
  let idx = arr.length - 1;
  let new_arr = [];
  for (let i = 0, j = arr.length - 1; i <= j;) {
    if (arr[i] * arr[i] < arr[j] * arr[j]) {
      new_arr[idx] = arr[j] * arr[j];
      j--;
    } else {
      new_arr[idx] = arr[i] * arr[i];
      i++;
    }
    idx--;
  }

  return new_arr;
}

const arr = [-3, -2, 1, 4, 5, 8]
console.log(sortedSquares(arr))

// ts 收留一个ts版本
// function sortedSquares(nums: number[]): number[] {
//   let left: number = 0, right: number = nums.length - 1;
//   let resArr: number[] = new Array(nums.length);
//   let resArrIndex: number = resArr.length - 1;
//   while (left <= right) {
//     if (Math.abs(nums[left]) < Math.abs(nums[right])) {
//       resArr[resArrIndex] = nums[right--] ** 2;
//     } else {
//       resArr[resArrIndex] = nums[left++] ** 2;
//     }
//     resArrIndex--;
//   }
//   return resArr;
// };