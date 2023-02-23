// 在 store 中的操作
// 获取首页数据后,计算倒计时时间戳
// let restTime = res.data.endTime - res.data.currentTime;
// countDown(restTime); // 执行倒计时
// countdownObj: null; // 定义倒计时对象
// setCountdownObj(obj) { // 定义赋值方法
// this.countdownObj = obj
// }

// 在倒计时页面的操作
// let countTimer = null // 定义倒计时定时器
// const countDown = (num) => {
// num -= 1000;
// this.countTimer = setInterval(() => {
// if (num < 1000) {
// indexCtrl.getHomeInfo(); // 重新请求首页数据
// clearTimeout(this.countTimer);
// }
// const restObj = second2Date(num); // utils 文件中引入 second2Date
// store.setCountdownObj(restObj);
// }, 1000);
// }

// 在页面 dom 如何使用
// const { countdownObj } = store;
// countdownObj.hour;
// countdownObj.minute;
// countdownObj.second;

/**
 * 秒转时间对象
 * @param {Number} totalSecond 总秒数
 * @return {{
 *  day: String,
 *  hour: String,
 *  minute: String,
 *  second: String
 * }}
 */
const second2Date = (totalSecond) => {
  const millisecond = totalSecond % 1000;
  totalSecond = totalSecond / 1000;

  // 获得总分钟数
  const totalMinute = totalSecond / 60;
  // 获得剩余秒数
  const second = totalSecond % 60;
  // 获得小时数
  const totalHour = totalMinute / 60;
  // 获得分钟数
  const minute = totalMinute % 60;
  // 获得天数
  const day = totalHour / 24;
  // 获得剩余小时数
  const hour = totalHour % 24;
  // 格式化的键值
  const includesKey = [
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "totalHour",
    "totalMinute",
  ];
  // 日期对象
  const dateObj = {
    day,
    hour,
    minute,
    second,
    millisecond,
    totalHour,
    totalMinute,
  };

  return Object.entries(dateObj).reduce((preVal, [key, value]) => {
    // 值取整
    value = parseInt(value);

    if (includesKey.includes(key) && value < 10) {
      if (value < 0) {
        preVal[key] = "00";
      } else {
        preVal[key] = "0" + value;
      }
    } else {
      if (value.toString() === "NaN") {
        preVal[key] = "0";
      } else {
        preVal[key] = value.toString();
      }
    }

    return preVal;
  }, {});
};
