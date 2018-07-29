var xoff = 0;
var yoff = 0;
var coff = {r: 13, g: 140, b: 200};
var force, x, y, color;

function setup() {
	createCanvas(800, 600);
	background(51);
}

function draw() {
   background(255);
	
	color = {r: noise(coff.r) * 100, g: noise(coff.g) * 100, b: noise(coff.b) * 100}	;
	
	x = noise(xoff) * width;
	y = noise(yoff) * height;
	
	noStroke();
	fill(color.r, color.g, color.b);
	ellipse(x, y, 70, 70);
	
	xoff += 0.01;
	yoff += 0.005;
	coff.r += 0.01;
	coff.g += 0.01;
	coff.b += 0.01;

}













