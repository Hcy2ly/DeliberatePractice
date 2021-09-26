// /**
//  * 递增数组的平方排序
//  * @param {number[]} nums
//  * @return {number[]}
//  */
// var sortedSquares = function (nums) {
//   const arr = [] // 新数组
//   let left = 0; right = nums.length - 1;

//   if (nums[0] >= 0) {
//     forFn(nums)
//   } else {
//     // while (left < right) {
//     //   const middle = Math.floor(left + right) / 2;
//     //   if (nums[middle] > 0) {
//     //     left++
//     //   } else {
//     //     right--
//     //   }
//     // }

//     // 回调
//     const callback = (start, end) => {
//       const middle = Math.floor(start + end) / 2;
//       if (nums[middle] >= 0) {
//         // arr = [].concat(forFn(nums.splice(middle, end)), arr) // 叠加
//         callback(start, middle - 1);
//       } else {

//       }
//     }

//     callback(left, right)

//   }

//   return arr
// };

// 返回一个平方值
const doubleFn = (num) => {
  return num * num
}

// // 遍历返回所有值
// const forFn = (nums) => {
//   for (let i = 0; i < nums.length; i++) {
//     arr.push(doubleFn(nums[i]))
//   }
// }


// *************** 上面不对 *******************************

// 用 Map 对象试试
var sortedSquares = function (nums) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], doubleFn(nums[i]))
  }
  // FIXME: 排序有问题
  return insertionSort(map.values())
}

function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    const insertIndex = binarySearch(arr, i - 1, arr[i]);

    for (let preIndex = i - 1; preIndex >= insertIndex; preIndex--) {
      arr[preIndex + 1] = arr[preIndex];
    }
    arr[insertIndex] = temp;
  }

  return arr;
}

const arr = [-4, -1, 0, 2, 4, 6]
console.log(sortedSquares(arr))
