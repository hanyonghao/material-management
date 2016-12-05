const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const routes = require('./routes');

//初始化：创建服务端
http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname; //获取请求资源的url
    let action = routes[pathname]; //获取对应的api处理
    if(action && typeof action == 'function'){ //如果是预设的api

        let postData = ""; //post请求的参数
        let getData = url.parse(req.url, true).query; //get请求的参数

        //请求数据时
        req.on("data", data => {
            postData += data;
        });

        //请求结束时
        req.on("end", () => {
            req.body = qs.parse(postData); //设置参数
            req.query = getData; //设置参数
            action(req, res); //则执行
        });

    }else{ //否则，当作静态文件访问
        let filepath = path.join(__dirname, '..', pathname); //资源文件的真实路径
        fs.readFile(filepath, function (err, file) { //读取资源文件
            if (err || pathname.indexOf("server") > 0 ) { //如果资源文件不存在,或者访问服务器文件，则返回错误页面
                res.writeHead(302, {'Location': '/error.html'}); //设置响应头信息，重跳转到错误页
                res.end(); //响应请求
                return; //结束
            }
            let type = filepath.substring(filepath.indexOf(".") + 1, filepath.length); //获取访问资源后缀名
            switch(type){  //对应类型设置响应头信息
                case "html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case "js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case "css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case "gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case "jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case "png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                case "ico":
                    res.writeHead(200, {"Content-Type": "image/x-icon"});
                    break;
                /*  这里注释不处理以上类型以外的文件
                 *  default:
                 *      res.writeHead(200, {"Content-Type": "application/octet-stream"});
                 */
            }
            res.end(file); //响应请求
        });
    }
}).listen(8080); //监听端口

console.log(`服务已启动：http://localhost:8080/`); //输出文本