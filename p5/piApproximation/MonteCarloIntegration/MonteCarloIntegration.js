/**
 * Approximating PI with Monte Carlo Integration.
 * Based on Think Twice video https://youtu.be/ELetCV_wX_c
 * Monte Carlo Integration https://en.wikipedia.org/wiki/Monte_Carlo_integration
 * Djonathan Krause - 2018.
 */

let x, y, d, circle, aproxPI, pPI;
let inCircle = 0, outCircle = 0, total = 0;

// Simple circle object
class Circle {
    constructor() {
        this.x = width/2
        this.y = height/2
        this.d = width;
        this.color = {r: 255, g:255, b:255};
    }
}

// Setup 
function setup() {
    // Create canvas, fill it and create a paragraph object
    createCanvas(500, 500);
    background(50);
    pPI = createP();

    // Create a new circle and draw it
    circle = new Circle();
    fill(circle.color.r, circle.color.g, circle.color.b);
    ellipse(circle.x, circle.y, circle.d, circle.d);
}

// Loop function
function draw() {
    // get a random position to draw point
    x = random(0, width);
    y = random(0, height);

    // calculate the distance between the actual point and the main circle
    d = dist(circle.x, circle.y, x, y);
    
    // if the distance it's smaller than the radius of the circle, point it's inside of it
    if(d < circle.d / 2) {
        // Purple it and increment inCircle count
        fill(200, 140, 190);
        inCircle++;
    } else {
        // If it's outside make a green point
        fill(160, 200, 120);
    }

    // Draw a small point on position
    noStroke();
    ellipse(x, y, 3, 3);
    
    // Increment total point count 
    total++;

    // Calculate approximation
    aproxPI = 4 * (inCircle / total);
    
    // Update value on screen
    pPI.html("PI Approximation: " + aproxPI);
}