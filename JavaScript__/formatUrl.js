
// 处理有前缀的 url 换成 https://
const formatUrl = (url, expectFormat = 'https://') => {
  if (!url) {
    return url
  }
  if (url.startsWith(expectFormat)) {
    return url
  }

  return url.replace(/^\/\/|http:\/\/|https:\/\//, expectFormat)
}

const url = '//kjj-s.duibatest.com.cn/s/Kt31NDU0OTU'
console.log(formatUrl(url))