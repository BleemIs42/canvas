window.onload = function(){
    drawMarbles();
    function drawMarbles(){

    	var canvas = document.getElementById('canvas');
	    canvas.width = 1800;
	    canvas.height = 1500;

	    var ctx = canvas.getContext("2d");

    	var size = 100;
	    var img = new Image();
	    img.src = 'images/monkey.jpg';
	    img.onload = function (){
	    	addMonkey();
	        render();

	        setInterval(function(){
	            render();
	            updateMonkeys();
	        }, 1000/60);

	        // window.requestAnimationFrame(loop);

	        // function loop(){
	        // 	render();
	        //     updateMonkeys();
	        //     window.requestAnimationFrame(loop);
	        // }
	    }

    	var monkeys = [];
	    var colors = ["#F70303", "#E305F7", "#2C05F7", "#05AAF7", "#05F752","#52F705", "#D0F705", "#F79605", "#F73505", "#8D05F7"];

	    function addMonkey(){
	        for(var i=0; i<50; i++){
	            var aMonkey = {
	                x: canvas.width*Math.random(),
	                y: -size*(Math.random()+1),
	                g: 0.2+Math.random(),
	                vx: Math.pow( -1, Math.ceil(Math.random()*10) )*4,
	                vy: 1,
	                color: colors[ Math.floor(Math.random()*colors.length)]
	            }
	            monkeys.push(aMonkey);
	        } 
	    }

	    function updateMonkeys(){
	        for(var i=0; i<monkeys.length; i++){
	            monkeys[i].x += monkeys[i].vx;
	            monkeys[i].y += monkeys[i].vy;
	            monkeys[i].vy += monkeys[i].g;

	            //碰撞检测
	            if(monkeys[i].y > canvas.height-size){
	            	monkeys[i].y = canvas.height - size;
	            	monkeys[i].vy = -monkeys[i].vy*0.75;
	            }
	            //边界判断
	            if(monkeys[i].x > canvas.width || monkeys[i].x+size<0){
	            	monkeys[i].x = canvas.width*Math.random();
	            	monkeys[i].y = -size*(Math.random()+1);
	                monkeys[i].vy = 1;
	                monkeys[i].g = 0.2+Math.random();
	                monkeys[i].color = colors[ Math.floor(Math.random()*colors.length) ];
	            }
	        }
	    }

	    function render(){
	        // ctx.clearRect(0, 0, canvas.width, canvas.height);
	        ctx.fillStyle = 'rgba(255,255,255,0.3)';
			ctx.fillRect(0,0,canvas.width,canvas.height);
	        for(var i=0; i<monkeys.length; i++){
	            // ctx.drawImage(img, monkeys[i].x, monkeys[i].y, size, size);

	            ctx.beginPath();
	            ctx.arc(monkeys[i].x, monkeys[i].y, size/2, 0, 2*Math.PI);
	            ctx.closePath();
	            ctx.fillStyle = monkeys[i].color;
	            ctx.fill();
	        }
	    }
    }

    // draw solar system
	window.requestAnimationFrame(drawSolarSystem);
	drawSolarSystem();

	function drawSolarSystem() {
		var canvasTwo = document.getElementById('canvasTwo');
	    var ctx = canvasTwo.getContext('2d');
	    canvasTwo.width = 300;
	    canvasTwo.height = 300;

	    var sun = new Image();
		var moon = new Image();
		var earth = new Image();

	    sun.src = 'images/sun.png';
	    moon.src = 'images/moon.png';
	    earth.src = 'images/earth.png';

	    ctx.clearRect(0,0,300,300); // clear canvas
	    ctx.globalCompositeOperation="destination-over";
	  
	    ctx.fillStyle = 'rgba(0,0,0,0.4)';
	    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	  
	    ctx.beginPath();
	    ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
	    ctx.stroke();

	    ctx.save();
	    ctx.translate(150,150);

	  // Earth
	    var time = new Date();
	    ctx.rotate( ((2*Math.PI)/30)*time.getSeconds() + ((2*Math.PI)/30000)*time.getMilliseconds() );
	    ctx.translate(105,0);
	  
	    ctx.beginPath();
	    ctx.arc(0,0,28.5,0,Math.PI*2,false); // Moon orbit
	    ctx.stroke();
	   
	    ctx.fillRect(0 ,-12,50,24); // Shadow
	    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
	    ctx.drawImage(earth,-12,-12);
	  
	   // Moon
	   ctx.save();
	   ctx.rotate( ((2*Math.PI)/3)*time.getSeconds() + ((2*Math.PI)/3000)*time.getMilliseconds() );
	   ctx.translate(0,28.5);
	   ctx.drawImage(moon,-3.5,-3.5);
	   ctx.restore();

	   ctx.restore();
	  
	   ctx.drawImage(sun,0,0,300,300);
	  
	   window.requestAnimationFrame(drawSolarSystem);
	}

}