function resolt() {
    var oBlock = document.getElementsByClassName("testBlock");
    for (i in oBlock) {
        oBlock[i].style.top = random([0, 270]) + 'px';
        oBlock[i].style.left = random([0, 770]) + 'px';
    }
}

function addPhotos() {
    var templete = document.getElementsByClassName("testDiv")[0].innerHTML;
    var html = [];
    for (i = 0; i < 100; i++) {
        html.push(templete);
    }
    document.getElementsByClassName("testDiv")[0].innerHTML = html.join('');
}

addPhotos();

//随机生成一个值 支持取值范围。 random([min,max]);
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);

    var diff = max - min;//差值
    var number = Math.floor(Math.random() * diff + min);
    return number;
}