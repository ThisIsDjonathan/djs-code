class Car {
  constructor(dna) {
    if(dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }

    this.pos = createVector(width / 2, height);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.fitness = 0;
    this.crashed = false;
    this.completed = false;
  }

  update() {
    // Check if car hit the objective
    if (dist(this.pos.x, this.pos.y, objective.pos.x, objective.pos.y) < 1) {
      this.completed = true;
    }
    // Check if car has hit border
    else if ((this.pos.x > width || this.pos.x < 0) || (this.pos.y > height || this.pos.y < 0)) {
      this.crashed = true;
    // Car will move just if it's not crashed or completed
    } else {
      // A gene it's a direction. We'll apply a force to car know which direction to go.
      this.applyForce(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  }

  /**
   * A car can recieves a force. It will apply this force to car's acceleration.
   */
  applyForce(force) {
    this.acc.add(force);
  }

  /**
   *
   */
  calcFitness() {
    // Calculate distance between car and objective/target.
    let d = dist(this.pos.x, this.pos.y, objective.pos.x, objective.pos.y);

    // A lower distance it's a better fitness, so map the distance to help to normalize it.
    // Map function will get d value that can be a range from 0 to width and re-map to a new range
    // That can be width to zero to invert it.
    this.fitness = map(d, 0, width, width, 0);

    // If car already it's completed (found the objective) increase fitness. This is a good path!
    if (this.completed) {
      this.fitness *= 10;
    }
    // If car has crashed decrease fitness. This is not a good path.
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  show() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 20, 5);
    pop();
  }
}
