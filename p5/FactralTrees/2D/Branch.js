class Branch {
    constructor (begin, end) {
        this.begin = begin;
        this.end = end;
    }

    show() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    /**
     * This function will create two new branches starting from the end point of actual branch.
     *   
     * \ /  --> create this
     *  |  
     */
    branch() {
        // Create a new vector that point of bottom to top of actual branch
        let dest = p5.Vector.sub(this.end, this.begin);
        
        // After create, rotate it on 45 degrees
        dest.rotate(PI / 4);
        
        var newEnd = p5.Vector.add(this.end, dest);
        let r = new Branch(this.end, newEnd);

        return r;
    }


}