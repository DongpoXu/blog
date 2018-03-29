// 搜索框提示效果
$(function () {
    $("#inputSearch").focus(function () {
        $(this).addClass("focus");
        if ($(this).val() === this.defaultValue) {
            $(this).val("");
        }
    }).blur(function () {
        $(this).removeClass("focus");
        if ($(this).val() === "") {
            $(this).val(this.defaultValue);
        }
    }).keyup(function (e) {
        if (e.which === 13) {
            alert("回车提交表单");
        }
    });
});

// 网页换肤
// 添加jquery.cookie.js插件
$(function () {
    var $li = $("#skin li");
    $li.click(function () {
        switchSkin(this.id);
    });

    var cookie_skin = $.cookie("MyCssSkin");
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }
});

function switchSkin(skinName) {
    $("#" + skinName).addClass("selected")
        .siblings().removeClass("selected");
    $("#cssFile").attr("href", "css/skin/" + skinName + ".css");
    $.cookie("MyCssSkin", skinName, {path: '/', expires: 10});
}

