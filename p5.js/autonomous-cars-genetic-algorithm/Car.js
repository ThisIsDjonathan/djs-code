/**
 * Car it's a chromossome of population. 
 */
class Car {
  /**
   * Constructor function. If a DNA it passed, car's DNA will be this DNA.
   * Else a new random DNA will be created to car.
   * 
   * Car start with fitness = 0, not crashed and not completed.
   */
  constructor(dna) {
    if(dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }

    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness = 0;
    this.crashed = false;
    this.completed = false;
    this.color = {r: 255, g: 255, b: 255, a: 200};
    this.pathSize = 0;
  }

  /**
   * For each frame, verify if car crash or complete objective.
   * If it has crashed or completed, stop. Else apply force to continue looking for objective.
   */
  update() {
    // Check if car hit the objective
    if (dist(this.pos.x, this.pos.y, objective.pos.x, objective.pos.y) < 10) {
      this.completed = true;
      this.pos = objective.pos.copy();
    }  
    // Check if car has hit border
    else if ((this.pos.x > width || this.pos.x < 0) || (this.pos.y > height || this.pos.y < 0)) {
      this.crashed = true;
    } 

    let oldX = this.pos.x;
    let oldY = this.pos.y;

    this.applyForce(this.dna.genes[count]);

    // Car will move just if it's not crashed or completed
    if(!this.crashed && !this.completed) {
      // A gene it's a direction. We'll apply a force to car know which direction to go.
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }

    this.pathSize += dist(oldX, oldY, this.pos.x, this.pos.y);
  }

  /**
   * A car can recieves a force. It will apply this force to car's acceleration.
   */
  applyForce(force) {
    this.acc.add(force);
  }

  /**
   * Fitness function verify best cars on each generation.
   */
  calcFitness() {
    // Calculate distance between car and objective/target.
    let d = dist(this.pos.x, this.pos.y, objective.pos.x, objective.pos.y);

    d -= this.pathSize - shortPath;

    // A lower distance it's a better fitness, so map the distance to help to normalize it.
    // Map function will get d value that can be a range from 0 to width and re-map to a new range
    // That can be width to zero to invert it.
    this.fitness = map(d, 0, width, width, 0);

    console.log("fitness: " + this.fitness +  " d: " + d);

    // If car already it's completed (found the objective) increase fitness. This is a good path!
    if (this.completed) {
      this.fitness *= 10;
    }
    // If car has crashed decrease fitness. This is not a good path.
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  /**
   * Show car.
   */
  show() {
    push();
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 20, 5);
    pop();
  }
}
