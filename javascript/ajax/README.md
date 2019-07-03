## 两种ajax手写实现
  常用的ajax通过XMLHttpRequest对象实现，由于存在ie6，ie5版本的独特性，往往会进行兼容性处理
  ```javascript
    if (window.XMLHttpRequest) { //兼容性处理
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  ```
  实例化后
  > #### 请求
  ```javascript
    xmlHttp.open(method, url, async)  
    xmlHttp.send(data)  //data仅用于POST请求
    
    POST和GET不同在于请求头以及请求数据的方式
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  ```
  > #### 响应
    onreadystatechange事件，每当readyState发生改变时都会触发onreadystatechange，有以下几个状态：
    
    * 0 （未初始化）还没有调用send()
    - 1 （载入）已调用send()，正在发送请求
    - 2 （载入完成）send()执行完成，已经接收到全部响应内容
    - 3 （交互）正在解析响应内容
    - 4 （完成）响应内容解析完成，可以在客户端调用了
    
    responseText 获取字符串形式的相应结果
    status 响应状态码，有以下状态：
    
    - 2xx ——表示成功请求处理，eg: 200
    - 3xx ——表示需要重定向，浏览器直接跳转
    - 4xx ——表示客户端请求错误，eg:404 not found、403 请求不允许、401 请求授权失败
    - 5xx ——表示服务端错误，eg:500 服务端报bug
    
