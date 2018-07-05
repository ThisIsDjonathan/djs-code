class Player {
    constructor(pos) {
        this.r = 25;
        this.color = [];
        this.getNewColor();
        
        if(pos) 
            this.pos = createVector(pos.x, pos.y);
        else
            this.pos = createVector(random(width), random(height));
    }

    /**
     * 
     */
    show() {
        fill(this.color.r, this.color.g, this.color.b, this.color.a);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    /**
     * 
     */
    update() {
        let vel = createVector(mouseX - width/2, mouseY - height/2);
        vel.setMag(1.5);
        this.pos.add(vel);
    }

    /**
     * 
     */
    eats(object) {
        if(p5.Vector.dist(this.pos, object.pos) < this.r + object.r) {
            this.r += object.r;
            return true;
        } else {
            return false;
        }
    }


    /**
     * 
     */
    getNewColor() {
        this.color.r = random(0, 255);
        this.color.g = random(0, 255);
        this.color.b = random(0, 255);
        this.color.a = 200;
    }
} 