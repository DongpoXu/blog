const toolkit = require("./core/toolkit");
const matrix = toolkit.makeMatrix();

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const matrix = toolkit.makeMatrix();

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .text(cellValue);
        }));

        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass("row")
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "lineHeight": `${width}px`,
                "font-size": width < 32 ? `${width/2}px` : ""
            });
    }
}

const grid = new Grid($("#container"));
grid.build();
grid.layout();

//测试工具箱
// console.log(matrix);

/*
 * 算法测试
 */
// const a = Array.from({length: 9}, (v, i) => i);
// console.log(a);
// console.log(toolkit.shuffle(a));