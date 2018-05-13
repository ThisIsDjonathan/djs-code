
// Configurations params
var antsQty = 50;
var sugarQty = 8;
var homeSize = 100;

// Vars
var ants = new Array();
var sugars = new Array();
var home;

function setup() {
	createCanvas(800,600);

	// Set home position and size
	home = {'x' : width / 2
	 	  , 'y'	: height / 2
		  , 'diameter' : homeSize
		  , 'radius' : homeSize / 2};

	// Crate antsQty Ants
	for (var i = 0; i < antsQty; i++) {
		ants.push(new Ant(i, random(width), random(height), home));
	}

	// Create sugars
	for (var i = 0; i < sugarQty; i++) {
		sugars.push(new Sugar(random(40, 70), random(width), random(height)));
	}

}

function draw() {
	background(0);
	drawHome();

	// Draw sugars on map
	sugars.forEach(function(sugar) {
		sugar.show();
	});
	
	// Control ants
	ants.forEach(function(ant) {
		ant.show();

		if(!ant.hasSugar) {
			ant.searchSugar(sugars);
		} else {
			ant.goHome();
		}
		
		if (ant.moving == false) {
			ant.pct = 0;
			ant.dest = ant.getNewDest();
		}
	});
}


function drawHome() {
	noStroke();
	fill(119, 53, 53);
	ellipse(home.x, home.y, home.diameter, home.diameter);
}

