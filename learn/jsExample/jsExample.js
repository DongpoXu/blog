window.onload = function () {
    var oDt = document.getElementById("divBlock").getElementsByTagName("dt");

    for (var i = 0; i < oDt.length; i++) {
        oDt[i].index = i;
        oDt[i].onclick = function () {
            console.log("click");
            var oDl = document.getElementById("divBlock").getElementsByTagName("dl");
            var oDd = oDl[this.index].getElementsByTagName("dd");
            // 清除其他高度
            for (var i = 0; i < oDl.length; i++) {
                if (i !== this.index) {
                    oDl[i].style.height = "35px";
                }
            }
            // 获取目标高度并且改变
            oDl[this.index].style.height = oDl[this.index].style.height === "35px" ? (oDd.length * 30 + 35) + "px" : "35px";
        }
    }
};