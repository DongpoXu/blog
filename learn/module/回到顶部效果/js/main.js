// 页面加载完毕触发
window.onload = function () {
    var oBtn = document.getElementById("btn");
    // 获取可视区域高度
    var clientHeight = document.documentElement.clientHeight;
    var timer = null;
    // 滚动停止标志
    var iStop = false;

    window.onscroll = function () {
        var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;     //兼容性设置
        oBtn.style.display = oScrollTop >= clientHeight ? "block" : "none";     //条件运算符简化if-else
        if (iStop) {
            clearInterval(timer);
        }
        iStop = true;
    };

    oBtn.onclick = function () {
        // 设置定时器
        timer = setInterval(function () {
            // 获取滚动条顶部位置
            var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;     //兼容性设置

            // 定义速度
            var iSpeed = Math.ceil(oScrollTop / 5);
            document.documentElement.scrollTop = document.body.scrollTop = oScrollTop - iSpeed;

            iStop = false;
            // 打印顶部位置
            console.log(oScrollTop);
            // 到头停止
            if (oScrollTop === 0) {
                clearInterval(timer);
            }
        }, 30);
    };

};