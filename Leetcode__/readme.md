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

2. 插入位置 [searchInsert.js]
  题目：
    给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。请必须使用时间复杂度为 O(log n) 的算法。
  过程：
    设定左右指针
    找出中间位置，并判断位置值是否等于target
    nums[mid] >= target 则右侧指针移到中间，左指针不变
    nums[mid] < target 则左侧指针移到中间 - 1
    返回左指针下标