function mouWheel(obj, wheelUp, wheelDown) {
    var userInfo = window.navigator.userAgent.toLowerCase();
    if (userInfo.indexOf('firefox') != -1) {
        //火狐下监听鼠标滚轮事件
        obj.addEventListener('DOMMouseScroll', wheel, false);
    } else {
        //非火狐下监听鼠标滚轮事件
        obj.onmousewheel = wheel;
    }
    //事件处理函数
    function wheel(event) {
        var e = event || window.event;
        //阻止浏览器默认行为
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        //阻止事件冒泡
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        //判断滚轮滚动的方向
        if (e.wheelDelta) { //非火狐
            if (e.wheelDelta > 0) {
                wheelUp();
            } else {
                wheelDown();
            }
        } else if (e.detail) { //火狐
            if (e.detail < 0) {
                wheelUp();
            } else {
                wheelDown();
            }
        }
    }
}
