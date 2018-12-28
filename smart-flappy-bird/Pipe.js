
class Pipe {
  constructor(startPos) {
    this.pos = startPos;  

    this.w = 80;
    this.h = 200;    
  }

  show() {
    push();
    noStroke(0);
    fill(0, 255, 0);
    rect(this.pos.x, this.pos.y, this.w, this.h);
    pop();
  }

  update() {
    this.pos.x -= 5;
  }
}


