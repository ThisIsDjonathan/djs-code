let rocket, stars = []
let speedP
let ROCKETS_QTY = 1

/**
 * 
 */
function setup() {
  createCanvas(600, 600)
  rocket = new Rocket()

  for (let i = 0; i < 100; i++) {
    let s = {
      pos: createVector(random(0, width), random(0, height)),
      size: random(0, 4)
    }
    stars.push(s)
  }

  speedP = createP('Speed: ' + abs(rocket.vel.y))
  speedP.position(width+15, 0)
}

/**
 * 
 */
function draw() {
  background(50)
  
  // Draw starts
  for (let star of stars) {
    fill(255)
    ellipse(star.pos.x, star.pos.y, star.size)
  }

  speedP.html('Speed: ' + abs(rocket.vel.y))
  
  // User force
  rocket.applyForce(createVector(rocket.direction.x * rocket.mass, rocket.direction.y * rocket.mass))
  rocket.direction.x = 0
  rocket.direction.y = 0

  console.log('Speed: ' + abs(rocket.vel.y))
    
  // Gravity
  rocket.applyForce(createVector(0, 0.02))
  rocket.update()
  rocket.show()
}

/** 
 * Controls
 */
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      rocket.direction.y = -1 // up
      break
    case DOWN_ARROW:
      rocket.direction.y = 1 // down
      break
    case RIGHT_ARROW:
      rocket.direction.x = 1 // right
      break
    case LEFT_ARROW:
      rocket.direction.x = -1 // left
      break
  }
}