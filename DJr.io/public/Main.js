let me;
let foods = [];
let players = [];
let actualScale = 10;
let newScale;

function setup() {
	createCanvas(800, 600);
	me = new Player(width/2, height/2);

	for(let i = 0; i < 10; i++) {
		foods[i] = new Food();
	}
	
	// Conect to the server
	socket = io.connect("http://localhost:443/");

	// Send data 
	let playerData = {
		x: me.pos.x,
		y: me.pos.y,
		r: me.r
	};
	  
	socket.emit('start', playerData);

	socket.on('heartbeat', (data) => {
		console.log(data);
		
		players = data;
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

	foods.reduceRight(function(acc, item, index, object) {
		item.show();
		if(me.eats(item)) {
			object.splice(index, 1);
		}
	});

	for(let i = players.length - 1; i >= 0; i--) {
		if(players[i].id != socket.id) {
			fill(255);
			ellipse(players[i].x, players[i].y, players[i].r*2, players[i].r*2);
		}
	}

	let data = {
		x: me.pos.x,
		y: me.pos.y,
		r: me.r
	  };
	  socket.emit('update', data);
	
	
}