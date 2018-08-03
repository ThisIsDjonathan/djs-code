
let paluSprite, computerSprite, barSprite, deskSprite, worldSprite;
let paluStand, paluWalk, barAnimation, computerAnimation, deskAnimation, worldAnimation;
let palu, computer, bar, desk, world;

let nextFrameOn = 0, counter, gotoNextLeveBtn;

function preload() {
	// An animation with a single frame for standing
	paluStand = loadAnimation("assets/sprites/palu/palu_stand.png");	
	paluWalk = loadAnimation("assets/sprites/palu/palu_walk1.png", "assets/sprites/palu/palu_walk2.png");	
	
	barAnimation = loadAnimation("assets/sprites/bar/barSpritesheet001.png", "assets/sprites/bar/barSpritesheet002.png", "assets/sprites/bar/barSpritesheet003.png", "assets/sprites/bar/barSpritesheet004.png", "assets/sprites/bar/barSpritesheet005.png", "assets/sprites/bar/barSpritesheet006.png", "assets/sprites/bar/barSpritesheet007.png", "assets/sprites/bar/barSpritesheet008.png", "assets/sprites/bar/barSpritesheet009.png", "assets/sprites/bar/barSpritesheet010.png", "assets/sprites/bar/barSpritesheet011.png", "assets/sprites/bar/barSpritesheet012.png", "assets/sprites/bar/barSpritesheet013.png", "assets/sprites/bar/barSpritesheet014.png", "assets/sprites/bar/barSpritesheet015.png", "assets/sprites/bar/barSpritesheet016.png");
	computerAnimation = loadAnimation("assets/sprites/computer_desk.png");
	worldAnimation = loadAnimation("assets/sprites/tmpBg1.png", "assets/sprites/tmpBg2.png");
}

function setup() {
	createCanvas(600, 300);
	camera.zoom = 0.8;

	gotoNextLeveBtn = createButton("Ir para fase 2!");
	gotoNextLeveBtn.position(width/2, height/2);
	gotoNextLeveBtn.mousePressed(gotoNextLevel);
	gotoNextLeveBtn.hide();
  
	// Create world
	worldSprite = createSprite(0, 0, width, height);
	worldSprite.addAnimation('world', worldAnimation);
	world = new GameObject(worldSprite);
	
	// Create the Player sprite and add it's animations
	paluSprite = createSprite(50, height-80, 80, 210);
	paluSprite.addAnimation('stand', paluStand);
	paluSprite.addAnimation('walk', paluWalk);
	paluSprite.scale = 1.2;
	palu = new Palu(paluSprite, 2);

	// Create computer's sprite and object
	computerSprite = createSprite(width-80, height-80, 150, 262);
	computerSprite.addAnimation('normal', computerAnimation);
	computerSprite.scale = 0.5;
	computer = new GameObject(computerSprite);

	// Create bar sprite
	barSprite = createSprite(210, 30, 296, 37);
	barSprite.addAnimation('normal', barAnimation);
	bar = new GameObject(barSprite); 
}

function draw() {
	clear();

	// Show world
	world.show();
	world.animation.stop();
	
	// Handle bar
	bar.show();
	bar.animation.stop();

	// Draw palu's computer
	computer.show();

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