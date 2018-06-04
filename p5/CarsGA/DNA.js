
/**
 *
 */
class DNA {
  constructor(genes) {
    if(genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      this.initialize();
    }
  }

  /**
   * Each gene it's a random direction
   */
  initialize() {
    for(let i = 0; i < maxLifeCycle; i++) {
      this.genes[i] = p5.Vector.random2D();
    }
  }

  crossover(partner) {
    let newGenes = [];
    let mid = floor(this.genes.length / 2);
    for(let i = 0; i < this.genes.length; i++) {
      if(i > mid) {
        newGenes = this.genes[i];
      }
      else {
        newGenes = partner[i];
      }
    }
    return new DNA(newGenes);
  }
}
