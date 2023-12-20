

class Piece {
    constructor(spot, type) {
        this.spot = spot;
        this.type = type;
    }

    show() {
        if (this.spot == undefined) {
            return;
        }
        textSize(60);
        textAlign(CENTER, CENTER);
        fill('#333');
        noStroke();
        text(this.type, this.spot.x, this.spot.y);
    }

}