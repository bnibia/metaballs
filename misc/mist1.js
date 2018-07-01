
var w, h, ctx;
var points;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");

    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
        w = canvas.width;
		h = canvas.height;
		draw(w, h);
    
    }

};


function color(c)
{
	let cor = "#" + (c).toString(16) + 
					(c).toString(16) + 
					(c).toString(16);
	console.log(cor);
	return (cor);
}


function map_range(_in, from1, to1, from2, to2)
{
	return (from2 + ((_in - from1) * (to2 - from2) / (to1 - from1)));
}



function particle(x, y, r)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.velx = 2 + Math.random()*6;
	this.vely = 2 + Math.random()*6;

	this.show = function()
    {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
		ctx.fill();
    };
	
	
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
	points = new Array(2);
  
	for(let i=0;i<points.length;i++)
	{
		points[i] = new particle(Math.random()*width, Math.random()*height, 20);
		points[i].show();
		
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
		//points[i].update();
		//points[i].show();
	}
	
	ctx.clearRect(0, 0, w, h);
	
	for(let i=0;i<h;i++)
	{
		for(let j=0;j<w;j++)
		{	
			let sum = 0;
			
			let d = distr(i, j, w/2, h/2);
			
			/*for(let k=0;k<points.length;k++)
			{
				let d = distr(i, j, points[k].x, points[k].y);
				sum += 300 * points[k].r/d; 
			}*/
			
			ctx.fillStyle = color(d);
            ctx.fillRect(i, j, 1, 1);
		}
	}
	
	
	//window.requestAnimationFrame(animate);
      	 
}




        

 
 

 
 
 
 
