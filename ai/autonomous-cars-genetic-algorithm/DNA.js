
/**
 * DNA it's a set of genes that compose a car.
 */
class DNA {
  constructor(genes) {
    if(genes) {
      this.genes = genes;
    } else {
        this.initialize();
    }

    this.mutant = false;
  }

  /**
   * Each gene it's a random direction.
   */
  initialize() {
    this.genes = [];
    for(let i = 0; i < MAX_LIFE_CYCLE; i++) {
      // Set random vectors as genes
      this.genes[i] = p5.Vector.random2D();
      
      // Sets maximum force of vector to be applied to a car
      this.genes[i].setMag(0.2);
    }
  }

  /**
   * This will cross DNA data from parents to make a new car.
   * The child will inherit the parents DNA.
   */
  crossover(partner) {
    let newGenes = [];

    // Flip a coin to know from who get the DNA. 
    let getFromPartner = random(1) > 0.5 ? true : false;

    // Create a new DNA going through each gene of parent DNA  
    for(let i = 0; i < this.genes.length; i++) {
      if(getFromPartner) 
        newGenes[i] = partner.genes[i];
      else 
        newGenes[i] = this.genes[i];
    }

    return new DNA(newGenes);
  }

  /**
   * For each gene of DNA generate a random number between 0 and 1. 
   * If this number it's lesser than mutation probability percent, then mutate gene.
   * Mutation consist in set a new direction to gene.
   */
  mutation() {
      this.mutant = false;
      for (let i = 0; i < this.genes.length; i++) {
        let mutationFlag = random(1) < MUTATION_PROB_PERC ? true : false; 
        if (mutationFlag) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(0.2);
          this.mutant = true;
        }
    }
  }
}
