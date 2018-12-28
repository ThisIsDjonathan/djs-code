let bird;
let pipes = [];
let coupleOfPipes;

function setup() {
  createCanvas(700, 500);
  rectMode(TOP);
  bird = new Bird();

  //pipes.push(new Pipe(true));
  //pipes.push(new Pipe(false));
  coupleOfPipes =  new CoupleOfPipes();
}

function draw() {
  background(51);


  coupleOfPipes.show();
  coupleOfPipes.update();
  
  // Apply gravity
  bird.applyForce(createVector(0, 0.1));
  
  // Update and show bird
  bird.update();
  bird.show();
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      bird.jump();
      break;
  }
}