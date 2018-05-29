class Branch {
    constructor (begin, end) {
        this.begin = begin;
        this.end = end;
        this.rotation = PI / 4;
        this.growned = false;
    }

    /**
     * To show a branch a line will be drawn from begin xy to end xy.
     */
    show() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    /**
     * This function will create two new branches starting from the end point of actual branch.
     * @return an array of branches with 2 of them. One directioned to right and another to left.
     *   
     * \ /  --> create this
     *  |
     * 
     * Create a new vector that point of bottom to top of actual branch.
     *     \ /   
     *      |     /\   --> Create this directional vector
     *      |      |
     * 
     * After create, rotate it
     * 
     *     \ /   
     *      |      /\  --> Rotate vector
     *      |      /  
     */
    branch() {
        // Create directional vector
        let destDir = p5.Vector.sub(this.end, this.begin);
        
        // Rotate to rigth, set new end to right branch and create it
        destDir.rotate(this.rotation);
        let newEnd = p5.Vector.add(this.end, destDir);
        let rightBranch = new Branch(this.end, newEnd);

        // Rotate to left, set new end to left branch and create it
        destDir.rotate(-this.rotation  * 2);
        newEnd = p5.Vector.add(this.end, destDir);
        let leftBranch = new Branch(this.end, newEnd);

        // Create an array of branches and return the new right and left branches
        let newBranches = new Array();
        newBranches.push(rightBranch);
        newBranches.push(leftBranch);

        return newBranches;
    }


}