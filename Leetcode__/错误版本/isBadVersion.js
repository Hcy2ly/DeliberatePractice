/**
 * Definition for isBadVersion()
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
 var isBadVersion = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
       let left = 1, right = n;
      while (left < right) { // 循环直至区间左右端点相同
          const mid = Math.floor(left + (right - left) / 2); // 防止计算时溢出 - 取整
          if (isBadVersion(mid)) { //如果中间值是错误的版本 说明正确的版本在 [left, mid] 之间
              right = mid; // 答案在区间 [left, mid] 中
          } else {
              left = mid + 1; // 答案在区间 [mid+1, right] 中
          }
      }
      // 此时有 left === right，区间缩为一个点，即为答案
      return left;
  };
};