
class CoupleOfPipes {
  constructor() {
    this.topPipe = new Pipe(createVector(width/2, 0));
    this.bottomPipe = new Pipe(createVector(width/2, height-100));
  }

  show() {
    this.topPipe.show();
    this.bottomPipe.show();
  }

  update() {
    this.topPipe.update();
    this.bottomPipe.update();

    if (this.topPipe.pos.x < -this.topPipe.w) {
      this.recreate();
    }
  }
  
  recreate() {
    this.topPipe.pos.x = width;
    this.bottomPipe.pos.x = width;

    this.topPipe.pos.y = random(0, height*0.35);
    this.topPipe.h = this.topPipe.pos.y - height;

    this.bottomPipe.pos.y = height - this.topPipe.pos.y - 80;
    this.bottomPipe.h = this.bottomPipe.pos.y + height;
  }
}