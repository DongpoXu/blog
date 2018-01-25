/* JavaScript Document */

/*绑定onload事件，已渐进增强*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
    //console.log(func.name + "函数已经载入'onload'");
}

/*绑定onscroll事件，已渐进增强*/
function addScrollEvent(func) {
    var oldonscroll = window.onscroll;
    if (typeof window.onscroll !== 'function') {
        window.onscroll = func;
    } else {
        window.onscroll = function () {
            oldonscroll();
            func();
        }
    }
    //console.log(func.name + "函数已经载入'onscroll'");
}

/*导航栏下拉菜单，已渐进增强*/
function dropDownNavBar() {
    if (!document.getElementById) {
        //console.log("不支持JS");
        return false;
    }
    if (!document.getElementById("dropButton") && !document.getElementById("dropList")) {
        //console.log("没有dropButton和dropList");
        return false;
    }
    var oDropButton = document.getElementById("dropButton");
    var oDropList = document.getElementById("dropList");
    var oLi = oDropList.getElementsByTagName("li");
    // 符合渐进增强
    var dHeight = oLi.length * 51 + 1 + "px";
    // 下拉菜单
    oDropButton.onclick = function () {
        // 渐变动画效果由CSS实现
        oDropList.style.height = (oDropList.style.height === dHeight) ? "0px" : dHeight;
        //console.log("dropDownNavBar 一切正常");
    };
    // 解决在safari浏览器下返回上一页没有重载的问题
    oDropList.onclick = function () {
        oDropList.style.height = "0px";
    };
}

/*导航栏滚动隐藏，已渐进增强*/
function hideNavBar() {
    if (!document.getElementById) {
        //console.log("不支持JS");
        return false;
    }
    if (!document.getElementById("dropList") && !document.getElementsByClassName("navBar")[0]) {
        //console.log("没有dropList和navBar[0]");
        return false;
    }
    var scrollFlag;
    var oDropList = document.getElementById("dropList");
    var oNavBar = document.getElementsByClassName("navBar")[0];
    var hidden = function () {
        var dUpOrDown;
        // 此处一定要注意，各个浏览器的不同，有坑！
        var dScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 与前一次值作比较
        dUpOrDown = dScrollTop - scrollFlag;
        // safari浏览器在顶部会上弹，导致导航栏异常
        if (dUpOrDown >= 0) {
            oDropList.style.height = "0px";
        }
        if (dScrollTop > window.innerHeight / 2) {
            if (dUpOrDown > 0) {
                // 下拉过程隐藏导航栏
                oNavBar.style.top = "-60px";
            } else if (dUpOrDown < 0) {
                // 上拉过程显示导航栏
                oNavBar.style.top = "0px";
            }
        } else {
            // 显示顶部按钮
            oNavBar.style.top = "0px";
        }
        //console.log("hideNavBar 一切正常");
        // 保留当前数据
        scrollFlag = dScrollTop;
    };
    // 滚动绑定
    addScrollEvent(hidden);
}

/*回到顶部，已渐进增强*/
function backToTop() {
    if (!document.getElementsByClassName) {
        //console.log("不支持JS");
        return false;
    }
    // 用定时过渡滚动效果
    var dTimer = null;
    // 返回顶部函数
    var slowBack = function () {
        // 解决各浏览器在scrollTop上的不同
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 不同速度向上移动
        var speed = Math.floor(-scrollTop / 6);
        if (scrollTop === 0) {
            clearInterval(dTimer);
        }
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
        //console.log("slowBack正常");
    };
    // 滚动触发
    var hide = function () {
        // 此处一定要注意，各个浏览器的不同，有坑！
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var oBackToTop;
        // safari浏览器在顶部会上弹，导致导航栏异常
        if (scrollTop > window.innerHeight) {
            if (!document.getElementsByClassName("back-to-top")[0]) {
                //console.log("长度超出，自动创建back-to-top按钮");
                var oFirst = document.body.firstChild;
                var dBackBtn = document.createElement("a");
                dBackBtn.setAttribute("class", "back-to-top fa fa-arrow-up");
                document.body.insertBefore(dBackBtn, oFirst);
                //console.log("创建back-to-top按钮");
            }
            oBackToTop = document.getElementsByClassName("back-to-top")[0];
            // 显示回到顶部
            oBackToTop.style.display = "block";
            // 按钮按下返回顶部
            oBackToTop.onclick = function () {
                dTimer = setInterval(slowBack, 30);
                oBackToTop.style.backgroundColor = "#fafafa";
            };
        } else {
            if (!document.getElementsByClassName("back-to-top")[0]) {
                //console.log("没有back-to-top按钮，长度并未超出");
                return false;
            }
            else {
                oBackToTop = document.getElementsByClassName("back-to-top")[0];
                // 隐藏回到顶部
                oBackToTop.style.display = "none";
            }
        }
        //console.log("backToTop 一切正常");
    };
    // 滚动绑定
    addScrollEvent(hide);
    // 载入执行一次，刷新按钮状态
    addLoadEvent(hide);
}

addLoadEvent(backToTop);
addLoadEvent(dropDownNavBar);
addLoadEvent(hideNavBar);