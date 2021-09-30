const res = {
  "success": true,
  "code": "0000000000",
  "desc": "OK",
  "timestamp": 1632913455725,
  "data": {
    "id": 247960,
    "title": "超准！孩子未来性格测试，帮你收集少儿保险相关客户信息",
    "publicly": 1,
    "status": 2,
    "gmtCreate": 1632647462000,
    "companyList": [],
    "tags": {
      "1": [{
        "itemId": 247960,
        "type": "game_answer",
        "id": 260,
        "tagType": "game_answer",
        "name": "小游戏",
        "level": 1,
        "parentTagId": null,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 260,
        "tagType": "game_answer",
        "name": "小游戏",
        "level": 1,
        "parentTagId": null,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 260,
        "tagType": "game_answer",
        "name": "小游戏",
        "level": 1,
        "parentTagId": null,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 260,
        "tagType": "game_answer",
        "name": "小游戏",
        "level": 1,
        "parentTagId": null,
        "tagImg": null,
        "intro": null
      }],
      "2": [{
        "itemId": 247960,
        "type": "game_answer",
        "id": 264,
        "tagType": "game_answer",
        "name": "获客",
        "level": 2,
        "parentTagId": 260,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 266,
        "tagType": "game_answer",
        "name": "宝妈",
        "level": 2,
        "parentTagId": 260,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 268,
        "tagType": "game_answer",
        "name": "男性",
        "level": 2,
        "parentTagId": 260,
        "tagImg": null,
        "intro": null
      }, {
        "itemId": 247960,
        "type": "game_answer",
        "id": 271,
        "tagType": "game_answer",
        "name": "家庭",
        "level": 2,
        "parentTagId": 260,
        "tagImg": null,
        "intro": null
      }]
    },
    "tagList": [],
    "readNum": null,
    "sharedNum": null,
    "shareDocument": "",
    "mainImgUrl": "//yun.dui88.com/kjy/image/20210926/1632647438847.png",
    "homeImgUrl": "",
    "remark": "备注",
    "activityUrl": "/pages/child-character",
    "activityDes": "这是活动简介",
    "previewImageUrl": "//yun.dui88.com/kjy/image/20210926/1632647438847.png",
    "timeOpening": null,
    "contentVersion": 1,
    "recommendDesc": "",
    "isCollectCustomData": false,
    "customizeFields": []
  }
}

if (res.data.tags) {
  const tagsArr = []
  // for in 遍历对象属性 （对于可枚举属性有排列规则，所以这里需要后端数据按排序规则依次返回数据，不然这里for in 出来的属性会被打乱顺序）
  for (const i in res.data.tags) {
    res.data.tags[i].map((e, j) => { // 取出二维数组的每项
      // 如果 tagsArr[j] 存在 就取 tagsArr[j] 去concat  否则就 [].concat
      tagsArr[j] = (tagsArr[j] || []).concat([e.id])
    })
  }
  console.log(tagsArr)  // [ [ 260, 264 ], [ 260, 266 ], [ 260, 268 ], [ 260, 271 ] ]
}

// let obj = {
//   data: ['hello', 'world'],
//   [Symbol.iterator]() {
//     const self = this;
//     let index = 0;
//     return {
//       next() {
//         if (index < self.data.length) {
//           return {
//             value: self.data[index++],
//             done: false
//           };
//         }
//         return { value: undefined, done: true };
//       }
//     };
//   }
// };
// const arr = [...obj]
// console.log(333, arr) // ['hello', 'world']

// 类似数组的对象部署 Symbol.iterator 是可以被 for of 遍历的
// let iterable = {
//   1: [{ a: 1, b: 2 }],
//   2: [{ a: 3, b: 4 }],
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // [ { a: 1, b: 2 } ]   [ { a: 3, b: 4 } ]
// }

// let iterable = {
//   'lz': [{ a: 1, b: 2 }],
//   'ly': [{ a: 3, b: 4 }],
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // 无，so普通对象部署Symbol.iterator是没有任何效果的，补充：用...运算符会报错
// }

