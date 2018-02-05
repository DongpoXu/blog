/*safari中cookies不支持中文，正在找寻编解码方式。*/
var cPassWord = "160324";

function setKey(c_key, value) {
    document.cookie = c_key + "=" + value;
}

function getKey(c_key) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_key + "=");
        if (c_start !== -1) {
            c_start = c_start + c_key.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return document.cookie.substring(c_start, c_end);
        }
    }
    return "";
}

function checkKey() {
    var passWord = getKey('passWord');
    if (passWord !== cPassWord) {
        passWord = prompt('请输入密码：', "");
        if (passWord === cPassWord) {
            setKey('passWord', passWord);
        }
        else {
            alert("密码不正确,无法进入本站!!");
            window.opener = null;
            window.close();
        }
    }
}
E
checkKey();