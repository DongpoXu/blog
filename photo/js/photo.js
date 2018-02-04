// 3.通用函数
function g(selector) {
    var method = selector.substr(0, 1) === '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}

//4.输出所有的照片
var data = data;

function addPhotos() {
    var templete = g('#wrap').innerHTML;
    var html = [];
    var nav = [];

    for (s in data) { //for(var s = 0; s < data.length; s++)
        var _html = templete
            .replace('{{index}}', s)
            .replace('{{img}}', data[s].img)
            .replace('{{caption}}', data[s].caption)
            .replace('{{desc}}', data[s].desc);
        html.push(_html);
        nav.push('<span id="nav_' + s + '" onclick="turn(g(\'#photo_' + s + '\'))" class="i"></span>');
    }
    html.push('<div class="nav">' + nav.join('') + '</div>');
    g('#wrap').innerHTML = html.join('');
    rsort(random([0, data.length]));
}

addPhotos();

//随机生成一个值 支持取值范围。 random([min,max]);
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);

    var diff = max - min;//差值
    var number = Math.floor(Math.random() * diff + min);
    console.log(number);
    return number;
}

//6.计算左、右分区范围{left:{x:[min,max],y:[min,max]},right:{x:[min,max],y:[min,max]}}
function range() {
    var range = {left: {x: [], y: []}, right: {x: [], y: []}};
    var wrap = {
        w: g('#wrap').clientWidth,
        h: g('#wrap').clientHeight
    };
    var photo = {
        w: g('.photo')[0].clientWidth,
        h: g('.photo')[0].clientHeight
    };
    range.wrap = wrap;
    range.photo = photo;
    range.left.x = [0, wrap.w / 2 - photo.w];
    range.left.y = [0 - photo.h, wrap.h];
    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];
    range.right.y = range.left.y;
    return range;
}

//5.排序海报
function rsort(n) {
    var _photo = g('.photo');
    var photos = [];
    for (s = 0; s < _photo.length; s++) {
        _photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/, ' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/, ' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/, ' ');
        _photo[s].className += ' photo_front';
        _photo[s].style.left = '';
        _photo[s].style.top = '';
        _photo[s].style['-webkit-transform'] = 'rotate(360deg)';
        photos.push(_photo[s]);
    }
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center';
    photo_center = photos.splice(n, 1)[0];

    //把海报分为左、右两个区域
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    //不能同名
    var ranges = range();
    for (s in photos_left) {
        var photoLeft = photos_left[s];
        photoLeft.style.left = random(ranges.left.x) + 'px';
        photoLeft.style.top = random(ranges.left.y) + 'px';
        photoLeft.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }
    for (s in photos_right) {
        var photoRight = photos_right[s];
        photoRight.style.left = random(ranges.right.x) + 'px';
        photoRight.style.top = random(ranges.right.y) + 'px';
        photoRight.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg)';
    }
    //控制按钮处理
    var navs = g('.i');
    for (s = 0; s < navs.length; s++) {
        navs[s].className = navs[s].className.replace(/\s*i_current\s*/, ' ');
        navs[s].className = navs[s].className.replace(/\s*i_back\s*/, ' ');
    }
    g('#nav_' + n).className += ' i_current ';
}

// 1.翻面控制
function turn(elem) {
    var cls = elem.className;
    var n = elem.id.split('_')[1];

    if (!/photo_center/.test(cls)) {
        return rsort(n);
    }
    if (/photo_front/.test(cls)) {
        cls = cls.replace(/photo_front/, 'photo_back')
        g('#nav_' + n).className += ' i_back';
    } else {
        cls = cls.replace(/photo_back/, 'photo_front')
        g('#nav_' + n).className = g('#nav_' + n).className.replace(/\s*i_back\s*/, ' ')
    }
    return elem.className = cls;
}