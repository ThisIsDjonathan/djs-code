const MAX_TREE_DEPTH = 10;

let defaultAngle, defaultSize, depth, newSize;

function setup() {
    createCanvas(800, 600);
    background(50);
    depth = 0;

    // Uncomment lines to fix angle and size
    //defaultAngle = PI / 4;
    //defaultSize = 0.7;

    // By default 0, 0 on p5 is on the top left on the screen
    // Change it to be at the center of the bottom with translate function
    translate(width/2, height);

    // Set stroke and draw branches
    stroke(255);
    branch(180, 1);
}

/**
 * Recursive function that draw branches on the factral tree.
 * push and pop function store and restore values to draw the actual branch.
 * Line function arguments x1, y1, x2, y2.
 * @param size - size of the branch.
 * @param depth - recursive auxiliar var to count the tree size.
 */
function branch(size, depth) {
    // Draw branch
    line(0, 0, 0, -size);

    // Translate to the initial point become the end of last branch
    translate(0, -size);

    // If tree can go deepper
    if(depth < MAX_TREE_DEPTH) {
        // Rotate by angle and draw a new branch 
        push();

        // If default angle it's definied, rotate by it. Else get a random angle
        if(defaultAngle)
            rotate(defaultAngle);
        else 
            rotate(random(0.6, 0.8));
        
        // If default size it's definied, create new branch based on it. Else get a random size
        if(defaultSize) 
            branch(size * defaultSize, depth + 1);
        else 
            branch(size * random(0.6, 0.8), depth + 1);
        pop();

        // Draw branch to the left side also
        push();
        if(defaultAngle)
            rotate(-defaultAngle);
        else 
            rotate(-random(0.6, 0.8));

        if(defaultSize) 
            branch(size * defaultSize, depth + 1);
        else 
            branch(size * random(0.6, 0.8), depth + 1);
        pop();
    }
}