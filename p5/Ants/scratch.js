const POPULATION_SIZE = 100;
const NUM_OF_SUGARS = 100;
const SUGAR_SPAWN_PROB = 5; // Percent of chance to spawn a new sugar

let ants = [], sugars = [];
let deadAnts = 0, completedAnts = 0, generation = 1;
let deadAntsText, completedAntsText;

function setup() {
	createCanvas(800, 600);
    background(51);
    deadAntsText = createP();
    completedAntsText = createP();

    // Create initial population
    for(let i = 0; i < POPULATION_SIZE; i++) {
        ants.push(new Ant());
    }
    
    // Create sugars
    for(let i = 0; i < NUM_OF_SUGARS; i++) {
        sugars.push(new Sugar());
    }
}

function draw() {
   background(51);

   // Draw nest
   noStroke();
   fill(100, 120, 80);
   ellipse(width/2, height/2, 50, 50);

   // Show sugars
   for(sugar of sugars) {
       sugar.show();
   }

   // Show and update ants
   for(ant of ants) {
    ant.show();
        if(!ant.isDead) {
            ant.update();
        } 
    }

    // Verify if end of generation
    if(deadAnts + completedAnts == ants.length) {
        console.log("End of generation " + generation);
        newGeneration();
    }

    // Spawn new sugars based on SUGAR_SPAWN_PROB probability
    newSugar();

    // Update text elements
    deadAntsText.html("Dead ants: " + deadAnts);
    completedAntsText.html("Completed ants: " + completedAnts);

}

function newGeneration() {
    // Reset ants array and increase generation counter
    ants = [];
    generation++;

    // Create new population of ants. New population size will be based on completed ants of last generation
    for(let i = 0; i < POPULATION_SIZE; i++) {
        ants.push(new Ant());
    }

    // Reset vars
    completedAnts = 0;
    deadAnts = 0;
}

function newSugar() {
    if(random(1) < SUGAR_SPAWN_PROB / 100) {
        console.log("New sugar spawned");
        sugars.push(new Sugar());
    }
}