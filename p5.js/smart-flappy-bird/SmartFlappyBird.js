let bird;
let pipes = [];

function setup() {
  createCanvas(700, 600);
  bird = new Bird();
  pipes.push(new Pipe())
}

function draw() {
  background(51);

  // Add a new pipe to every 150 frames
  if (frameCount % 150 == 0) {
    pipes.push(new Pipe());
  }

  for (let [i, pipe] of pipes.entries()) {
    pipe.show();
    pipe.update();
    
    if (pipe.pos.x < -pipe.w) {
      pipes.splice(i, 1);
      console.log(pipes.length);
    }

  }

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