var sun;
var planets = [];

function preload() {
  let sunImg = loadImage("sun.jpg");
  let sunPos = {"x" : 0, "y" : 0};
  sun = new Planet(sunPos, sunImg, 100, 0, 0.05);
  
  let earthImg = loadImage("earth.jpg");
  let earthPos = {"x" : 250, "y" : 50};
  planets[0] = new Planet(earthPos, earthImg, 50, 0.1, 0.1);
}


function setup() {
  
  createCanvas(640, 480, WEBGL);
}


function draw() {
  background(255);

  sun.show();
  planets[0].show();

  
}

