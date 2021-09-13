const parseIntPlus = function (s) {
  // parseInt
  const number = parseInt(s);

  // 判断 parseInt 的结果是否为 NaN，是则返回 0
  if (isNaN(number)) {
    return 0;
  } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
    // 超出
    return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
  } else {
    return number;
  }
}


console.log(parseIntPlus('5454 hhh 545')) // 5454



// TODO: 追更 parseInt 的实现