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
var rem = width / 200;

function drawBackground() {
    cbg.save();
    cbg.translate(r, r);
    cbg.beginPath();
    cbg.lineWidth = 10 * rem;
    cbg.arc(0, 0, r - cbg.lineWidth / 2, 0, 2 * Math.PI, false);
    cbg.stroke();
    cbg.font = 18 * rem + "Arial";
    cbg.textAlign = "center";
    cbg.textBaseline = "middle";
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    hourNumbers.forEach(function (num, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        cbg.fillText(num, x, y);
    });

    //标识点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        cbg.beginPath();
        if (i % 5 === 0) {
            cbg.fillStyle = "#000";
            cbg.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        } else {
            cbg.fillStyle = "#2b2bac";
            cbg.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        cbg.fill();
    }
}

//画时针
function drawHour(hour, minute) {
    cbg.save();
    cbg.beginPath();
    var rad = 2 * Math.PI / 12 * (hour + minute / 60);
    cbg.rotate(rad);
    cbg.lineWidth = 6 * rem;
    cbg.lineCap = "round";
    cbg.moveTo(0, 10 * rem);
    cbg.lineTo(0, -r / 2);
    cbg.stroke();
    cbg.restore();
}

//画分针
function drawMinute(minute) {
    cbg.save();
    cbg.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    cbg.rotate(rad);
    cbg.lineWidth = 3 * rem;
    cbg.lineCap = "round";
    cbg.moveTo(0, 10 * rem);
    cbg.lineTo(0, -r + 30 * rem);
    cbg.stroke();
    cbg.restore();
}

//画秒针
function drawSecond(second) {
    cbg.save();
    cbg.beginPath();
    cbg.fillStyle = "red";
    var rad = 2 * Math.PI / 60 * second;
    cbg.rotate(rad);
    cbg.moveTo(-2 * rem, 20 * rem);
    cbg.lineTo(2 * rem, 20 * rem);
    cbg.lineTo(1, -r + 18 * rem);
    cbg.lineTo(-1, -r + 18 * rem);
    cbg.fill();
    cbg.restore();
}

//中心点
function drawDot() {
    cbg.beginPath();
    cbg.fillStyle = "white";
    cbg.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
    cbg.fill();
}

//绘制
function draw() {
    cbg.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    cbg.restore();
}

draw();
setInterval(draw, 1000);





