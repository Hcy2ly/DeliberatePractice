// 二叉树的层序遍历

// 广度优先 - 通过每层比较取val然后push
var levelOrder = function (root) {
  if (!root) return []
  let res = [],
    queue = [root]
  while (queue.length) {
    let curr = [],
      temp = []
    while (queue.length) { // 只要queue有length，就会继续。
      let node = queue.shift() // 删除原数组第一项并会返回第一项。注意：会改变原数组的结构。【广度优先表现】
      curr.push(node.val) // 取当前层的val push进curr
      if (node.left) temp.push(node.left) // 如果子节点存在就push进temp
      if (node.right) temp.push(node.right)
    }
    res.push(curr) // 把每个层级的值push进最终的res
    queue = temp // 最后的temp，赋值给queue
  }
  return res
};
// 方式：假设二叉树queue为[{val, left: {val, left, right},right: {}}] 
// => (这里的for循环是用while(queue.length)+queue.shift() 实现的)for循环取出queue数组的每个元素的第一层val，得出第一层级[val], 然后看第二层的left和right是否有值，有就push进去当前的temp，将新的temp赋值给queue，这时候queue为[<left>{val, left, right}, <right>{val, left, right}]
// => 同上for，得出第二层[left.val, right.val]，以此类推。





// 深度优先 - 通过递归的方式，数组嵌套数组，目标二维数组+层级索引去push每个层级的值。是深度比较。
var levelOrder2 = function (root) {
  const res = []
  var dep = function (node, depth) {
    // 遍历当前的层级节点。然后层级+1。二叉树node每个层级的形式为:
    // {
    //   val: number,
    //   left: {val: number, left?, right?} ||  null,
    //   ight: {val: number, left?, right?} || null,
    // }
    if (!node) return
    res[depth] = res[depth] || []
    res[depth].push(node.val) // 把当前的层级的父节点值push进去返回数组
    dep(node.left, depth + 1) // 左边dep 如果left.left依旧存在就会继续dep 走完左边才会开始往右走 【深度优先遍历体现】
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