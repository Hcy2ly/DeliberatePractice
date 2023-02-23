

const isJSON = (obj) => {
  try {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};


const isHasOkDesc = (str) => {
  try {
    const jsonStr = str.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":'); // 属性名字换成有双引号的
    const description = JSON.parse(jsonStr.replace(/'/g, '"')); // 只要有单引号全部换成双引号
    if (description && isJSON(description)) {
      for (let k in description) {
        if (Object.prototype.hasOwnProperty.call(description, k)) {
          if (typeof description[k] !== 'string') {
            return false
          }
        }
      }
      return true
    }  
    return false
  } catch (e) {
    return false
  }
}

const str = '{"name":{}, "age": "年龄"}'
// const str2 = {"name": "{"key": "value"}"} // x
// const str3 = {"name": {"key": "value"}} // x
console.log(isHasOkDesc(str))

