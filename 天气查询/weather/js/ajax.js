function ajax(opts) {
    //设置某些参数的默认值
    var type = opts.type || 'get';
    var isAsyn =  opts.isAysn === false ? false : true;
    //创建请求对象
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    if (opts.type.toLowerCase() == 'get') {
        //判断是否发送数据
        var url = opts.data === undefined ? opts.url : opts.url + '?' + opts.data + '&r=' + new Date().toString();
        //拨号
        xhr.open('get', url, isAsyn);
        //等待响应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    if (opts.success) {
                        opts.success(data);
                    }
                }
            }
        }
        //post请求发送数据
        xhr.send(null);
    } else if (opts.type.toLowerCase() == 'post') {
        xhr.open('post', opts.url, isAsyn);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var data = xhr.responseText;
                    if (opts.success) {
                        opts.success(data);
                    }
                }
            }
        }
        //post请求是否发送数据
        if (opts.data === undefined) {
            xhr.send(null);
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(opts.data);
        }

    }
}



