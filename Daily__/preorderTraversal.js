// 题目： 给定一个二叉树，返回它的 前序 遍历。

// 递归实现前序遍历
var preorderTraversal = (root) => {
  let result = []
  var preOrderTraverseNode = (node) => {
    if (node) {
      // 先根节点
      result.push(node.val)
      // 然后遍历左子树
      preOrderTraverseNode(node.left)
      // 再遍历右子树
      preOrderTraverseNode(node.right)
    }
  }
  preOrderTraverseNode(root)
  return result
};

// 迭代实现
// 利用栈来记录遍历的过程，实际上，递归就使用了调用栈，所以这里我们可以使用栈来模拟递归的过程：
// 1. 首先根入栈
// 2. 将根节点出栈，将根节点值放入结果数组中
// 3.然后遍历左子树、右子树，因为栈是先入后出，所以，我们先右子树入栈，然后左子树入栈
// 4. 继续出栈（左子树被出栈）…….
// 5. 依次循环出栈遍历入栈，直到栈为空，遍历完成
const preorderTraversal = (root) => {
  const list = [];
  const stack = [];

  // 当根节点不为空的时候，将根节点入栈
  if (root) stack.push(root)
  while (stack.length > 0) {
    const curNode = stack.pop()
    // 第一步的时候，先访问的是根节点
    list.push(curNode.val)

    // 我们先打印左子树，然后右子树
    // 所以先加入栈的是右子树，然后左子树
    if (curNode.right !== null) {
      stack.push(curNode.right)
    }
    if (curNode.left !== null) {
      stack.push(curNode.left)
    }
  }
  return list
}