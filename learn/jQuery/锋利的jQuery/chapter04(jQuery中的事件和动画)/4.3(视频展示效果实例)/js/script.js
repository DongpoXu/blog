/*
 * 网站视频展示页效果实例
 * 其实就是简单的轮播图界面
 */
$(function () {
    var page = 1;
    var i = 4;
    $("span.next").click(function () {
        var $show = $("div.videoContentList");       //要显示的内容
        var $content = $("#videoContent");           //显示区域

        var width = $content.width();               //显示区域宽度，即后期步进量
        var len = $show.find("li").length;
        var pageCount = Math.ceil(len / i);         //向下取整

        if (!$show.is(":animated")) {
            if (page === pageCount) {
                // $show.animate({left: "0px"}, 0);   //跳转至第一个版面
                // page = 1;
            } else {
                $show.animate({left: "-=" + width}, "slow");
                page++;
                if (page === pageCount) {
                    /*
                     * 这样可以实现无缝对接
                     * 通过将最后一张图片设定为和第一张图片一样的模式
                     * 到达最后一张图片之后
                     * 缓慢做完动画效果
                     * 然后快速切换至第一张即可
                     */
                    $show.animate({left: "0px"}, 0);   //跳转至第一个版面
                    page = 1;
                }
            }
            /*
             * 此处需要解释
             * 由于jQuery的动画并行
             * 所以并不需要最后一张动画完毕才切换dot
             * 可以方便的实现无缝对接
             */
            $("div.dot>ul>li").eq(page - 1).addClass("current").siblings().removeClass("current");
        }
    });
    $("span.prev").click(function () {
        var $show = $("div.videoContentList");       //要显示的内容
        var $content = $("#videoContent");           //显示区域

        var width = $content.width();               //显示区域宽度，即后期步进量
        var len = $show.find("li").length;
        var pageCount = Math.ceil(len / i);         //向下取整

        if (!$show.is(":animated")) {
            if (page === 1) {
                // $show.animate({left: "0px"}, 0);   //跳转至第一个版面
                // page = 1;
            } else {
                $show.animate({left: "+=" + width}, "slow");
                page--;
                if (page === pageCount) {
                    //无缝对接方式同上
                    $show.animate({left: "-=" + width * (pageCount - 1)}, 0);   //跳转至第一个版面
                    page = pageCount;
                }
            }
            $("div.dot>ul>li").eq(page - 1).addClass("current").siblings().removeClass("current");
        }
    });
});