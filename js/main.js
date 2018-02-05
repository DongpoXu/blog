// 对方块进行排序
function resolt(elem) {
    var oDiv = document.getElementById("testDiv");
    var oBlock = document.getElementsByClassName("testBlock");
    var bh = oBlock[0].clientHeight;
    var bw = oBlock[0].clientWidth;
    var h = [0, oDiv.clientHeight - bh];
    var w = [0, oDiv.clientWidth - bw];
    for (var i = 0; i < oBlock.length; i++) {
        oBlock[i].style.top = random(h) + 'px';
        oBlock[i].style.left = random(w) + "px";
        oBlock[i].style.backgroundColor = "#0000cc";
        oBlock[i].style.zIndex = "1";
        elem.style.top = "50%";
        elem.style.left = "50%";
        elem.style.marginTop = -bh / 2 + "px";
        elem.style.marginLeft = -bw / 2 + "px";
        elem.style.backgroundColor = "red";
        elem.style.zIndex = "5";
    }
}

var templete = document.getElementById("testDiv").innerHTML;

// 根据输入值添加方块
function addPhotos() {
    var html = [];
    var oNumBlock = document.getElementById("blockNum");
    var oNum = oNumBlock.value;
    console.log(oNum);
    for (i = 0; i < oNum; i++) {
        html.push(templete);
    }
    document.getElementById("testDiv").innerHTML = html.join("");
}

// 随机生成一个值 支持取值范围。 random([min,max]);
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);

    var diff = max - min;//差值
    var number = Math.floor(Math.random() * diff + min);
    return number;
}

//canvas始终的处理
var oClock = document.getElementById("clock");
var cbg = oClock.getContext('2d');
var width = cbg.canvas.width;
var height = cbg.canvas.height;
var r = width / 2;

function drawBackground() {
    cbg.translate(r, r);
    cbg.beginPath();
    cbg.lineWidth = 10;
    cbg.arc(0, 0, r - 5, 0, 2 * Math.PI, false);
    cbg.stroke();
}

drawBackground();







