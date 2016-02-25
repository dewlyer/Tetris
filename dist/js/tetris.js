(function($, window, document){

    'use strict';

    var Tetris = {
        options: {
            blockWidth: 1
        },
        // Canvas
        _canvas: null,
        _ctx: null,
        // UI Elements
        _$game: null,
        _$canvas: null,
        _$gameholder: null,
        _$start: null,
        _$score: null,
        _$scoreText: null,
        // Theme
        _theme: {
            strokeWidth: 1,
            backgroundGrid: '#ccc',
            background: '#ccc'
        },
        _shapes: {
            line: [
                [ 0, -1,   0, -2,   0, -3,   0, -4],
                [ 2, -2,   1, -2,   0, -2,  -1, -2],
                [ 0, -4,   0, -3,   0, -2,   0, -1],
                [-1, -2,   0, -2,   1, -2,   2, -2]
            ],
            square: [
                [0,  0,   1,  0,   0, -1,   1, -1],
                [1,  0,   1, -1,   0,  0,   0, -1],
                [1, -1,   0, -1,   1,  0,   0,  0],
                [0, -1,   0,  0,   1, -1,   1,  0]
            ],
            arrow: [
                [0, -1,   1, -1,   2, -1,   1, -2],
                [1,  0,   1, -1,   1, -2,   0, -1],
                [2, -1,   1, -1,   0, -1,   1,  0],
                [1, -2,   1, -1,   1,  0,   2, -1]
            ],
            rightHook: [
                [2,  0,   1,  0,   1, -1,   1, -2],
                [2, -2,   2, -1,   1, -1,   0, -1],
                [0, -2,   1, -2,   1, -1,   1,  0],
                [0,  0,   0, -1,   1, -1,   2, -1]
            ],
            leftHook: [
                [0,  0,   1,  0,   1, -1,   1, -2],
                [2,  0,   2, -1,   1, -1,   0, -1],
                [2, -2,   1, -2,   1, -1,   1,  0],
                [0, -2,   0, -1,   1, -1,   2, -1]
            ],
            rightZag: [
                [1,  0,   1, -1,   0, -1,   0, -2],
                [2, -1,   1, -1,   1,  0,   0,  0],
                [0, -2,   0, -1,   1, -1,   1,  0],
                [0,  0,   1,  0,   1, -1,   2, -1]
            ],
            leftZag: [
                [0,  0,   0, -1,   1, -1,   1, -2],
                [2, -1,   1, -1,   1, -2,   0, -2],
                [1, -2,   1, -1,   0, -1,   0,  0],
                [0, -2,   1, -2,   1, -1,   2, -1]
            ]
        },
        _shapeFactory: null,
        init: function() {
            var game = this;
            game._create();
            game._setup();
        },
        updateSiezs: function() {
            this._PIXEL_WIDTH = this._canvas.width();
            this._PIXEL_HEIGHT = this._canvas.height();

            this._BLOCK_WIDTH = this.options.blockWidth;
            this._BLOCK_HEIGHT = Math.floor(this._canvas.height() / this._canvas.width() * this._BLOCK_WIDTH);

            this._block_size = Math.floor(this._PIXEL_WIDTH / this._BLOCK_WIDTH);
            this._border_width = 2;

            // Recalculate the pixel width and height so the canvas always has the best possible size
            this._PIXEL_WIDTH = this._block_size * this._BLOCK_WIDTH;
            this._PIXEL_HEIGHT = this._block_size * this._BLOCK_HEIGHT;

            this._$canvas.attr('width', this._PIXEL_WIDTH)
                .attr('height', this._PIXEL_HEIGHT);
        },
        _create: function() {
            var game = this;
            game._createHolder();
            game._createUI();
            game._createControls();
        },
        _setup: function() {
            var game = this;
            game._setupShapeFactory();
            game._setupFilled();
            game._setupInfo();
            game._setupBoard();
        },
        _createHolder: function() {
            console.log('_createHolder');

            var game = this;
            this._$gameholder = $('<div class="tetris-game-holder"></div>');
            this._$gameholder.css({
                position:   'relative',
                width:      '100%',
                height:     '100%'
            });
            $(document.body).prepend(this._$gameholder);

            game._$score = $('<div class="tetris-score-holder"></div>');
            game._$gameholder.append(game._$score);

            game._$start = $('<div class="tetris-start-holder"></div>');
            game._$gameholder.append(game._$start);

        },
        _createUI: function() {
            console.log('_createUI');

            var game = this;

            game._$canvas = $('<canvas class="tetris-canvas"></canvas>');
            game._$canvas.css('background-color', this._theme.background);
            game._$gameholder.prepend(this._$canvas);
            game._canvas = this._$canvas.get(0);
            game._ctx = this._canvas.getContext('2d');
        },
        _createControls: function() {
            console.log('_createControls');
        },
        _setupShapeFactory: function() {
            var game = this;
            if(game._shapeFactory !== null) return;

            function Shape(game, orientations, symmetrical, blockType) {
                this.x = 0;
                this.y = 0;
                this.symmetrical = symmetrical;
                this.blockType = blockType;
                this.blockVariation = null;
                this.blocksLen = orientations[0].length;
                this.orientations = orientations;
                this.orientation = 0;
                this.init();
            }
            Shape.prototype.init = function() {
                this.orientation = 0;
                this.x = Math.floor(game._BLOCK_WIDTH / 2) - 1;
                this.y = -1;
            };
            Shape.prototype.rotate = function() {
                var orientation = (this.orientation + (direction === 'left' ? 1 : -1) + 4) % 4;

                //TODO - when past limit - auto shift and remember that too!
                if (!game._checkCollisions(this.x, this.y, this.getBlocks(orientation))) {
                    this.orientation = orientation;
                    game._board.renderChanged = true;
                }
            };
            Shape.prototype.moveRight = function() {
                if (!game._checkCollisions(this.x + 1, this.y, this.getBlocks())) {
                    this.x++;
                    game._board.renderChanged = true;
                }
            };
            Shape.prototype.moveLeft = function() {
                if (!game._checkCollisions(this.x - 1, this.y, this.getBlocks())) {
                    this.x--;
                    game._board.renderChanged = true;
                }
            };
            Shape.prototype.drop = function() {
                if (!game._checkCollisions(this.x, this.y + 1, this.getBlocks())) {
                    this.y++;
                    // Reset the drop count, as we dropped the block sooner
                    game._board.dropCount = -1;
                    game._board.animate();
                    game._board.renderChanged = true;
                }
            };
            Shape.prototype.getBlocks = function() {
                return this.orientations[orientation !== undefined ? orientation : this.orientation];
            };
            Shape.prototype.getBounds = function() {
                var blocks = $.isArray(_blocks) ? _blocks : this.getBlocks(_blocks),
                    i=0, len=blocks.length, minx=999, maxx=-999, miny=999, maxy=-999;
                for (; i<len; i+=2) {
                    if (blocks[i] < minx) { minx = blocks[i]; }
                    if (blocks[i] > maxx) { maxx = blocks[i]; }
                    if (blocks[i+1] < miny) { miny = blocks[i+1]; }
                    if (blocks[i+1] > maxy) { maxy = blocks[i+1]; }
                }
                return {
                    left: minx,
                    right: maxx,
                    top: miny,
                    bottom: maxy,
                    width: maxx - minx,
                    height: maxy - miny
                };
            };
            Shape.prototype.draw = function() {
                var blocks = this.getBlocks(_orientation),
                    x = _x === undefined ? this.x : _x,
                    y = _y === undefined ? this.y : _y,
                    i = 0,
                    index = 0;

                for (; i<this.blocksLen; i += 2) {
                    game._board.drawBlock(x + blocks[i], y + blocks[i+1], this.blockType, this.blockVariation, index, this.orientation, true);
                    index++;
                }
            };

            this._shapeFactory = {
                line:       new Shape(game, game._shapes.line, false, 'line'),
                square:     new Shape(game, game._shapes.square, false, 'square'),
                arrow:      new Shape(game, game._shapes.arrow, false, 'arrow'),
                leftHook:   new Shape(game, game._shapes.leftHook, false, 'leftHook'),
                rightHook:  new Shape(game, game._shapes.rightHook, false, 'rightHook'),
                leftZag:    new Shape(game, game._shapes.leftZag, false, 'leftZag'),
                rightZag:   new Shape(game, game._shapes.rightZag, false, 'rightZag')
            }
        },
        _setupFilled: function() {
            console.log('_setupFilled');
        },
        _setupInfo: function() {
            console.log('_setupInfo');
        },
        _setupBoard: function() {
            console.log('_setupBoard');
        },
        _drawBackground: function() {
            var borderWidth = this._theme.strokeWidth;
            var borderDistance = Math.round(.23);
            var squareDistance = Math.round(.3);
            this._ctx.globalAlpha = 1.0;
            this._ctx.fillStyle = this._theme.backgroundGrid;
            for( var x=0; x<this._BLOCK_WIDTH; x++ ) {
                for( var y=0; y<this._BLOCK_HEIGHT; y++ ) {
                    var cx = x * this._block_size;
                    var cy = y * this._block_size;

                    this._ctx.fillRect(cx+borderWidth, cy+borderWidth, this._block_size-borderWidth*2, this._block_size-borderWidth*2);
                }
            }
            this._ctx.globalAlpha = 1.0;
        },
        drawBlock: function() {
        },
        start: function() {
            this._doStart();
        },
        restart: function() {
            this._doStart();
        },
        _doStart: function() {
        }

        //
        //canvas: document.getElementById('J-game-panel'),
        //context: null,
        //getContext: function() {
        //    this.context = this.canvas.getContext('2d');
        //    return this;
        //},
        //setSize: function() {
        //    this.canvas.width = window.innerWidth;
        //    this.canvas.height = window.innerHeight;
        //    return this;
        //},
        //
        //init: function() {
        //    this.getContext().setSize();
        //    return this;
        //},
        //drawStar: function(r, x, y, deg, color) {
        //    var ctx = this.context;
        //    ctx.save();
        //    ctx.translate(x,y);
        //    ctx.rotate(deg*Math.PI/180);
        //    ctx.lineWidth = 1;
        //    ctx.beginPath();
        //    var dit = Math.PI * 4 / 5;
        //    var sin = Math.sin(0) * r/* + y*/;
        //    var cos = Math.cos(0) * r/* + x*/;
        //    //console.log(0+":"+0);
        //    ctx.moveTo(cos, sin);
        //    for (var i = 0; i < 5; i++) {
        //        var tempDit = dit * i;
        //        sin = Math.sin(tempDit) * r/* + y*/;
        //        cos = Math.cos(tempDit) * r/* + x*/;
        //        ctx.lineTo(cos, sin);
        //        //console.log(cos+":"+sin+":"+tempDit);
        //    }
        //    ctx.closePath();
        //    ctx.strokeStyle = color;
        //    ctx.fillStyle = color;
        //    ctx.fill();
        //    ctx.restore();
        //},
        //drawFlag: function(code) {
        //    var ctx = this.context;
        //    var w = this.canvas.width;
        //    var h = this.canvas.height;
        //
        //    switch (code){
        //        case 'FR':
        //            // 法国国旗
        //            ctx.beginPath();
        //            ctx.fillStyle ="#002496";
        //            ctx.fillRect(0,0,w/3,h);
        //            ctx.fillStyle ="#ffffff";
        //            ctx.fillRect(w/3,0,w/3,h);
        //            ctx.fillStyle ="#ed2839";
        //            ctx.fillRect(w*2/3,0,w/3,h);
        //            ctx.closePath();
        //            break;
        //        case 'CZ':
        //            // 捷克国旗
        //            ctx.beginPath();
        //            ctx.fillStyle ="#ffffff";
        //            ctx.fillRect(0,0,w,w/2);
        //            ctx.fillStyle ="#be0026";
        //            ctx.fillRect(0,h/2,w,w/2);
        //            ctx.beginPath();
        //            ctx.moveTo(0,0);
        //            ctx.lineTo(0,h);
        //            ctx.lineTo(w/2,h/2);
        //            ctx.closePath();
        //            ctx.fillStyle ="#003a84";
        //            ctx.fill();
        //            break;
        //        case 'CN':
        //            // 中国国旗
        //            ctx.save();
        //            ctx.translate(0,0);
        //            ctx.fillStyle ="rgb(222,40,16)";
        //            ctx.fillRect(0,0,w,h);
        //            ctx.restore();
        //            ctx.translate(0,0);
        //            this.drawStar(w/10,w/6,w/6,53.8,"#ffde00");
        //            this.drawStar(w/30,w/3,w/15,0,"#ffde00");
        //            this.drawStar(w/30,w/3,w *.3,0,"#ffde00");
        //            this.drawStar(w/30,w*.4,w*2/15,35,"#ffde00");
        //            this.drawStar(w/30,w*.4,w*7/30,-19,"#ffde00");
        //            ctx.restore();
        //            break;
        //    }
        //}
    };

    $(document).ready(function(){
        var tetris = Object.create(Tetris);
        tetris.init();
    });

}(jQuery, window, document));