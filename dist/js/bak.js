var canvas = document.getElementById("canvas");
var context2D = canvas.getContext("2d");
//	context2D.font = "30px 迷你简硬笔行书";
//	context2D.fillText("HTML5 画布，随意画出你想要的！", 30, 30);




// 英国国旗
// 蓝底
context2D.fillStyle ="#01237d";
context2D.fillRect(620,420,600,400);
// 白斜向1
context2D.fillStyle ="#ffffff";
context2D.beginPath();
context2D.moveTo(620,420);
context2D.lineTo(670,420);
context2D.lineTo(1220,780);
context2D.lineTo(1220,820);
context2D.lineTo(1170,820);
context2D.lineTo(620,460);
context2D.closePath();
context2D.fill();
// 白斜向2
context2D.beginPath();
context2D.moveTo(620,820);
context2D.lineTo(620,780);
context2D.lineTo(1170,420);
context2D.lineTo(1220,420);
context2D.lineTo(1220,460);
context2D.lineTo(670,820);
context2D.closePath();
context2D.fill();
// 红斜向1
context2D.fillStyle ="#d0142d";
context2D.beginPath();
context2D.moveTo(620,420);
context2D.lineTo(920,615);
context2D.lineTo(920,640);
context2D.lineTo(620,445);
context2D.closePath();
context2D.fill();
// 红斜向2
context2D.beginPath();
context2D.moveTo(620,820);
context2D.lineTo(920,615);
context2D.lineTo(920,640);
context2D.lineTo(650,820);
context2D.closePath();
context2D.fill();
// 红斜向3
context2D.beginPath();
context2D.moveTo(1220,820);
context2D.lineTo(920,620);
context2D.lineTo(920,595);
context2D.lineTo(1220,795);
context2D.closePath();
context2D.fill();
// 红斜向4
context2D.beginPath();
context2D.moveTo(1220,420);
context2D.lineTo(920,620);
context2D.lineTo(920,595);
context2D.lineTo(1190,420);
context2D.closePath();
context2D.fill();
// 白十字
context2D.fillStyle ="#ffffff";
context2D.fillRect(620,560,600,120);
context2D.fillRect(860,420,120,400);
// 红十字
context2D.fillStyle ="#d0142d";
context2D.fillRect(620,580,600,80);
context2D.fillRect(880,420,80,400);

// 中国国旗
context2D.save();
context2D.translate(620,10);
context2D.fillStyle ="rgb(222,40,16)";
context2D.fillRect(0,0,600,400);
context2D.restore();

context2D.translate(620,10);
//coordinate(context2D,600,400);
drawStar(context2D,60,100,100,53.8,"#ffde00")
drawStar(context2D,20,200,40,0,"#ffde00")
drawStar(context2D,20,200,180,0,"#ffde00")
drawStar(context2D,20,240,80,35,"#ffde00")
drawStar(context2D,20,240,140,-19,"#ffde00")
context2D.restore();

//	var flag = new Image();
//	flag.src = "flag.jpg";
//	flag.onload = function(){
//		context2D.globalAlpha=0.7;
//		context2D.drawImage(flag,0,0,600,400);
//	}

// US国旗
var flagW = 600;
var flagH = 400;
context2D.save();
context2D.translate(-610,820);
context2D.fillStyle ="#ffffff";
context2D.fillRect(0,0,flagW,flagH);

context2D.fillStyle ="#da332a";
var lineH = flagH / 13;
for(var i=0; i<=12; i+=2) {
    context2D.fillRect(0,i*lineH,flagW,lineH);
}
context2D.fillStyle ="#11257b";
context2D.fillRect(0,0,7*lineH*1.3,7*lineH);

for(var i=0,j=0; i<30; i++) {
    if( i % 6 == 0 ) {
        j++;
    }
    drawStar(context2D,0.25*lineH, (i%6+0.7)*lineH+0.54*(i%6)*lineH, (1.48*j-0.92)*lineH, 54, "#ffffff");
}
for(var i=0,j=0; i<20; i++) {
    if( i % 5 == 0 ) {
        j++;
    }
    drawStar(context2D,0.25*lineH, (i%5+1.5)*lineH+0.54*(i%5)*lineH, (1.48*j-0.18)*lineH, 54, "#ffffff");
}
context2D.restore();


