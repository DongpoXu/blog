var data=[];
var dataStr= '1、震惊的我<br>\
<br>\
震惊的我<br>\
<br>\
<br>\
2、冰雪大世界<br>\
<br>\
冰雪大世界<br>\
<br>\
<br>\
3、这表情<br>\
<br>\
这表情<br>\
<br>\
<br>\
4、候车室<br>\
<br>\
候车室<br>\
<br>\
<br>\
5、哈尔滨<br>\
<br>\
哈尔滨<br>\
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
