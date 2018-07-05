class Food {
    constructor() {
        this.pos = createVector(random(-width), random(height*2));
        this.r = 10;
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}