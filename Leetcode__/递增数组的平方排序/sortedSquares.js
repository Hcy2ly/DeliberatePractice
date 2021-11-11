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

  // map.values() 返回的是一个数组 但是实际不是Array类型  没有Array原型链上的方法

  return quickSort([...map.values()])
}

// 每次选择最左边的数作为基数 - 快排 - 二分法 - 以中间值作为基准，左边push小于自己的 右边push大于自己的  然后递归push 然后最后就是有序数组。
function quickSort(arr) {
  if (arr.length < 2) { return arr; }
  // 定义左指针
  var left = 0;
  // 定义右指针
  var right = arr.length - 1;
  //开启每一轮的排序
  while (left < right) {
    // 寻找右边比arr[0]小的数的下标
    while (arr[right] >= arr[0] && left < right) {
      right = right - 1;
    }
    // 寻找左边比arr[0]大的数的下标
    while (arr[left] <= arr[0] && left < right) {
      left++;
    }
    //当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
    if (right == left) {
      let mid = arr[right];
      arr[right] = arr[0];
      arr[0] = mid;
      break;
    }
    // 当左指针小于右指针的位置，交换两个指针当前位置的元素
    let tem = arr[right];
    arr[right] = arr[left];
    arr[left] = tem;
  }
  //递归实现
  return quickSort(arr.slice(0, left)).concat(arr.slice(left, right + 1)).concat(quickSort(arr.slice(right + 1)));
}


const arr = [-4, -1, 0, 2, 4, 6]
console.log(sortedSquares(arr))
