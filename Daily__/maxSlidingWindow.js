// 求最大滑动区域内的最大值。

// 暴力解法
// 时间复杂度：O(n*k)  空间复杂度：O(n)

const maxSlidingWindow = function (nums, k) {
  if (k === 1) return nums
  let result = [], arr = []
  for (let i = 0; i < nums.length; i++) {
    arr.push(nums[i]) // 队尾添加一个新值
    if (i >= k - 1) {
      result.push(Math.max(...arr))
      arr.shift() //删除第一个入栈的值
    }
  }
  return result
};

const arr = [1, 3, -1, -3, 5, 3, 6, 7]
const arr2 = [3, 1, -1, -3, 5, 3, 6, 7]
const k = 3
// console.log(maxSlidingWindow(arr, k))


// 优化： 双端队列
// 解题思路： 使用一个双端队列存储窗口中值的 索引 ，并且保证双端队列中第一个元素永远是最大值，那么只需要遍历一次 nums，就可以取到每次移动时的最大值。
// 时间复杂度 O(n)  空间复杂度 O(n)

const maxSlidingWindow2 = function (nums, k) {
  const queue = []
  const result = []
  for (let i = 0; i < nums.length; i++) {

    if (i - queue[0] >= k) {
      // 把滑动窗口之外的踢出
      queue.shift()
    }

    //这里有一个循环 可以帮助一直检查队列的值是否和当前的比更小，更小就删除，直到比较到第一个元素。
    while (nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop()
    }

    queue.push(i)
    
    if (i >= k - 1) {
      result.push(nums[queue[0]]) // 由于上面的 while 所以队列的第一个就是最大值的下标
    }
  }
  return result
}

const arr3 = [9, 1, 2, 4, 9, 5]
console.log(maxSlidingWindow2(arr3, k))