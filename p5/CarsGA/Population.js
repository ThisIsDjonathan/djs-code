class Population {
  constructor() {
    this.cars = [];
    this.parents = [];
    this.popSize = 10;
    this.createPop();
  }

  createPop() {
    for(let i = 0; i < this.popSize; i++) {
      this.cars[i] = new Car();
    }
  }

  /**
   *
   */
  evaluate() {
    let bestFitness = 0;

    // Calculate fitness for each car on population.
    this.cars.forEach(function(car) {
      car.calcFitness();
      if(car.fitness > bestFitness) {
        bestFitness = car.fitness;
      }
    });

    // Normalises fitnesses to all values be between 0 and 1.
    this.cars.forEach(function(car) {
        car.fitness /= bestFitness;
    });

    // Make cars fitness and make into a scale of 1 to 100.
    // A car with high fitness will probably be picked more often.
    this.parents = [];
    for (let i = 0; i < this.popSize; i++) {
      let n = this.cars[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.parents.push(this.cars[i]);
      }
    }
  }

  selection() {
    let newCars = [];
    for(let i = 0; i < this.cars.length; i++) {
      let parentA = random(this.parents).dna;
      let parentB = random(this.parents).dna;
      let child = parentA.crossover(parentB);
      newCars[i] = new Car(child);
    }

    this.cars = newCars;
  }


  run() {
    // Update and show each car on population
    this.cars.forEach(function(car) {
      car.update();
      car.show();
    });
  }
}