// RB国旗
var flag_w = 600;
var flag_h = 400;
var radius = flag_h*0.12;
var rb_flag_x = flag_w/2;
var rb_flag_y = flag_h/2;
var count_x = 3;
var count_y = 2;
context2D.save();
context2D.translate(0,820);
//	context2D.fillStyle ="rgb(240,62,25)";
//	context2D.beginPath();
//	context2D.arc(rb_flag_x,rb_flag_y,120,0,2*Math.PI);
//	context2D.closePath();
//	context2D.fill();
//	context2D.restore();
setInterval(function(){

    if(rb_flag_x>(flag_w-radius)) {
        count_x=-count_x;
    }
    else if(rb_flag_x<radius){
        count_x=-count_x;
    }

    if(rb_flag_y>(flag_h-radius)) {
        count_y=-count_y;
    }
    else if(rb_flag_y<radius){
        count_y=-count_y;
    }
    rb_flag_x+=count_x;
    rb_flag_y+=count_y;

    context2D.restore();

    var gradient = context2D.createRadialGradient(rb_flag_x,rb_flag_y,radius,rb_flag_x+25,rb_flag_y-15,radius/20);
    gradient.addColorStop(0, '#a9270c');
    gradient.addColorStop(0.75, '#f03e19');
    gradient.addColorStop(1, '#f25433');
    //gradient.addColorStop(1, "rgb(240,62,25)");

    context2D.shadowOffsetX = 0;
    context2D.shadowOffsetY = 0;
    context2D.shadowBlur = 0;
    context2D.shadowColor = "#000000";

    context2D.clearRect(0,0,flag_w,flag_h);
    context2D.fillStyle = "rgb(255,255,255)";
    context2D.fillRect(0,0,flag_w,flag_h);

    context2D.shadowOffsetX = -2;
    context2D.shadowOffsetY = 2;
    context2D.shadowBlur = 3;
    context2D.shadowColor = "rgba(0, 0, 0, 0.45)";

    context2D.fillStyle = gradient;
    context2D.beginPath();
    context2D.arc(rb_flag_x,rb_flag_y,radius,0,2*Math.PI);
    context2D.closePath();
    context2D.fill();
    context2D.save();
},8);

// 德国国旗
context2D.save();
context2D.translate(-610,410);
context2D.fillStyle ="rgb(0,0,0)";
context2D.fillRect(0,0,600,400);
context2D.fillStyle ="#fe0000";
context2D.fillRect(0,134,600,134);
context2D.fillStyle ="#ffcc01";
context2D.fillRect(0,266,600,134);


function drawStar(ctx, r, x, y, deg, color) {
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(deg*Math.PI/180);
    ctx.lineWidth = 1;
    ctx.beginPath();
    var dit = Math.PI * 4 / 5;
    var sin = Math.sin(0) * r/* + y*/;
    var cos = Math.cos(0) * r/* + x*/;
    //console.log(0+":"+0);
    ctx.moveTo(cos, sin);
    for (var i = 0; i < 5; i++) {
        var tempDit = dit * i;
        sin = Math.sin(tempDit) * r/* + y*/;
        cos = Math.cos(tempDit) * r/* + x*/;
        ctx.lineTo(cos, sin);
        //console.log(cos+":"+sin+":"+tempDit);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
}
function coordinate(ctx,cw,ch) {
    var dx = 50;
    var dy = 50;
    var x = 0;
    var y = 0;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgba(0,0,0,0.3)";
    while(y<ch) {
        y+=dy;
        ctx.moveTo(x,y);
        ctx.lineTo(cw,y);
        ctx.closePath();
        ctx.stroke();
    }
    y = 0;
    while(x<cw) {
        x+=dx;
        ctx.moveTo(x,y);
        ctx.lineTo(x,ch);
        ctx.closePath();
        ctx.stroke();
    }
}

(function($, window, document){
}(jQuery, window, document));
