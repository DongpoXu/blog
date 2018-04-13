//页面入口以及事件绑定

const Grid = require("./ui/grid");
const Popup = require("./ui/popup");

const grid = new Grid($("#container"));
grid.build();
grid.layout();

const popup = new Popup($("#popup"));
grid.bindPopup(popup);

$("#check").on("click", e => {
    if (grid.check()){
        alert("成功");
    }
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});