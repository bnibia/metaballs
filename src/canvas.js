
var w, h, ctx;
var points;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");

    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
		w = canvas.width;
		h = canvas.height;
		draw(w, h);
    
    }

};


function color(c)
{
	let p = c/4;
	let l = ~(p);
	let v = ~~(l*255);
	
	
	let cor = "#" + ("00"+(v).toString(16)).slice(-2) + 
					("00"+(v).toString(16)).slice(-2) + 
					("00"+(v).toString(16)).slice(-2);
					
	return (cor);
}

function particle(x, y, r)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.velx = 4 + Math.random()*7;
	this.vely = 4 + Math.random()*7;

	this.update = function()
	{
		this.edges();
		this.x += this.velx;
		this.y += this.vely;
	}

	
	this.edges = function()
	{
		if(this.x <= 0 || (this.x + this.r) >= w) this.velx *= -1; 
		if(this.y <= 0 || (this.y + this.r) >= h) this.vely *= -1;
	}
}



function draw(width, height)
{
	points = new Array(15);
  
	for(let i=0;i<points.length;i++)
	{
		points[i] = new particle(Math.random()*width, Math.random()*height, 20);	
	}
	
	window.requestAnimationFrame(animate);
}



function distr(x1, y1, x2, y2)
{
	let x = (x2 - x1);
		x *= x;
	
	let y = (y2 - y1);
		y *= y;
	
	return Math.pow((x+y), (1/2));
}



function animate()
{	
	

	for(let i=0;i<points.length;i++)
	{
		points[i].update();
		
	}
	
	//ctx.clearRect(0, 0, w, h);
	
	for(let i=0;i<w;i++)
	{
		for(let j=0;j<h;j++)
		{	
			let sum = 0;
			for(let k=0;k<points.length;k++)
			{   
				let d = distr(i, j, points[k].x, points[k].y);
				sum += 300 * points[k].r/d; 
			}
			
			ctx.fillStyle = color(sum);
            ctx.fillRect(i, j, 1, 1);
		}
	}
	
	
	window.requestAnimationFrame(animate);
      	 
}




        

 
 

 
 
 
 
