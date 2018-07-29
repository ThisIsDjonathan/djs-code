class Ant {
    constructor () {
        this.pos = createVector(width/2, height/2);
        this.r = 5;
        this.color = color(255, 204, 50);
        this.onNest = false;
        this.isDead = false;
        this.life = random(80, 100);

        this.off = createVector(random(0, width), random(0, height)); // Offset to control perlin noise
        this.pct = 0; // Travel control
    }

    /**
     * Draw an ellipse on ant position
     */
    show() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r);
    }

    /**
     * Update ant on each frame.
     * Use perlin noise to keep looking for sugars. When found get a bite.
     */
    update() {
        // If ant can get more sugar, keep looking for. Else go to nest.
        if(this.r <= 10) {
            // Update life cycle
            this.life -= 0.1; 

            // Check if ant died
            if(this.life <= 0) {
                this.isDead = true;
                this.color = color(255, 10, 10, 240);
                deadAnts++;
            }

            // Search new sugars
            this.pos.x = noise(this.off.x) * width;
            this.pos.y = noise(this.off.y) * height;
        
            this.off.x += 0.01;
            this.off.y += 0.005;
        } else if (!this.onNest) {
            this.goToNest();
        }

        // Loop on sugars to check colision
        for(sugar of sugars) {
            let d = dist(this.pos.x, this.pos.y, sugar.pos.x, sugar.pos.y);

            if(d <= sugar.r * 2) {
                this.bite(sugar);
            }
        }

    }

    /**
     * Get a bite of sugar.
     * @param {*} sugar 
     */
    bite(sugar) {
        // Increase ant's size and life
        this.r += 1;
        this.life += 0.5;

        // Decrease sugar's size, if it's done, remove from sugars array
        sugar.r -= 1;
        if(sugar.done()) {
            sugar.remove();
        }
    }

    /**
     * Move ant to nest.
     */
    goToNest() {
        let nestPos = createVector(width/2, height/2);

        // Calculate distance of actual position to dest pos 
        let xDistToDest = nestPos.x - this.pos.x;
        let yDistToDest = nestPos.y - this.pos.y;

        // Add and step to travel percent
        this.pct += 0.01;
        
        // If travel percent isn't 100%, move it	
        if (this.pct < 1.0) {
            this.pos.x = this.pos.x + this.pct * xDistToDest;
            this.pos.y = this.pos.y + this.pct * yDistToDest;
        } else {
            this.onNest = true;
            completedAnts++;
        }
    }
}