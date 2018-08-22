let me;
let foods = [];
let players = [];
let actualScale = 10;
let newScale;
let eatedFoods = [];

function setup() {
	createCanvas(800, 600);

	// Create player
	me = new Player(width/2, height/2);

	// Create initial food
	foods.push(new Food());
	
	// Conect to the server
	socket = io.connect("http://localhost:443/");

	// Set data to sent to server
	let data = {
		x: me.pos.x,
		y: me.pos.y,
		r: me.r,
	};
	  
	// Send data to server
	socket.emit('start', data);

	// Receive data from server
	socket.on('heartbeat', (data) => {
		players = data.players;
		foods = data.foods;
	});

}

function draw() {
	background(51);

	// Transale player to the center
	translate(width/2, height/2);
	
	// Scale player from map using linear interpolation to do it smoothy
	newScale = 25 / me.r;
	actualScale = lerp(actualScale, newScale, 0.1);
	scale(actualScale);
	
	// Translate to make world move and not the player
	translate(-me.pos.x, -me.pos.y);

	me.show();
	me.update();

	// Show all foods and check if eat it
	foods.reduceRight(function(acc, item, index, object) {
		fill(255);
        noStroke();
		ellipse(item.pos.x, item.pos.y, item.r*2, item.r*2);
		
		// When eat food, send information to server
		if(me.eats(item)) {
			socket.emit('eatFood', index);
		}
	});

	// Show players
	for(let i = players.length - 1; i >= 0; i--) {
		if(players[i].id != socket.id) {
			fill(255);
			ellipse(players[i].x, players[i].y, players[i].r*2, players[i].r*2);
		}
	}

	// Update postion on server
	socket.emit('update', {
		x: me.pos.x,
		y: me.pos.y,
		r: me.r,
		eatedFoods: eatedFoods,
	});
	
	
}