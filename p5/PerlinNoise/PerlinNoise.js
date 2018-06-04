var rows, cols;
var xoff = 0;
var yoff = 0;
var zoff = 100;
var scl = 80;
var vel = 0.0002;

function setup() {
    createCanvas(600, 400);
    rows = height; // y
    cols = width;  // x
    background(50);
}

function draw() {
    //background(50);
	
    for (let y = 0; y < rows + scl; y += scl) {
        for (let x = 0; x < cols + scl; x += scl) {
            let xx = map(noise(xoff), 0, 1, 0, cols);
            let yy = map(noise(yoff), 0, 1, 0, rows);

            stroke(255, 255, 255, 100);
            point(xx, yy);
            xoff += vel;
      }
      yoff += vel;      
    }

    console.log(frameRate());
}