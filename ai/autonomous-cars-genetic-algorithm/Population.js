/**
 * A population it's a list of cars in this case.
 */
class Population {
  constructor() {
    this.cars = [];
    this.parents = [];
    this.popSize = POPULATION_SIZE;
    this.initialize();
  }

  /**
   * Initialize population creating a 
   * 
   * set of cars.
   */
  initialize() {
    for(let i = 0; i < this.popSize; i++) {
      this.cars[i] = new Car();
    }
  }

  /**
   * Evaluate each car from population.
   */
  evaluate() {
    let bestFitness = 0;

    // Calculate fitness for each car on population.
    this.cars.forEach(function(car) {
      car.calcFitness();

      // If actual cars fitness it's better than the best one, set this as best.
      if(car.fitness > bestFitness) {
        bestFitness = car.fitness;
      }
    });

    // Normalises fitnesses to all values be between 0 and 1.
    this.cars.forEach(function(car) {
        car.fitness /= bestFitness;
    });

    // Loop through population and take each cars fitness to make it into a scale of 1 to 100.
    // Add cars to a list of parents (they will be parents of the next generation).
    // A car with a higher fitness will probably be picked more often.
    this.parents = [];
    for (let i = 0; i < this.popSize; i++) {
      // Get car fitness and multiply by 100 
      let n = this.cars[i].fitness * 100;
      // Put this car (future parent) into a list of parents n times. 
      for (var j = 0; j < n; j++) {
        this.parents.push(this.cars[i]);
      }
    }
  }

  
  /**
   * Simulate natural selection. Determine which parents will procreate to the new generation.
   */
  selection() {
    let newCars = [];
    for(let i = 0; i < this.cars.length; i++) {
      // Get two parents from parents list. 
      // Parents list will has n number of cars. 
      // A better parent will be picked more likely because it was added more times on list. 
      let parentA = random(this.parents).dna;
      let parentB = random(this.parents).dna;
      
      // Create child DNA
      let child = parentA.crossover(parentB);
      
      // Mutade child
      child.mutation();
      
      // Add car to new population
      newCars[i] = new Car(child);
    }

    this.cars = newCars;
  }

  /**
   * @returns number of completed cars on population. 
   */
  getCompletedCars() {
    let completed = 0;
    this.cars.forEach(function(car) {
      if(car.completed)
        completed++;
    });

    return completed
  }

  /**
   * Run population updating and showing cars for each frame.
   */
  run() {
    // Update and show each car on population
    this.cars.forEach(function(car) {
      car.update();
      car.show();
    });
  }
}
