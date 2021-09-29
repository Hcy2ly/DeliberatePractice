// 题目：最长连续非重复子串的长度 和 子串  【重点：连续和非重复】

// 维护数组
// 时间复杂度：O(n^2)  空间复杂度：O(n)
var lengthOfLongestSubstring = function (s) {
    let arr = [],
        max = 0
    for (let i = 0; i < s.length; i++) {
        let index = arr.indexOf(s[i]) // 获取当前元素在arr里面的下标
        if (index !== -1) {
            arr.splice(0, index + 1); // 如果存在相同字符，删除第一次出现字符被push在arr里面包括自己在内的前面所有元素。【重点：连续】
        }
        arr.push(s.charAt(i)) // 不存在 就push进arr 【重点：非重复】

        max = Math.max(arr.length, max) // 最大长度为 每一轮非重复连续arr的长度 中的最大值
    }
    return max
};

// 维护下标
// 时间复杂度：O(n^2)  空间复杂度：O(n)
var lengthOfLongestSubstring2 = function (s) {
    let max = 0;
    for (let i = 0, j = 0, index; j < s.length; j++) {
        index = s.substring(i, j).indexOf(s[j]) // i为开始下标  j为当前下标  查看当前连续字串是否有现在的字符。
        if (index !== -1) { // 如果有，则修改开始i下标的值
            i = i + index + 1 // 开始的地方 + 1，不算本身
        }
        max = Math.max(max, j - i + 1) // 把每一轮最大的连续
    }
    return max
};

// 优化map
// 时间复杂度：O(n)  空间复杂度：O(n)
var lengthOfLongestSubstring3 = function (s) {
    let map = new Map(), max = 0;
    let p;
    for (let i = 0, j = 0; j < s.length; j++) { // 定义一个i作为连续子串开始的下标
        if (map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i) // Math对象利用key值的唯一性取值，节省了indexOf内部的for循环的时间复杂度，相较于indexOf大大降低时间复杂度。比较两个相同值元素的下标，将下标开始值设置为最新出现的位置。
        }
        if (max < j - i + 1) {
            p = i; // 因为我们可以知道最长子串长度，so我们只需要知道开始的下标就可以通过max 和 p拿到原来s的子串区间值。
        }
        max = Math.max(max, j - i + 1)  // 最大长度为 j结束下标和i开始下标+1  （假设一个数组长度为8，下标是0-7）
        map.set(s[j], j) // 以元素值为key 下标为val
    }
    return { max, str: s.substring(p, max + p) }
};


let str = 'absddbssxdfkjks'
console.log(lengthOfLongestSubstring(str)) 
console.log(lengthOfLongestSubstring2(str))
console.log(lengthOfLongestSubstring3(str)) //sxdfkj