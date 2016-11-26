
if(!window.requestAnimationFrame){
	window.requestAnimationFrame = ( 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(cb){
			return window.setTimeout(cb, 1000/60);
		});
}

window.utils = {

	device: function(){
		return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	},

	// @method: getPoints
	// @desc:   获取鼠标距离目标元素左上角的坐标
	// @param:  {Object} ev   事件对象Event对象
	// @param:  {Object} ele  点击的DOM元素对象
	// @return: {Object}      点击点距离元素左上角的坐标
	getPoints: function(ele){
	    var point = {x: 0, y: 0, event: null},
		    body_scrollLeft = document.body.scrollLeft,
		    element_scrollLeft = document.documentElement.scrollLeft,
		    body_scrollTop = document.body.scrollTop,
		    element_scrollTop = document.documentElement.scrollTop,
		    offsetLeft = ele.offsetLeft,
		    offsetTop = ele.offsetTop;
  		
  		// function onEvent(event){
  		// 	var x, y;
		  //   event = utils.device() ? event.touches[0] : event;
		  //   if (event.pageX || event.pageY) {
		  //       x = event.pageX;
		  //       y = event.pageY;
		  //   } else {
		  //       x = event.clientX + body_scrollLeft + element_scrollLeft;
		  //       y = event.clientY + body_scrollTop + element_scrollTop;
		  //   }
		  //   x -= offsetLeft;
		  //   y -= offsetTop;
		    
		  //   point.x = x;
		  //   point.y = y;
		  //   point.event = event;
  		// }

  		function onEvent(e){
			point.x = (utils.device() ? e.touches[0].clientX : e.clientX) - ele.getBoundingClientRect().left;
        	point.y = (utils.device() ? e.touches[0].clientY : e.clientY) - ele.getBoundingClientRect().top;

		    point.event = event;
		}

  		if(utils.device()){
  			ele.addEventListener('touchstart', onEvent);
			ele.addEventListener('touchmove', onEvent);
  		}else{
  			ele.addEventListener('mousemove', onEvent);
  		}

		return point;
	},

	// @method: isPointInPolygon
	// @desc:   某个点是否在多边形内
	// @param:  {Object}   point    目标点对象
	// @param:  {Array}    polygon  多边形顶点坐标集合
	// @return: {Boolean}  点是否在多边形内
	isPointInPolygon: function(point, polygon) {
		var px = point.x,
			py = point.y,
			flag = false;

		for(var i = 0, l = polygon.length, j = l - 1; i < l; j = i, i++) {
			var sx = poly[i].x,
			    sy = poly[i].y,
			    tx = poly[j].x,
			    ty = poly[j].y;

			// 点与多边形顶点重合
			if((sx === px && sy === py) || (tx === px && ty === py)) {
			  return flag
			}

			// 判断线段两端点是否在射线两侧
			if((sy < py && ty >= py) || (sy >= py && ty < py)) {
				// 线段上与射线 Y 坐标相同的点的 X 坐标
				var x = sx + (py - sy) * (tx - sx) / (ty - sy);

				// 点在多边形的边上
				if(x === px) {
				    return flag;
				}

				// 射线穿过多边形的边界
				if(x > px) {
				    flag = !flag;
				}
			}
		}

		return flag;
	},

	// @method: increaseRotate
	// @desc:   点围绕一个点旋转, 用角度增量计算新坐标
	// @param:  {number}   angle    旋转的角度增量
	// @param:  {number}   centerX  旋转中心点X坐标
	// @param:  {number}   centerY  旋转中心点Y坐标
	// @param:  {number}   pointX   目标点X坐标
	// @param:  {number}   pointY   目标点Y坐标
	// @return: {Object}   旋转后目标点的新坐标 X, Y
	increaseRotate: function(angle, centerX, canterY, pointX, pointY){
		var x1 = pointX - centerX,
            y1 = pointY - centerY,
            x2 = Math.cos(angle) * x1 - Math.sin(angle) * y1,
            y2 = Math.cos(angle) * y1 + Math.sin(angle) * x1,
        	x = centerX + x2,
        	y = centerY + y2;

        return {x: x, y:y};
	}


};


