## 2021 0908

1. js 复杂判断的更优雅的写法

    if/else
    switch
    一元判断时：存到Object里
    一元判断时：存到Map里
    多元判断时：将condition拼接成字符串存到Object里
    多元判断时：将condition拼接成字符串存到Map里
    多元判断时：将condition存为Object存到Map里
    多元判断时：将condition写作正则存到Map里

    **不同： 不同条件执行相同语句，可以用switch、object简化。普通对象字面量的key只能是字符串，Map对象可以用任何类型的数据作为key，比如对象、正则对象等。**

2. 实现一个 将字符串转换成整数 的函数。[parseIntPlus.js]
   分析：
        首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。
        如果第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字字符组合起来，形成一个有符号整数。
        假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成一个整数。
        该字符串在有效的整数部分之后也可能会存在多余的字符，那么这些字符可以被忽略，它们对函数不应该造成影响。

        注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换，即无法进行有效转换。
        在任何情况下，若函数不能进行有效的转换时，请返回 0 。

   提示：
        本题中的空白字符只包括空格字符 ' ' 。 假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，请返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

   案例：
        输入: "   -42"
        输出: -42
        解释: 第一个非空白字符为 '-', 它是一个负号。我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。

        输入: "4193 with words"
        输出: 4193
        解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。

        输入: "words and 987"
        输出: 0
        解释: 第一个非空字符是 'w', 但它不是数字或正、负号。因此无法执行有效的转换。

        输入: "-91283472332"
        输出: -2147483648
        解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 因此返回 INT_MIN (−231) 。

   主要规则：
        忽略开头空格
        忽略整数部分后的字符
        返回有符号整数
        范围在 32 位内
        函数不能进行有效的转换时，请返回 0
        *所有的条件 parseInt 都满足*，除了: 1. 范围在 32 位内（含）;  2. 函数不能进行有效的转换：parseInt 返回的是 NaN.
