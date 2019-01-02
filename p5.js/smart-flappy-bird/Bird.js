
class Bird {
  constructor() {
    this.pos = createVector(30, height/2);
    this.acc = 0;
    this.vel = 0;
    this.gravity = 0.2;
    this.jumpSize = 5;
    this.velLimit = 8;
  }

  update () {
    this.vel += this.gravity;
    this.pos.y += this.vel;
    
    this.checkEdges();
  }

  checkEdges() {
    if (this.pos.y > height) {
      this.pos.y = height
    }
  }

  jump() {
    this.vel += -this.jumpSize;
  }

  show() {
    push();
    noStroke();
    fill(200, 200, 255);
    ellipse(this.pos.x, this.pos.y, 20);
    pop();
  }
}