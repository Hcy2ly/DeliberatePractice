## 算法题集锦

1. 二分查找 [binarySearch.js]
  题目：
    给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
  过程：
    设定左右指针
    找出中间位置，并判断该位置值是否等于 target
    nums[mid] == target 则返回该位置下标
    nums[mid] > target 则右侧指针移到中间
    nums[mid] < target 则左侧指针移到中间