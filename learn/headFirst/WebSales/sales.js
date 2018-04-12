var lastReportTime = 0;

window.onload = init;

function init() {
    var interval = setInterval(handleRefresh, 3000);
    handleRefresh();
}

// window.onload = function () {
// var url = "https://xudongpo.xin/learn/headFirst/WebSales/sales.json";
// var request = new XMLHttpRequest();
// //XMLHttpRequest Level 1
// // request.open("GET", url);
// // request.onload = function () {
// //     if (request.status === 200) { //200表示OK
// //         updateSales(request.responseText); //数据加载完成后，调用这个函数
// //     }
// // };
// //XMLHttpRequest Level 2
// request.onreadystatechange = function () {
//     if (request.readyState === 4 && request.status === 200) { //200表示OK
//         updateSales(request.responseText); //数据加载完成后，调用这个函数
//     }
// };
// request.open("GET", url);
// request.send(null); //最后发出请求
/*以上为Ajax代码 */
//     setInterval(handleRefresh, 2000);
// }

function handleRefresh() {
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime();

    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement === null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}

// function updateSales(responseText) {
function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    // salesDiv.innerHTML = responseText;
    // var sales = JSON.parse(responseText);
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];;
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + "sold" + sale.sales + "gumballs";
        if (salesDiv.childElementCount == 0) {
            salesDiv.appendChild(div);
        } else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
        }
    }
    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}