/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//工具方法集

/*
 * 矩阵和数组相关工具
 */
var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        // return Array.from({length:9})
        //     .map(()=>makeRow(v));
        return Array.from({ length: 9 }, function () {
            return _this.makeRow(v);
        });
    },


    /*
     * Fisher-Yates洗牌算法
     */
    shuffle: function shuffle(array) {
        var endIndex = array.length - 2;
        for (var i = 0; i <= endIndex; i++) {
            var j = i + Math.floor(Math.random() * (array.length - i));
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    /*
     * 检查指定位置是否可以填写数字
     * 由所在宫和所在行和列决定
     */
    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        //取到当前行数据
        var row = matrix[rowIndex];

        //随机生成一个列数据
        var column = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });
        //        console.log(column);
        //获取宫信息

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;

        var box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (var i = 0; i < 9; i++) {
            if (row[i] === n) {
                console.log("行冲突！");
                return false;
            } else if (column[i] === n) {
                console.log("列冲突！");
                return false;
            } else if (box[i] === n) {
                console.log("宫冲突！");
                return false;
            }
        }
        return true;
    }
};

/*
 * 宫坐标系工具
 */
var boxToolkit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

//工具集
module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        //矩阵和数组相关的工具
        get: function get() {
            return matrixToolkit;
        }

        //宫坐标系相关的工具

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//页面入口以及事件绑定

var Grid = __webpack_require__(2);
var Popup = __webpack_require__(6);

var grid = new Grid($("#container"));
grid.build();
grid.layout();

var popup = new Popup($("#popup"));
grid.bindPopup(popup);

$("#check").on("click", function (e) {
    if (grid.check()) {
        alert("成功");
    }
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成九宫格

var Toolkit = __webpack_require__(0);
var Sudoku = __webpack_require__(3);
var Checker = __webpack_require__(5);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var sudoku = new Sudoku();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix;
            //生成解决方案，测试用
            // const matrix = sudoku.solutionMatrix;

            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });

            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "lineHeight": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }

        /*
         * 检查用户解谜结果
         * 成功则进行提示
         * 失败则对错误位置进行标记
         */

    }, {
        key: "check",
        value: function check() {
            this._popupnum.hide();
            //从界面获取需要检查的数据
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            }).toArray().map(function ($data) {
                return $data.toArray();
            });

            var checker = new Checker(data);
            if (checker.check()) {
                return true;
            }

            //检查不成功，进行标记
            var marks = checker.matrixMarks;

            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $span.addClass("error");
                    }
                });
            });
        }

        /*
         * 重置当前谜盘到初始状态
         */

    }, {
        key: "reset",
        value: function reset() {
            this._popupnum.hide();
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
        }

        /*
         * 清除错误标记
         */

    }, {
        key: "clear",
        value: function clear() {
            this._popupnum.hide();
            this._$container.find("span.error").removeClass("error");
        }

        /*
         * 重建新的谜盘
         * 开始新的一局
         */

    }, {
        key: "rebuild",
        value: function rebuild() {
            this._popupnum.hide();
            this._$container.empty();
            this.build();
            this.layout();
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popup) {
            var _this = this;

            this._popupnum = popup;
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.is(".fixed")) {
                    _this._popupnum.hide();
                    return;
                }
                popup.popup($cell);
            });
        }
    }]);

    return Grid;
}();

module.exports = Grid;

//测试工具箱
// console.log(matrix);

/*
 * 算法测试
 */
// const a = Array.from({length: 9}, (v, i) => i);
// console.log(a);
// console.log(toolkit.shuffle(a));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏
//1.生成完成的解决方案：Generator
//2.随机去除部分数据：按比例

var Generator = __webpack_require__(4);

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        //生成完成的解决方案
        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var leavel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

            //const shouldRid = Math.random() * 9 < leavel;
            //生成迷盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < leavel ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案

var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.initernalGenerate()) {
                console.warn("try again");
            }
        }
    }, {
        key: "initernalGenerate",
        value: function initernalGenerate() {
            console.log("进入内部填写");
            this.matrix = Toolkit.matrix.makeMatrix();
            //生成一个随机的位置信息，用来对列进行选取
            this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return Toolkit.matrix.shuffle(row);
            });

            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            console.log("内部填写完成");
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            //开始填写
            return this.fillRow(n, 0);
        }

        /*
         * 按行填写
         * 采用递归方式
         * 填写值为n
         * 初始从第0行开始
         */

    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            //从0-8，所以超出8则结束
            if (rowIndex > 8) {
                //            console.log("index超过8，数字： " + n + " 填写完成");
                return true;
            }
            //        console.log("第 " + rowIndex + " 行填写开始");
            //获取第一行的值
            var row = this.matrix[rowIndex];
            //随机选择列
            var orders = this.orders[rowIndex];
            console.log("start");
            for (var i = 0; i < 9; i++) {
                //从列的随机值中按顺序取值
                var colIndex = orders[i];
                console.log("将数值：" + n + "填入 第：" + (rowIndex + 1) + "行，第：" + (orders[i] + 1) + "处。");
                //如果这个位置有值，跳过
                if (row[colIndex]) {
                    //                console.log("该位置有值");
                    continue;
                }

                //如果这个位置没有值
                //检查这个位置是否可以填入
                //当前列或者当前宫有相同值
                if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    console.log("宫行冲突");
                    continue;
                }

                //填写值
                row[colIndex] = n;

                console.log("end");

                //当前行填写n成功，递归调用fillRow()在下一行中填写n
                //没有成功的话，继续寻找当前行下一个位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
            return false;
        }
    }]);

    return Generator;
}();

// const generator = new Generator();
// generator.generate();
// console.log(generator.matrix);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//检查数独解决方案

function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);
    for (var i = 0; i < length; i++) {
        if (!marks[i]) {
            continue;
        }

        var v = array[i];
        //是否有效：0---无效，1---有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        //是否有重复
        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}

var Toolkit = __webpack_require__(0);

//输入：matrix，用户完成的数独数据：9*9
//处理：对matrix 行、列、宫进行检查，并填写marks
//输出：检查是否成功，marks

module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();

            //检查是否成功
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);

                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }

                var marks = checkArray(cols);
                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _Toolkit$box$convertF.rowIndex,
                            colIndex = _Toolkit$box$convertF.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

//单元测试
// console.log(checkArray([1,2,3,4,5,6,7,8,9]));
// console.log(checkArray([1,2,3,4,5,6,7,9,9]));
// console.log(checkArray([1,2,3,4,5,0,7,9,9]));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//处理弹出的操作面板

module.exports = function () {
    function Popup($panel) {
        var _this = this;

        _classCallCheck(this, Popup);

        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                //mark1回填样式
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                //mark1回填样式
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                //empty,取消数字和标记
                $cell.text(0).addClass("empty");
            } else {
                //1-9回填数字
                $cell.removeClass("empty").text($span.text());
            }
            // this.hide();
        });
    }

    _createClass(Popup, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            var le = "" + left;
            if (le > 205) {
                le -= 86;
            }
            this._$panel.css({
                "left": le + "px",
                "top": top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide().addClass("hidden");
        }
    }]);

    return Popup;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map