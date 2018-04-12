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

    function switchSkin(skinName) {
        $("#" + skinName).addClass("selected")
            .siblings().removeClass("selected");
        $("#cssFile").attr("href", "css/skin/" + skinName + ".css");
        $.cookie("MyCssSkin", skinName, {path: '/', expires: 10});
    }

});

// 导航效果
$(function () {
    $("#nav li").hover(function () {
        $(this).find(".jnNav").show();
    }, function () {
        $(this).find(".jnNav").hide();
    });
});

// 左侧商品分类热销效果
$(function () {
    $(".jnCatainfo .promoted").append("<span class='hot'></span>");
});

// 中间大屏广告效果
$(function () {
    var $imgrolls = $("#jnImageroll div a");
    $imgrolls.css("opacity", "0.7");
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;

    $imgrolls.mouseover(function () {
        index = $imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();

    // 滑入 停止动画，滑出 开始动画
    $("#jnImageroll").hover(function () {
        if (adTimer) {
            clearInterval(adTimer);
        }
    }, function () {
        adTimer = setInterval(function () {
            index++;
            // showImg(index);
            if (index === len) {
                index = 0;
            }
            showImg(index);     // showImg应该写在计算index完毕之后。
        }, 5000);
    }).trigger("mouseleave");

    // 显示图片
    function showImg(index) {
        var $rollobj = $("#jnImageroll");
        var $rolllist = $rollobj.find("div a");
        var newhref = $rolllist.eq(index).attr("href");
        $("#JS_imgWrap").attr("href", newhref)
            .find("img").eq(index).stop(true, true).fadeIn()
            .siblings().fadeOut();
        $rolllist.removeClass("chos").css("opacity", "0.7")
            .eq(index).addClass("chos").css("opacity", "1");
    }
});

// 右侧最新动态模块内容添加超链接提示
$(function () {
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function (e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>";
        $("body").append(tooltip);
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            }).show("fast");
    }).mouseout(function () {
        this.title = this.myTitle;
        $("#tooltip").remove();
    }).mouseover(function (e) {
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            });
    });
});

// 右侧下部品牌活动横向滚动效果
$(function () {
    $("#jnBrandTab li a").click(function () {
        $(this).parent().addClass("chos")
            .siblings().removeClass("chos");
        var idx = $("#jnBrandTab li a").index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();
});

function showBrandList(index) {
    var $rollobj = $("#jnBrandList");
    var rollWidth = $rollobj.find("li").outerWidth();
    rollWidth = rollWidth * 4;
    $rollobj.stop(true, false).animate({
        left: -rollWidth * index
    }, 1000);
}

// 右侧下部光标划过产品列表效果
/*
 * live()方法在高版本被替代
 * 使用on()方法
 * 咋用额，，，是个问题。
 * 所以用了笨办法
 * 先清空所有的遮罩层，然后再添加
 */
$(function () {
    $("#jnBrandList li").each(function (index) {
        var $img = $(this).find("img");
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span title="cover" style="position:absolute;top:0;left:5px;width:' + img_w + 'px;height:' + img_h + 'px;" class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    });
    $("#jnBrandList li span[title=cover]").hover(function () {
        $(this).addClass("imageOver");
    },function () {
        $(this).removeClass("imageOver");
    });
});

/*使用jqzoom*/
$(function(){
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens:true,
        preloadImages: false,
        alwaysOn:false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
});