window.onload = function(){
	var canvas = document.getElementById('magnifier');
	canvas.width = 1000;
	canvas.height = 600;
	var ctx = canvas.getContext('2d');

	var img = new Image();
	img.src = "images/blue.jpg";
	img.onload = function (){
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	}

	var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

	// 获取鼠标相对于canvas边界的坐标
	function getPoint(e, node){
    	// clientX: 点击点距离文档左边的距离
    	// getBoundingClientRect() 返回节点到文档四周的距离 
    	var x = (device ? e.touches[0].clientX : e.clientX) - node.getBoundingClientRect().left;
        var y = (device ? e.touches[0].clientY : e.clientY) - node.getBoundingClientRect().top;
        return {X: x, Y: y};
    }

    var moveName = device ? 'touchmove': 'mousemove';
    canvas.addEventListener(moveName, function (e){
    	ctx.clearRect(0, 0, canvas.width, canvas.height);
    	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    	var x = getPoint(e, this).X;
    	var y = getPoint(e, this).Y;
    	var r = 100;
    	var scale = 3;
    	var alpha = 1;
    	magnifier(ctx, x, y, r, scale, alpha);
    });

    function magnifier(ctx, x, y, r, scale, alpha){
    	ctx.save();
    	ctx.beginPath();
    	ctx.globalAlpha = alpha;

    	if(x < r && y < r){
    		ctx.arc(x+r, y+r, r, 0, Math.PI * 2, true);
    	}else if(x < r && (canvas.height-y) < r ){
    		ctx.arc(x+r, y-r, r, 0, Math.PI * 2, true);
    	}else if( (canvas.width-x) < r && y < r ){
    		ctx.arc(x-r, y+r, r, 0, Math.PI * 2, true);
    	}else if( (canvas.width-x) < r && (canvas.height-y) < r){
    		ctx.arc(x-r, y-r, r, 0, Math.PI * 2, true);
    	}else if( x < r && y > r){
    		ctx.arc(x+r, y, r, 0, Math.PI * 2, true);
    	}else if( x > r && y < r){
    		ctx.arc(x, y+r, r, 0, Math.PI * 2, true);
    	}else if( x > r && (canvas.height-y) < r){
    		ctx.arc(x, y-r, r, 0, Math.PI * 2, true);
    	}else if((canvas.width-x) < r && y > r){
    		ctx.arc(x-r, y, r, 0, Math.PI * 2, true);
    	}else{
    		ctx.arc(x, y, r, 0, Math.PI * 2, true);
    	}

    	ctx.clip();

    	if(x < r && y < r){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale+r, y-r*scale+r, r*2*scale, r*2*scale);
    	}else if(x < r && (canvas.height-y) < r ){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale+r, y-r*scale-r, r*2*scale, r*2*scale);
    	}else if((canvas.width-x) < r && y < r ){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale-r, y-r*scale+r, r*2*scale, r*2*scale);
    	}else if((canvas.width-x) < r && (canvas.height-y) < r ){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale-r, y-r*scale-r, r*2*scale, r*2*scale);
    	}else if(x < r && y > r ){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale+r, y-r*scale, r*2*scale, r*2*scale);
    	}else if(x > r && y < r){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale, y-r*scale+r, r*2*scale, r*2*scale);
    	}else if( x > r && (canvas.height-y) < r){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale, y-r*scale-r, r*2*scale, r*2*scale);
    	}else if((canvas.width-x) < r && y > r){
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale-r, y-r*scale, r*2*scale, r*2*scale);
    	}else{
    		ctx.drawImage(canvas, x-r, y-r, r*2, r*2, x-r*scale, y-r*scale, r*2*scale, r*2*scale);
    	}
    	ctx.restore();
    	ctx.globalAlpha = 1;
    }

}