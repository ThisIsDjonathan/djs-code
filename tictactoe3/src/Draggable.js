// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, spot, pieceType) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = 400/3;
    this.h = 400/3;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentSpot = spot;
    this.pieceType = pieceType;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    noStroke()
    fill(95, 153, 110, 0);
    rect(this.x, this.y, this.w, this.h);

    if(this.dragging) {
      drawGrid();
      let pos = {x: mouseX, y: mouseY }
      if (this.pieceType == 'X') {
          fill(X_COLOR);
      } else {
          fill(O_COLOR);
      }
      textSize(60);
      textAlign(CENTER, CENTER);
      noStroke();
      text(this.pieceType, pos.x, pos.y);
    } else {
          let pos = getSpotPosition(this.currentSpot);
          if (this.pieceType == 'X') {
              fill(X_COLOR);
          } else {
              fill(O_COLOR);
          }
          textSize(60);
          textAlign(CENTER, CENTER);
          noStroke();
          text(this.pieceType, pos.x, pos.y);
    }
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}