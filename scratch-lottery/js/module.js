function ScratchLottery(config){
	var _this = this;

	var init = {
		width: '400',
		height: '300',
		lotteryBg: {
			color: 'red',
			image: 'images/blue.jpg'
		},
		lotteryText: {
			desc: '恭喜你中奖了!',
			fontSize: 20,
			fontFamily: 'Arial',
			color: '#2AD62E'
		},
		maskBg: {
			color: '#ccc',
			image: ''
		},
		percent: 0.15
	}

	_this.id = config.id;
	_this.width = config.width || init.width;
	_this.height = config.height || init.height;
	_this.lotteryBg = config.lotteryBg || init.lotteryBg;
	_this.lotteryText = config.lotteryText || init.lotteryText;
	_this.maskBg = config.maskBg || init.maskBg;
	_this.percent = config.percent || init.percent;

	_this.content = document.getElementById(_this.id);

	_this.lottery = document.createElement('canvas');
	_this.lottery.width = _this.width;
	_this.lottery.height = _this.height;
	_this.lottery.style.cssText = 'position:absolute;left:0;top:0;';

	_this.content.appendChild(_this.lottery);

	_this.mask = document.createElement('canvas');
	_this.mask.width = _this.width;
	_this.mask.height = _this.height;
	_this.mask.style.cssText = 'position:absolute;left:0;top:0;';
	_this.content.appendChild(_this.mask);

	_this.lotteryCtx = _this.lottery.getContext('2d');
	_this.maskCtx = _this.mask.getContext('2d');

	_this.drawContent = function(ctx, width, height, bg, text){
		if(bg.image){
			var img = new Image();
			img.src = bg.image;
			img.onload = function(){
				ctx.drawImage(img, 0, 0, width, height);
				if(text){
					drawText();
				}
			}
		}else{
			ctx.fillStyle = bg.color;
			ctx.fillRect(0, 0, width, height);
			if(text){
				drawText();	
			}	
		}

		function drawText(){
	    	ctx.font = 'Bold ' + text.fontSize + 'px ' + text.fontFamily;
	    	ctx.textAlign = 'center';
	    	ctx.fillStyle = text.color;
	    	ctx.fillText(text.desc, width / 2, height / 2 + text.fontSize / 2);
		}
		
	}

	_this.drawContent(_this.lotteryCtx, _this.width, _this.height, _this.lotteryBg, _this.lotteryText);
	_this.drawContent(_this.maskCtx, _this.width, _this.height, _this.maskBg );

	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    var drawable = false;
    var clickDown = device ? 'touchstart' : 'mousedown';
    var clickUp = device ? 'touchend' : 'mouseup';
    var moveName = device ? 'touchmove': 'mousemove';

    _this.getPoint = function(e, self){
    	// clientX: 点击点距离文档左边的距离
    	// getBoundingClientRect() 返回节点到文档四周的距离 
    	var x = (device ? e.touches[0].clientX : e.clientX) - self.getBoundingClientRect().left;
        var y = (device ? e.touches[0].clientY : e.clientY) - self.getBoundingClientRect().top;
        return {X: x, Y: y};
    }

    _this.mask.addEventListener(clickDown, function(e){
    	drawable = true;
    	_this.lastX = _this.getPoint(e, this).X;
    	_this.lastY = _this.getPoint(e, this).Y;
    });

    _this.mask.addEventListener(clickUp, function(){
    	drawable = false;
    	_this.drawProcess(_this.maskCtx, _this.width, _this.height);
    });

    _this.mask.addEventListener(moveName, function(e){
    	if(!device && e.buttons != 1){
    		drawable = false;
    		_this.drawProcess(_this.maskCtx, _this.width, _this.height);
    		return;
    	}
        var x = _this.getPoint(e, this).X;
        var y = _this.getPoint(e, this).Y;
        var r = 20;
        if(drawable){
        	_this.drawPoint(_this.maskCtx, x, y, r);
        }    	
    });

    _this.drawPoint = function(ctx, x, y, r){
    	ctx.beginPath();
    	ctx.globalCompositeOperation = 'destination-out';
    	var rg = ctx.createRadialGradient(x, y, 0, x, y, r);
	    rg.addColorStop(0, 'rgba(0,0,0,0.6)');
	    rg.addColorStop(1, 'rgba(255, 255, 255, 0)');
	    ctx.fillStyle = rg;
	    ctx.arc(x, y, r, 0, Math.PI * 2, true);
	    ctx.fill();

	    // 画线，解决快速划过时不连续
	    // ctx.moveTo(_this.lastX, _this.lastY);
		// ctx.lineTo(x, y);
		// ctx.strokeStyle = 'red';
		// ctx.lineWidth = r;
		// ctx.lineCap = "round";
		// ctx.lineJoin = 'round';
		// ctx.stroke();

	    _this.lastX = x;
	    _this.lastY = y;
    }

    _this.drawProcess = function(ctx, width, height){
    	var imgData = ctx.getImageData(0, 0, width, height).data;
    	var len = imgData.length;
    	var arr = [];
    	for(var i = 0; i < len; i += 4){
    		var a = imgData[i+3];
    		if(a < 128){
    			arr.push(a);
    		}
    	}
    	var percent = arr.length / (_this.width * _this.height);
    	if(percent > _this.percent){
    		_this.mask.style.cssText = 'opacity:0; transition: opacity 2s;';
    	}
    }
}

var config = {
	id: 'test',
	width: '400',
	height: '300',
	lotteryBg: {
		color: 'red',
		image: 'images/blue.jpg'
	},
	lotteryText: {
		desc: '继续努力哦 (*_*)',
		fontSize: 30,
		fontFamily: 'Arial',
		color: 'red'
	},
	maskBg: {
		color: '#ddd',
		image: ''
	},
	percent: 0.15
};

var lottery = new ScratchLottery(config);