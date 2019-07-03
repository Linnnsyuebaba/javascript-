function ajax(options) {
    let url = options.url
    const type = options.type
    const async = options.async
    const data = options.data
    const timeout = options.timeout
    let xmlHttp = new XMLHttpRequest()  //不处理对ie6以下版本的兼容
    xmlHttp.timeout = timeout   

    function ToString(data) {   //请求参数拼接
        let res = []
        for (key in data) {
            res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key])) //规避汉字请求
        }
        return res.join("&")
    }
    return new Promise((resolve, reject) => {       //promise对象
        xmlHttp.ontimeout = () => {
            reject && reject('请求超时')
        }
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200 && xmlHttp.status < 300 || xmlHttp.status === 304) {
                    resolve && resolve(xmlHttp)
                } else {
                    reject && reject(xmlHttp)
                }
            }
        }
        xmlHttp.onerror = (err) => {
            reject && reject(err)
        }
        if (type.toLowerCase() === 'get') { //大小写不限
            xmlHttp.open(type, url + '?' + ToString(data), async)
            xmlHttp.send()
        } else {
            xmlHttp.open(type, url, async)
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(ToString(data))
        }
    })

}

// 测试
ajax({
    url: 'server.php',  //your server
    type: 'get',
    data: {
        "username": "越粑粑",
        "password": "123123"
    },
    async: true,
    timeout: 3000
})
.then(
    res => {
        console.log('请求成功')
        console.log(res.responseText)
    }
)
.catch(
    err => {
        console.log('请求失败')
        console.log(err.status)
    }
)
