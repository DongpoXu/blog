window.onload = function () {
    //获取DOM
    var oDemo = document.getElementById("demo");
    var oSmallBox = document.getElementById("small-box");
    var oMark = document.getElementById("mark");
    var oFloatBox = document.getElementById("float-box");
    var oBigBox = document.getElementById("big-box");
    var oBigBoxImg = oBigBox.getElementsByTagName("img")[0];

    //根据鼠标位置在小图片的移入移出，显示和隐藏-放大镜效果和大图片的局部效果
    oMark.onmouseover = function () {
        oFloatBox.style.display = oBigBox.style.display = "block";
    };
    oMark.onmouseout = function () {
        oFloatBox.style.display = oBigBox.style.display = "none";
    };

    //核心事件，鼠标移动事件
    oMark.onmousemove = function (ev) {
        var _event = ev || window.event;    //兼容多个浏览器的event参数模式
        var left = _event.clientX - oDemo.offsetLeft - oSmallBox.offsetLeft - oFloatBox.offsetWidth / 2;
        var top = _event.clientY - oDemo.offsetTop - oSmallBox.offsetTop - oFloatBox.offsetHeight / 2;

        // 边界限定
        if (left < 0) {
            left = 0;
        } else if (left > (oMark.offsetWidth - oFloatBox.offsetWidth)) {
            left = oMark.offsetWidth - oFloatBox.offsetWidth;
        }
        if (top < 0) {
            top = 0;
        } else if (top > (oMark.offsetHeight - oFloatBox.offsetHeight)) {
            top = oMark.offsetHeight - oFloatBox.offsetHeight;
        }

        //定位放大镜位置
        oFloatBox.style.left = left + "px";
        oFloatBox.style.top = top + "px";

        //计算比例
        var percentX = left / (oMark.offsetWidth - oFloatBox.offsetWidth);
        var percentY = top / (oMark.offsetHeight - oFloatBox.offsetHeight);

        //对大图片的位置实时修改
        oBigBoxImg.style.left = -percentX * (oBigBoxImg.offsetWidth - oBigBox.offsetWidth) + "px";
        oBigBoxImg.style.top = -percentY * (oBigBoxImg.offsetHeight - oBigBox.offsetHeight) + "px";
    }
};


