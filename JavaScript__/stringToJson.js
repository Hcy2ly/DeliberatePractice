// 判断字符串是否可以反序列化为json对象。
function isJSON(value) {
  if (typeof value == "string") {
    // 如果是一个空字符串
    if (value === "{}") {
      return false;
    }

    // 不是空字符串
    try {
      console.log(
        111,
        JSON.parse(value),
        Object.prototype.toString.call(JSON.parse(value))
      );
      if (
        Object.prototype.toString.call(JSON.parse(value)) === "[object Object]"
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    console.log("It is not a string!");
    return false
  }
  
}

const str = "{}";
const str2 = "{";
const str3 = "[{]";
const str4 = "[{}]";
const str5 = '[{"a": 1}]';
const str6 = '{"a": 1}';
const str7 = "{\"oldReward\":10,\"newReward\":30}"
const str8 = []
const str9 = "null";
// console.log(isJSON(str));
// console.log(isJSON(str2));
// console.log(isJSON(str3));
// console.log(isJSON(str4));
// console.log(isJSON(str5));
// console.log(isJSON(str6));
// console.log(isJSON(str7));
// console.log(isJSON(str8));
console.log(isJSON(str9));
