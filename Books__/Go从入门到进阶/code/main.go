// 标记当前文件为 main 包， main 包也是 Go 程序的入口包。
package main 

// 导入net/http 包，这个包的作用是HTTP的基础封装和访问。
import (
	"net/http"
) 

func main() {
	http.Handle("/", http.FileServer(http.Dir("."))) // 使用http.FileServer 文件服务器将当前的目录作为根目录（“/”） 的处理器，访问根目录，就会进入当前目录。
	http.ListenAndServe(":8080", nil) // 默认的 HTTP 服务侦听在本机的 8080 端口
}
