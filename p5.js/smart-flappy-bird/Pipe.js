
class Pipe {
  constructor() {
    this.top = random(0, height/2);
    this.bottom = random(0, height/2);
    this.pos = createVector(width, 0);
    
    this.w = 80;
    this.h = 200;    
    this.speed = 5;
  }

  show() {
    push();
    noStroke(0);
    fill(0, 255, 0);
    rect(this.pos.x, 0, this.w, this.top);
    rect(this.pos.x, height-this.bottom, this.w, this.bottom);
    pop();
  }

  update() {
    this.pos.x -= this.speed;
  }
}


