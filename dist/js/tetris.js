var Tetris = {
    canvas: document.getElementById('J-game-panel'),
    context: null,
    getContext: function() {
        this.context = this.canvas.getContext('2d');
        return this;
    },
    setSize: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        return this;
    },
    init: function() {
        this.getContext().setSize();
        return this;
    },
    drawStar: function(r, x, y, deg, color) {
        var ctx = this.context;
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
    },
    drawFlag: function(code) {
        var ctx = this.context;
        var w = this.canvas.width;
        var h = this.canvas.height;

        switch (code){
            case 'FR':
                // 法国国旗
                ctx.beginPath();
                ctx.fillStyle ="#002496";
                ctx.fillRect(0,0,w/3,h);
                ctx.fillStyle ="#ffffff";
                ctx.fillRect(w/3,0,w/3,h);
                ctx.fillStyle ="#ed2839";
                ctx.fillRect(w*2/3,0,w/3,h);
                ctx.closePath();
                break;
            case 'CZ':
                // 捷克国旗
                ctx.beginPath();
                ctx.fillStyle ="#ffffff";
                ctx.fillRect(0,0,w,w/2);
                ctx.fillStyle ="#be0026";
                ctx.fillRect(0,h/2,w,w/2);
                ctx.beginPath();
                ctx.moveTo(0,0);
                ctx.lineTo(0,h);
                ctx.lineTo(w/2,h/2);
                ctx.closePath();
                ctx.fillStyle ="#003a84";
                ctx.fill();
                break;
            case 'CN':
                // 中国国旗
                ctx.save();
                ctx.translate(0,0);
                ctx.fillStyle ="rgb(222,40,16)";
                ctx.fillRect(0,0,w,h);
                ctx.restore();
                ctx.translate(0,0);
                this.drawStar(w/10,w/6,w/6,53.8,"#ffde00");
                this.drawStar(w/30,w/3,w/15,0,"#ffde00");
                this.drawStar(w/30,w/3,w *.3,0,"#ffde00");
                this.drawStar(w/30,w*.4,w*2/15,35,"#ffde00");
                this.drawStar(w/30,w*.4,w*7/30,-19,"#ffde00");
                ctx.restore();
                break;
        }
    }
};

$(document).ready(function(){
    $.tetris = Object.create(Tetris);
    $.tetris.init();
    $.tetris.drawFlag('CN');
});