var passWord = "密码";

function setKey(c_name, value) {
    document.cookie = c_name + "=" + value;
}

function getKey(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return document.cookie.substring(c_start, c_end);
        }
    }
    return "";
}

function checkKey() {
    username = getKey('username');
    if (username === passWord) {
        alert('欢~@^_^@~迎');
    }
    else {
        username = prompt('请输入密码：', "");
        if (username === passWord) {
            setKey('username', username);
        }
        else {
            alert("密码不正确,无法进入本站!!");
            window.opener = null;
            window.close();
        }
    }
}

checkKey();