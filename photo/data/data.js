var data=[];
var dataStr= '1、震惊的我<br>\
<br>\
爱我少一点，但爱我久一点。<br>\
<br>\
<br>\
2、冰雪大世界<br>\
<br>\
我闭着眼睛看不到自己，但是我却可以看见你。<br>\
<br>\
<br>\
3、这表情<br>\
<br>\
老婆，给你抓羊吃！<br>\
<br>\
<br>\
4、候车室<br>\
<br>\
自从爱上你，我看天下的姑娘全“多长了一只眼”。<br>\
<br>\
<br>\
5、哈尔滨<br>\
<br>\
真的，一辈子这样，真的就挺好。<br>\
';
var d = dataStr.split('<br><br><br>');
for(var i=0;i<d.length;i++){
    var c = d[i].split('<br><br>');
    data.push({
        img:c[0].replace('、',' ')+'.jpg',
        caption:c[0].split('、')[1],
        desc:c[1]
    });
    console.log(c[0].replace('、',' ')+'.jpg');
}
