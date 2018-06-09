
/**
 *
 */
class DNA {
  constructor(genes) {
    if(genes) {
      this.genes = genes;
    } else {
        this.initialize();
    }
  }

  /**
   * Each gene it's a random direction
   */
  initialize() {
    this.genes = [];
    for(let i = 0; i < maxLifeCycle; i++) {
      // Gives random vectors
      this.genes[i] = p5.Vector.random2D();
      
      // Sets maximum force of vector to be applied to a car
      this.genes[i].setMag(0.2);
    }
  }

  /**
   * 
   */
  crossover(partner) {
    let newGenes = [];
    let mid = floor(random(this.genes.length));
    for(let i = 0; i < this.genes.length; i++) {
      if(i > mid) {
        newGenes[i] = this.genes[i];
      }
      else {
        newGenes[i] = partner[i];
      }
    }

    return new DNA(newGenes);
  }
}
