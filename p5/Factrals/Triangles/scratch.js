/**
 * Factrals on triangles.
 * Djonathan Krause - 2018.
 * Based on Think Twice video https://www.youtube.com/watch?v=IGlGvSXkRGI
 */

let x, y, p, triangle;

// Simple triagle object
class Triangle {
    constructor() {
        this.v1 = createVector(100, height-50);
        this.v2 = createVector(width/2, 50);
        this.v3 = createVector(width-100, height-50);
        this.vertices = [this.v1, this.v2, this.v3];
    }
}

/**
 * Steps:
 * 1. Draw a triangle;
 * 2. Pick a random point inside the triangle;
 * 3. Put another point midway between previous point and a random vertex of the triangle;
 * 4. Repeat steps 2 and 3.
 */

function setup() {
    createCanvas(800, 600);
    background(50);
    triangle = new Triangle();

    // Step 1: Draw a triangle;
    beginShape();
    noStroke();
    vertex(triangle.v1.x, triangle.v1.y);
    vertex(triangle.v2.x, triangle.v2.y);
    vertex(triangle.v3.x, triangle.v3.y);
    endShape();
}

function draw() {
    fill(1);
    // Step 2
    p = getPoint();
    ellipse(p.x, p.y, 3, 3);

    // Step 3
    p = getSecondPoint();
    ellipse(p.x, p.y, 3, 3);
}

/**
 * Step 2: Pick a random point inside the triangle;
 */
function getPoint() {
    let insideTriangle = false;
    let pt = null;
    do {
        x = random(0, width);
        y = random(0, height);
        pt = createVector(x, y);

        if (pointInTriangle(pt, triangle.v1, triangle.v2, triangle.v3)) {
            insideTriangle = true;
        } 
    } while(insideTriangle == false);
    return pt;
}

/**
 * Step 3: Put another point midway between previous point and a random vertex of the triangle.
 * Use Thales's theorem to calculate the median point. 
 */
function getSecondPoint() {
    // Get a random vertex of the triangle
    let randomVertex = random(triangle.vertices);

    // debug :P
    //stroke(1);
    //line(p.x, p.y, randomVertex.x, randomVertex.y);

    // Thales thing
    let xm = (p.x + randomVertex.x) / 2;
    let ym = (p.y + randomVertex.y) / 2;
    return createVector(xm, ym);
}


/**
 * Do some magical math to check if point it's inside of the triangle.
 * Based on https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
 * @param {*} pt - point that will be verified
 * @param {*} v1 - vector 1 of the triangle
 * @param {*} v2 - vector 2 of the triangle
 * @param {*} v3 - vector 3 of the triangle
 * @returns true if point it's inside
 */
function pointInTriangle (pt, v1, v2, v3) {
    let b1, b2, b3;

    b1 = sign(pt, v1, v2) < 0.0;
    b2 = sign(pt, v2, v3) < 0.0;
    b3 = sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
}

function sign (p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}
