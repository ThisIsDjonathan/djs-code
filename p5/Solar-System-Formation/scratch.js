//const SEED = 0;
const DUST_SIZE = 5;
const START_VELOCITY = 2.5;
const SPAWN_VELOCITY = 0.015;
const GRAVITY = 0.01;
const CAM_SPEED = 10;

let spaceDust = [];
let keysDown = [1000];
let camPos;
let starPos;
let numNewDusts;
let spawnPos;
let mouseDown;
let easycam;


function setup() {
	createCanvas(600,600,WEBGL);
	rectMode(CENTER);
	ellipseMode(CENTER);
	noStroke();
	fill(255);

	camPos = createVector(0, 0);
	starPos = createVector(0, 0);
	easycam = createEasyCam();
}

function draw() {
	background(0);
	translate(starPos.x + camPos.x, starPos.y + camPos.y);
	sphere(20);

	// Add dusts
	for (var i = 0; i < numNewDusts; i++) {
		spaceDust.push(new SpaceDust(0, 0));
	}
	numNewDusts = 0;

	// Update dusts
	for (var i = 0; i < spaceDust.length; i++) {
		spaceDust[i].update();
	}

	// Keyboard control
	if (keysDown[87]) camPos.y += CAM_SPEED;
	if (keysDown[83]) camPos.y -= CAM_SPEED;
	if (keysDown[65]) camPos.x += CAM_SPEED;
	if (keysDown[68]) camPos.x -= CAM_SPEED;
	if (keysDown[78]) numNewDusts += 1;

	if (mouseDown) {
		stroke(255);
		line(spawnPos.x, spawnPos.y, mouseX, mouseY);
		noStroke();
	}
}


function mousePressed() {
	mouseDown = true;
	spawnPos = createVector(mouseX, mouseY);
}

function mouseReleased() {
	spaceDust.push(new SpaceDust(
		createVector(spawnPos.x - camPos.x, spawnPos.y - camPos.y),
		createVector((spawnPos.x - mouseX) * SPAWN_VELOCITY, (spawnPos.y - mouseY) * SPAWN_VELOCITY)
	));
	mouseDown = false;
}

function keyPressed() {
	keysDown[keyCode] = true;
}

function keyReleased() {
	keysDown[keyCode] = false;
}
