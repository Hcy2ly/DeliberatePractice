/**
 * Definition for singly-linked list. 单链表
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 题目：给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head
 * 解题思路： 快慢指针，快指针一次走两个节点，慢指针一次走一个节点所以当快指针走完了 慢指针走到的位置就是中间节点。
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  //边界情况：head为单节点
  let slow = head,
    fast = head.next;
  if (fast == null) return null;
  while (fast.next != null && fast.next.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  slow.next = slow.next.next;

  return head;
};

// 链表就是
// O > next => 1 > next => 2 ... n > next

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 题目：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 要求：能尝试使用一趟扫描实现吗？
 * @param {ListNode} head
 * @param {number} n  (n一定是对存在的结点做处理)
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const pre = {
    next: head,
  };

  let fast = head;

  while (n--) {
    fast = fast.next;
  }
  // 上面等于
  // while (n) {
  //   fast = fast.next;
  //   n--;
  // }
  // 这里 fast = head，是第n-1个结点

  let slow = pre;

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next; // 删除第n个

  return pre.next;
};
