/*****
 * 长度最小的子数组
 * ！！！滑动窗口
 */


// 题目
//  给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 示例：
// 输入：s = 7, nums = [2, 3, 1, 2, 4, 3] 输出：2 解释：子数组[4, 3] 是该条件下的长度最小的子数组。

// 思路 ====> 滑动窗口
// 所谓滑动窗口，就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果。
// 简单理解，求出第一个滑动窗口的长度 = 结束位置 - 开始位置，长度越小，滑动窗口越小，把其设为最小滑动窗口min。然后用剩下所有满足条件的窗口长度与其进行Math.min的对比，比较后的最小滑动窗口赋值给min。min 的这个范围内的数组就是最小长度，最小滑动窗口。


// 在本题中实现滑动窗口，主要确定如下三点：
// 窗口内是什么？
// 如何移动窗口的起始位置？
// 如何移动窗口的结束位置？

// 窗口就是 满足其和 ≥ s 的长度最小的 连续子数组。
// 窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。
// 窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，窗口的起始位置设置为数组的起始位置就可以了。
// 解题的关键在于 窗口的起始位置如何移动，可以发现滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置。


function minSubArrayLen(arr, target) {
  let total = start = end = 0;  // 定义最小区间的total、开始节点和结束节点。
  let min = arr.length - 1; // 假设数组所有加起来为最小区间距离，那最小间距就是长度-1

  // 只要end节点小与数组长度 都在可移动区域内。
  while (end < arr.length) {
    console.log(total, start, end)
    if (total >= target) {
      min = Math.min(end - start, min);
      total -= arr[start];
      start++;
    } else {
      total += arr[end];
      end++;
    }
  }

  // 当需要改变for循环的i值时，不是正常递增递减，建议用 while。
  // for (end = 0; end < arr.length;) {
  //   console.log(total, start, end)
  //   if (total >= target) {
  //     min = Math.min(end - start, min);
  //     total -= arr[start];
  //     start++;
  //   } else {
  //     total += arr[end];
  //     end++
  //   }
  // }

  return min
}

const arr = [1, 2, 3, 4, 5, 6, 4, 3]
const target = 9;
console.log(minSubArrayLen(arr, target))


// ts版本
// function minSubArrayLen(target: number, nums: number[]): number {
//   let left: number = 0, right: number = 0;
//   let res: number = nums.length + 1;
//   let sum: number = 0;
//   while (right < nums.length) {
//     sum += nums[right];
//     if (sum >= target) {
//       // 不断移动左指针，直到不能再缩小为止
//       while (sum - nums[left] >= target) {
//         sum -= nums[left++];
//       }
//       res = Math.min(res, right - left + 1);
//     }
//     right++;
//   }
//   return res === nums.length + 1 ? 0 : res;
// };
