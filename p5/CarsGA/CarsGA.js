var population;
var maxLifeCycle = 200;
var count = 0;

function setup() {
  createCanvas(400, 300);
  objective = new objective();
  population = new Population();
}


function draw() {
  background(50);
  objective.show();
  population.run();
  count++;

  if(count == maxLifeCycle) {
    count = 0;
    population.evaluate();
    population.selection();
  }

}


function objective() {
  this.pos = createVector(width/2, height/2);

  this.show = function () {
    push();
    noStroke();
    fill(255);
    ellipse(objective.pos.x, objective.pos.y, 20, 20);
    pop();
  };
}
