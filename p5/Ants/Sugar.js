class Sugar {
    constructor () {
        this.pos = createVector(random(0, width), random(0, height));
        this.r = random(3, 5);
        this.color = 255;
    }

    show() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    done() {
        return this.r <= 1
    }

    remove() {
        let sugarIndex = sugars.indexOf(this);
        sugars.splice(sugarIndex, 1);
    }
}