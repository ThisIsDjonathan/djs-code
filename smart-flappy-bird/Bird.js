
class Bird {
  constructor() {
    this.pos = createVector(30, height/2);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
  }

  update () {
    // Velocity changes according to acceleration
    this.vel.add(this.acc)
    this.vel.limit(this.speedLimit)
    
    // Position changes by velocity
    this.pos.add(this.vel)
    
    // Clear acceleration each frame
    this.acc.mult(0)

  }

  // Newton's 2nd law: F = M * A or A = F / M
  applyForce(force) {
    this.acc.add(force)
  }

  jump() {
    this.applyForce(createVector(0, -3));
    console.log('jump')
  }

  show() {
    push();
    noStroke();
    fill(200, 200, 255);
    ellipse(this.pos.x, this.pos.y, 20);
    pop();
  }
}