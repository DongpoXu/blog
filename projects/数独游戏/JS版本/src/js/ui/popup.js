//处理弹出的操作面板

module.exports = class Popup {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click", "span", e => {
            const $cell = this._$targetCell;
            const $span = $(e.target);
            if ($span.hasClass("mark1")) {
                //mark1回填样式
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2")
                        .addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                //mark1回填样式
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1")
                        .addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                //empty,取消数字和标记
                $cell.text(0)
                    .addClass("empty");
            } else {
                //1-9回填数字
                $cell.removeClass("empty")
                    .text($span.text());
            }
            // this.hide();
        })
    }

    popup($cell) {
        this._$targetCell = $cell;
        const {left, top} = $cell.position();
        let le = `${left}`;
        if (le > 205) {
            le -= 86;
        }
        this._$panel
            .css({
                "left": le + "px",
                "top": `${top}px`
            }).show();
    }

    hide() {
        this._$panel.hide().addClass("hidden");
    }
};