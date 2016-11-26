(function(){
	var lottery = document.getElementById('lottery');
	var mask = document.getElementById('mask');
	var lotteryCtx = document.getElementById('lottery').getContext('2d');
	var maskCtx = document.getElementById('mask').getContext('2d');
	var width = 400;
	var height = 300;
	var lotteryColor = "red";
	var markColor = "#ccc";
	mask.width = mask.offsetWidth;
	mask.height = mask.offsetHeight;
	lottery.width = mask.offsetWidth;
	lottery.height = mask.offsetHeight;

	drawContent(lotteryCtx, width, height, lotteryColor);
	drawContent(maskCtx, width, height, markColor);

	function drawContent(ctx, width, height, color){
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, width, height);
	}

	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    var moveName = device? 'touchmove': 'mousemove';

    mask.addEventListener(moveName, function(e){
    	// clientX: 点击点距离文档左边的距离
    	// getBoundingClientRect() 返回节点到文档四周的距离 
        var x = (device ? e.touches[0].clientX : e.clientX) - this.getBoundingClientRect().left;
        var y = (device ? e.touches[0].clientY : e.clientY) - this.getBoundingClientRect().top;
        var r = 20;
    	drawPoint(maskCtx, x, y, r);
    });

    function drawPoint(ctx, x, y, r){
    	ctx.beginPath();
    	ctx.globalCompositeOperation = 'destination-out';
    	var rg = ctx.createRadialGradient(x, y, 0, x, y, r);
	    rg.addColorStop(0, 'rgba(0,0,0,0.6)');
	    rg.addColorStop(1, 'rgba(255, 255, 255, 0)');
	    ctx.fillStyle = rg;
	    ctx.arc(x, y, r, 0, Math.PI * 2, true);
	    ctx.fill();
    }

}());