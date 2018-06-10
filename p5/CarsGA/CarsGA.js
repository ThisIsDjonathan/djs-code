/**
 * Based on Coding Train (Daniel Shiffman) example: https://youtu.be/bGz7mv2vD6g
 * @autor Djonathan Krause - http://odjonathankrause.github.com
 *
 * 09/06/2018
 */

// Constant values
const MAX_LIFE_CYCLE = 200;
const MUTATION_PROB_PERC = 0.01;
const POPULATION_SIZE = 25;

let population;
let count = 0;
let generation = 1;
let genP, actualCompletedP, maxCompletedP;
let maxCompleted = 0;
let completedCars = 0;
let bestFitnessToShow = 0;

/**
 * Create a canvas, objective and a new population. 
 */
function setup() {
  createCanvas(400, 300);
  objective = new Objective();
  population = new Population();
  genP = createP();
  actualCompletedP = createP();
  maxCompletedP = createP();
}

function draw() {
  // Set background color
  background(50);

  // Show objective
  objective.show();

  // Show data
  completedCars = population.getCompletedCars();
  maxCompleted = completedCars > maxCompleted ? completedCars : maxCompleted; 
  genP.html("Generation: " + generation);
  actualCompletedP.html("Actual completed cars: " + completedCars);
  maxCompletedP.html("Max number of completed cars: " + maxCompleted);
  
  // Move and show cars
  population.run();
  
  // Count frames
  count++;

  // If already move on screen n times
  if(count == MAX_LIFE_CYCLE) {
    // Set count to 0
    count = 0;

    // Increment generation count
    generation++;

    // Evaluate this generation to check witch are best cars 
    population.evaluate();

    // Select best cars and make a new generation from they
    population.selection();
  }
}

/**
 * Click on canvas to change objective position.
 */
function mousePressed() {
  this.objective.pos.x = mouseX;
  this.objective.pos.y = mouseY;
}


/**
 * Objective it's the point that cars are looking for.
 */
function Objective() {
  this.pos = createVector(random(0, width), random(height/3, 0));
  this.show = function () {
    push();
    noStroke();
    fill(255);
    ellipse(objective.pos.x, objective.pos.y, 20, 20);
    pop();
  };
}
