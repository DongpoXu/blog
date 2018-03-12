var lastReportTime = 0;

window.onload = init;

function init() {
    // JSON
    // var url = "https://xudongpo.xin/learn/WebSales/sales.json";
    // var request = new XMLHttpRequest();
    // request.open("GET",url);
    // request.onload = function () {
    //     if(request.status === 200){
    //         updateSales(request.responseText);
    //     }
    // };
    // request.send(null);
    // 定时3秒获取一次
    var interval = setInterval(handleRefresh,3000);
    handleRefresh();
}

function handleRefresh() {
    console.log("here");
    var url = "http://gumball.wickedlysmart.com" +
        "?callback=updateSales" +
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime();

    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src",url);
    newScriptElement.setAttribute("id","jsonp");

    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if(oldScriptElement == null){
        head.appendChild(newScriptElement);
    }else {
        head.replaceChild(newScriptElement,oldScriptElement);
    }
}

// function updateSales(responseText) {
function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    // var sales = JSON.parse(responseText);
    for(var i = 0; i < sales.length; i++){
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class","saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs ";
        // salesDiv.appendChild(div);
        if (salesDiv.childElementCount === 0) {
            salesDiv.appendChild(div);
        }
        else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
        }
    }
    if (sales.length > 0){
        // mmp注意下面数组的sales不是sale......
        lastReportTime = sales[sales.length-1].time;
    }
}