// var map; //地图类对象
// var snake; //蛇类对象
// var food; //食物类对象
// var timer; //定时器对象
// var sum = 0; //分数
//
// //地图类
// function Map() {
//     this.width = 800; //地图宽度
//     this.height = 800; //地图高度
//     this.position = 'absolute'; //定位方式
//     this.color = '#999999'; //地图颜色
//     this._map = null; //保存地图dom元素
//
//     this.show = function () {
//         //用于显示地图
//         //创建地图div元素
//         this._map = document.createElement('div');
//         //设置地图样式
//         this._map.style.width = this.width + 'px';
//         this._map.style.height = this.height + 'px';
//         this._map.style.position = this.position;
//         this._map.style.backgroundColor = this.color;
//
//         //将地图div元素追加到body标签之间
//         document.getElementsByTagName('body')[0].appendChild(this._map);
//     };
// }
//
// //食物类
// function Food() {
//     this.width = 20; //宽度
//     this.height = 20; //高度
//     this.position = 'absolute'; //定位方式
//     this.color = 'yellow'; //食物颜色
//     this._food = null; //用于保存食物dom元素
//     this.x = 0; //横向第几个格
//     this.y = 0; //纵向第几个格
//
//     this.show = function () {
//         //用于显示食物
//         if (this._food === null) {
//             this._food = document.createElement('div');
//
//             //设置食物样式
//             this._food.style.width = this.width + 'px';
//             this._food.style.height = this.height + 'px';
//             this._food.style.position = this.position;
//             this._food.style.backgroundColor = this.color;
//
//             map._map.appendChild(this._food);
//         }
//         //如果之前创建过，只需要重新设置坐标
//         this.x = Math.floor(Math.random() * 40);
//         this.y = Math.floor(Math.random() * 40);
//         this._food.style.left = this.x * this.width + 'px';
//         this._food.style.top = this.y * this.height + 'px';
//     };
// }
//
// //蛇类
// function Snake() {
//     this.width = 20;    //蛇节宽度
//     this.height = 20;    //蛇节高度
//     this.position = 'absolute'; //蛇节定位方式
//     this.direct = ''; //蛇的移动方向
//     //所有蛇节全部信息
//     this.body = [[3, 2, 'red', null], [2, 2, 'green', null], [1, 2, 'green', null]];
//
//     this.setDirect = function (code) {
//         switch (code) {
//             case 37:
//                 this.direct = 'left';
//                 break;
//             case 38:
//                 this.direct = 'up';
//                 break;
//             case 39:
//                 this.direct = 'right';
//                 break;
//             case 40:
//                 this.direct = 'down';
//                 break;
//         }
//     };
//
//     this.show = function () {
//         //用于显示蛇
//         for (var i = 0; i < this.body.length; i++) {
//             if (this.body[i][3] === null) {
//                 this.body[i][3] = document.createElement('div');
//                 this.body[i][3].style.width = this.width + 'px';
//                 this.body[i][3].style.height = this.height + 'px';
//                 this.body[i][3].style.position = this.position;
//                 this.body[i][3].style.backgroundColor = this.body[i][2];
//                 map._map.appendChild(this.body[i][3]);
//             }
//             //设置蛇节的横纵坐标
//             this.body[i][3].style.left = this.body[i][0] * this.width + 'px';
//             this.body[i][3].style.top = this.body[i][1] * this.height + 'px';
//         }
//     };
//
//     this.move = function () {
//         //移动蛇身
//         var length = this.body.length - 1;
//         for (var i = length; i > 0; i--) {
//             //让后面的蛇节的坐标等于前面蛇节的坐标
//             this.body[i][0] = this.body[i - 1][0]; //横坐标
//             this.body[i][1] = this.body[i - 1][1]; //纵坐标
//
//         }
//         switch (this.direct) {
//             case 'right':
//                 this.body[0][0] = this.body[0][0] + 1;
//                 break;
//             case 'down':
//                 this.body[0][1] = this.body[0][1] + 1;
//                 break;
//             case 'left':
//                 this.body[0][0] = this.body[0][0] - 1;
//                 break;
//             case 'up':
//                 this.body[0][1] = this.body[0][1] - 1;
//                 break;
//             default:
//                 return;
//         }
//
//         //判断蛇吃到食物
//         if (this.body[0][0] === food.x && this.body[0][1] === food.y) {
//             var x = this.body[length][0];
//             var y = this.body[length][1];
//             sum++;
//             document.title = '分数:' + sum + '分';
//             this.body.push([x, y, 'green', null]);
//             food.show();
//         }
//
//         //判断撞墙死
//         if (this.body[0][0] < 0 || this.body[0][0] > 39 || this.body[0][1] < 0 || this.body[0][1] > 39) {
//             alert('撞墙死');
//             clearTimeout(timer);
//             return;
//         }
//
//         //吃到自己死
//         for (var i = 1; i < this.body.length; i++) {
//             if (this.body[0][0] === this.body[i][0] && this.body[0][1] === this.body[i][1]) {
//                 alert('吃到自己死');
//                 clearTimeout(timer);
//                 return;
//             }
//         }
//         this.show();
//     }
// }
//
// function getValue() {
//     var button = document.getElementsByTagName("button");
//     button[0].onclick = function () {
//         snake.setDirect(38);
//     };
//     button[1].onclick = function () {
//         snake.setDirect(37);
//     };
//     button[2].onclick = function () {
//         snake.setDirect(39);
//     };
//     button[3].onclick = function () {
//         snake.setDirect(40);
//     };
// }
//
// function changeSpeed() {
//     var sd = 600;
//     var button = document.getElementsByTagName("button");
//     button[4].onclick = function () {
//         sd = 200;
//     };
//     button[5].onclick = function () {
//         sd = 400;
//     };
//     button[6].onclick = function () {
//         sd = 600;
//     };
//     return sd;
// }
//
// window.onload = function () {
//     map = new Map(); //实例化地图类对象
//     map.show();    //显示地图
//
//     food = new Food(); //实例化食物类对象
//     food.show(); //显示食物
//
//     snake = new Snake(); //实例化蛇类对象
//     snake.show();
//
//     timer = setInterval('snake.move()', changeSpeed());
//
//     document.onkeydown = function () {
//         var code;
//         if (window.event) {
//             code = window.event.keyCode;
//         } else {
//             code = event.keyCode;
//         }
//         snake.setDirect(code);
//     };
//
//     getValue();
// };



var sn = [ 42, 41 ], dz = 43, fx = 1, n, ctx = document.getElementById("can").getContext("2d");
function draw(t, c) {
    ctx.fillStyle = c;
    ctx.fillRect(t % 20 * 20 + 1, ~~(t / 20) * 20 + 1, 18, 18);
}
document.onkeydown = function(e) {
    fx = sn[1] - sn[0] == (n = [ -1, -20, 1, 20 ][(e || event).keyCode - 37] || fx) ? fx : n
};
!function() {
    sn.unshift(n = sn[0] + fx);
    if (sn.indexOf(n, 1) > 0 || n<0||n>399 || fx == 1 && n % 20 == 0 || fx == -1 && n % 20 == 19)
        return alert("GAME OVER");
    draw(n, "Lime");
    if (n == dz) {
        while (sn.indexOf(dz = ~~(Math.random() * 400)) >= 0);
        draw(dz, "Yellow");
    } else
        draw(sn.pop(), "Black");
    setTimeout(arguments.callee, 130);
}();