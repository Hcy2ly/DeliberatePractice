/*****
 * 螺旋矩阵2
 * 找规律 顺时针, 上横向 (0,0)->(n-1, 0), 右纵向(n, 0)->(n, m-1), 下横向(n, m)->(1, m), 左纵向(0,m)->(0, 1).
 * 找规律 奇数中间会留一个,单独赋值; 偶数不会。
 */

// 题目
// 给定一个正整数 n，生成一个包含 1 到 $n ^ 2$ 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

// 示例:
// 输入: 3 输出: [[1, 2, 3], [8, 9, 4], [7, 6, 5]]


// 思路  ====  顺时针 正方形 二维数组
// 1 到 n ^ 2 的所有元素 说明是一个正方形  输入 3 就是 9个数 排成每行3个的正方形


function generateMatrix(n) {
  // let arr = new Array(n*n); // 数组长度 n*n 
  // 从左上的节点开始算 
  // 通用左闭右开的原则。
}