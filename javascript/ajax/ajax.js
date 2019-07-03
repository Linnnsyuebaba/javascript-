function ajax(options) { //options: {url, type, async, data, timeout, success, error}
    let xmlHttp
    let timer //定时器
    let url = options.url
    const type = options.type
    const async = options.async
    const data = options.data
    const timeout = options.timeout
    const success = options.success
    const error = options.error
    if (window.XMLHttpRequest) { //兼容性处理
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    function objToStr(data) { //参数拼接
        let res = []
        for (key in data) {
            res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key])) //规避汉字
        }
        return res.join('&')
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200 && xmlHttp.status < 300 || xmlHttp.status === 304) {
                options.success(xmlHttp)
            } else {
                options.error(xmlHttp)
            }
        }
    }
    if (type.toLowerCase() === 'get') {
        xmlHttp.open(type, url + '?' + objToStr(data), async)
        xmlHttp.send()

    } else {
        xmlHttp.open(type, url, async)
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(objToStr(data))
    }
    if (options.timeout) { //超时设置
        timer = setInterval(function () {
            xmlHttp.abort()
            clearInterval(timer)
        }, options.timeout)
    }
}

//测试
ajax({
    url: 'server.php',//your server
    type: 'get',
    data: {
        "username": "越粑粑",
        "password": "123123"
    },
    async: true,
    timeout: 3000,
    success: function(res){
        console.log("请求成功", res.responseText)
    },
    error:function(err){
        console.log("请求失败", err.status)
    }
})