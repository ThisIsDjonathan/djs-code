class Sugar {
    constructor(size, x, y) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = {"r" : 230, "g" : 230, "b" : 230, "a" : 230};
    }


    show() {
        // Set color and stroke
        fill(this.color.r, this.color.g, this.color.b, this.color.a);
        noStroke();

        // Draw it on canvas
        ellipse(this.x, this.y, this.size, this.size);
    }


    /**
     * When ant take a piece of sugar, it will get smaller. If size it's less than 15, the piece ends.
     */
    takePiece() {
        if(this.size <= 15) {
            this.size = 0;
        } else {
            this.size -= 2;
        }
        
    }
}