class Player {
    constructor(id, pos, r) {
        this.color = [];
        this.getNewColor();
        this.eatedFoods = 0;

        if(r)
            this.r = r;
        else
            this.r = 125;
        
        if(id) 
            this.id = id;
        
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
        let d = dist(object.pos.x, object.pos.y, this.pos.x, this.pos.y);
        if(d < this.r + object.r) {
            this.r += object.r - (this.eatedFoods / 10);
            this.eatedFoods++;
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
