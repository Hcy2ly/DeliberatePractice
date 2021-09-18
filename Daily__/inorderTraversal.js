// 二叉树的中序遍历.
// 什么是中序遍历？1. 先访问左子树，再访问根节点，最后访问右子树

// 输入: 
//      1
//     / \
//    2   3
//   /   / \
//  4   5   6
// 输出: [4,2,1,5,3,6]

// 递归实现 - 利用深度遍历的方式push值
const inorderTraversal = (root) => {
  let result = []
  var fn = (node) => {
    console.log(111, node)
    if (node) {
      // 先遍历左子树
      fn(node.left)
      console.log(222, node.val)
      // 再根节点
      result.push(node.val)
      // 最后遍历右子树
      fn(node.right)
    }
  }
  fn(root)
  return result
};

// 迭代实现
const inorderTraversal2 = (root) => {
  let list = []
  let stack = []
  let node = root // 定义传入的root为node

  while (node || stack.length) {
    // 遍历左子树
    while (node) {
      console.log(3333, node)
      stack.push(node)
      node = node.left
    }

    node = stack.pop() // 先把左边的每一层节点组合成一个数组对象，最后一个最深最左，所以用while实现循环，pop取出最后一个给node，然后push进list，然后再去算右边。
    list.push(node.val)
    node = node.right
  }
  return list
}

const root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    }
  },
  right: {
    val: 3,
    left: {
      val: 5
    },
    right: {
      val: 6
    }
  }
}

console.log(inorderTraversal(root)) 
console.log(inorderTraversal2(root))
// 输出结果 [4, 2, 1, 5, 3, 6]