## 2021 0913

1. 值得记录的面试总结：https://juejin.cn/post/6991724298197008421#comment [建议用来知识梳理]

2. 每日算法：第一个只出现一次的字符 [firstUniqChar.js]
   题目：
        在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。s 只包含小写字母。
   解答：
        使用 map 两次遍历即可。
        遍历字符串，将每个字符的值与出现次数记录到 map 中。
        再次遍历 map.keys() ，获取 map 中每个字符出现的次数，判断是否仅仅只有 1 次，返回第一个仅出现一次的字符
