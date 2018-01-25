// 定义一个目标位置，用于计算距离。
var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

// 浏览器加载页面，我们将调用函数getMyLocation
window.onload = getMyLocation;


function getMyLocation() {
    // 利用这个检查来确保浏览器支持地理定位API
    // 如果navigator.geolocation对象存在，说明浏览器支持这个API
    if (navigator.geolocation) {
        // 如果浏览器支持地理定位API，则调用getCurrentPosition方法
        // 并传入一个处理函数displayLocation
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        // 如果浏览器不支持地理定位，就向用户弹出一个提醒
        alert("Oops, no geoloaction support");
    }
}

function displayLocation(position) {
    // position对象有一个coords属性，其中包含指向coordinates对象的一个引用...
    var latitude = position.coords.latitude;
    // coordinates对象包含了你的纬度和经度
    var longitude = position.coords.longitude;

    // 改变页面内容
    var div = document.getElementById("location");
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
    div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)";

    // 这里将你的位置坐标以及我们的坐标传递到computeDistance
    var km = computeDistance(position.coords, ourCoords);
    // 得到结果并且更新内容
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are" + km + " km from the WickedlySmart HQ";

    showMap(position.coords);
}

// 错误处理程序，error对象有一个code属性，其中包含0-3的数
// 这个是用Java script为各个错误码关联一个错误消息的好方法
function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    // 使用error.code属性，将一个错误消息串赋给一个新变量errorMessage
    var errorMessage = errorTypes[error.code];
    if (error.code === 0 || error.code === 2) {
        errorMessage = errorMessage + " " + error.message;
        // 此处添加一些额外信息
    }
    // 添加消息到页面
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

// 这个函数取两个坐标，一个起点坐标和一个终点坐标，并返回二者之间的距离（km）
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.latitude);

    var Radius = 6371; //radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLatRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

// 声明一个全局变量，包含创建的google地图
var map;

// 显示地图
function showMap(coords) {
    // 创建一个google.maps.LatLng对象
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);

    // 地图信息
    var mapOptions = {
        // 地图规模
        zoom: 10,
        // 地图在这个位置居中
        center: googleLatAndLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // 从DOM中获取map<div>，传递至构造函数，创建对象
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);

    // 传入使用Google maps API创建的map和googleLatAndLong对象...
    // ...和一个标题串，以及标记的一个内容串。
    var title = "Your Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map, googleLatAndLong, title, content);
}

// addMarker函数取一个地图，一个google样式的纬度和经度，标记的标题，以及信息窗口的内容
function addMarker(map, latlong, title, content) {
    var markerOptions = {
        // 纬度和经度
        position: latlong,
        // 地图信息
        map: map,
        // 标题
        title: title,
        // 设置为true，显示信息
        clickable: true
    };

    // 使用google API提供的函数，传入对象
    var marker = new google.maps.Marker(markerOptions);

    // 现在要为信息窗口定义一些选项
    var infoWindowOptions = {
        // 内容
        content: content,
        // 纬度和经度
        position: latlong
    };

    // 创建信息窗口
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    // 使用Google Maps addListener方法为点击事件创建一个“监听者”
    // 类似onload，onclick
    google.maps.event.addListener(marker, "click", function () {
        // 点击标记，会调用这个函数，在地图上打开一个信息窗口
        infoWindow.open(map);
    });
}