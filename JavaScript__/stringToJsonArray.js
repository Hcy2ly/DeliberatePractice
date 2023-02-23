const isJSONArray = (arr) => {
  try {
    const arrItemIsObj = (arr.length > 0 && (arr.filter(item => item && (JSON.stringify(item) !== '{}' && Object.prototype.toString.call(item) === "[object Object]")).length === arr.length))
    console.log(111, arrItemIsObj)
    if (arrItemIsObj && Object.prototype.toString.call(arr) === '[object Array]' && arrItemIsObj) {
      return true
    }

    return false;
  } catch (e) {
    return false;
  }
};

const value = [{a: 1}]
console.log(isJSONArray(value))