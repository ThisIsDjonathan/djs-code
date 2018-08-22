// Game objects
let palu, computer, bar, desk, world, airplane;

// Auxs
let nextFrameOn = 0, gotoNextLeveBtn;
let animations = [];

let counter;

function preload() {
	animations['paluStand'] = loadAnimation("assets/sprites/palu/palu_stand.png");	
	animations['paluWalk'] = loadAnimation("assets/sprites/palu/palu_walk1.png", "assets/sprites/palu/palu_walk2.png");	
	
	animations['bar'] = loadAnimation("assets/sprites/bar/barSpritesheet001.png", "assets/sprites/bar/barSpritesheet002.png", "assets/sprites/bar/barSpritesheet003.png", "assets/sprites/bar/barSpritesheet004.png", "assets/sprites/bar/barSpritesheet005.png", "assets/sprites/bar/barSpritesheet006.png", "assets/sprites/bar/barSpritesheet007.png", "assets/sprites/bar/barSpritesheet008.png", "assets/sprites/bar/barSpritesheet009.png", "assets/sprites/bar/barSpritesheet010.png", "assets/sprites/bar/barSpritesheet011.png", "assets/sprites/bar/barSpritesheet012.png", "assets/sprites/bar/barSpritesheet013.png", "assets/sprites/bar/barSpritesheet014.png", "assets/sprites/bar/barSpritesheet015.png", "assets/sprites/bar/barSpritesheet016.png");
	animations['computer'] = loadAnimation("assets/sprites/computer_desk.png");
	animations['world'] = loadAnimation("assets/sprites/tmpBg1.png", "assets/sprites/tmpBg2.png");
	animations['airplane'] = loadAnimation("assets/sprites/airplane/plane1.png", "assets/sprites/airplane/plane2.png", "assets/sprites/airplane/plane3.png")
}

function setup() {
	createCanvas(600, 300);
	camera.zoom = 0.8;

	gotoNextLeveBtn = createButton("Ir para fase 2!");
	gotoNextLeveBtn.position(width/2, height/2);
	gotoNextLeveBtn.mousePressed(gotoNextLevel);
	gotoNextLeveBtn.hide();
  
	// Create world
	let worldSprite = createSprite(0, 0, width, height);
	worldSprite.addAnimation('world', animations['world']);
	world = new GameObject(worldSprite);
	
	// Create the Player sprite and add it's animations
	palu = new Palu(createSprite(50, height-80, 80, 210), 2);
	palu.sprite.addAnimation('stand', animations['paluStand']);
	palu.sprite.addAnimation('walk', animations['paluWalk']);
	palu.sprite.scale = 1.2;
	

	// Create computer's sprite and object
	let computerSprite = createSprite(width-80, height-80, 150, 262);
	computerSprite.addAnimation('normal', animations['computer']);
	computerSprite.scale = 0.5;
	computer = new GameObject(computerSprite);

	// Create bar sprite
	let barSprite = createSprite(210, 30, 296, 37);
	barSprite.addAnimation('normal', animations['bar']);
	bar = new GameObject(barSprite); 

	// Airplane
	let airplaneSprite = createSprite(210, height-30, 296, 37);
	airplaneSprite.addAnimation("normal", animations['airplane']);
	airplane = new GameObject(airplaneSprite);

	counter = new Counter(2, () => {
		bar.animation.nextFrame();
	});
}

function draw() {
	clear();
	
	// Show world
	world.show();
	world.animation.stop();

	// Handle Palu
	palu.show();
	palu.update();

	if(palu.level == 1) {
		palu.talkWithJohn();
	} else if(palu.level == 2) {
		palu.takeAirplane();
	}
	
	if(palu.inLove) {
		gotoNextLeveBtn.show();		
	}
}


function gotoNextLevel() {	
	gotoNextLeveBtn.remove();
	world.animation.nextFrame();
	palu.level++;
}