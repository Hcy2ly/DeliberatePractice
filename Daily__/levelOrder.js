// 二叉树遍历
// 广度优先
var levelOrder = function (root) {
  if (!root) return []
  let res = [],
    queue = [root]
  while (queue.length) {
    let curr = [],
      temp = []
    while (queue.length) {
      let node = queue.shift()
      curr.push(node.val)
      if (node.left) temp.push(node.left)
      if (node.right) temp.push(node.right)
    }
    res.push(curr)
    queue = temp
  }
  return res
};

// 深度优先
var levelOrder2 = function (root) {
  const res = []
  var dep = function (node, depth) {
    if (!node) return
    res[depth] = res[depth] || []
    res[depth].push(node.val)
    dep(node.left, depth + 1)
    dep(node.right, depth + 1)
  }
  dep(root, 0)
  return res
};

// 二叉树
const root = {
  val: 3,
  left: {
    val: 9,
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}
console.log(levelOrder(root))
console.log(levelOrder2(root))