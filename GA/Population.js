/**
 * A population it's a set of chromosomes that will compete for suvival.
 * The survivors pass the genetic data forward
 */ 
class Population {
    /**
     * @param populationSize will tell us how many chromosomes we'll have on out population.
     */
    constructor(populationSize) {
        this.populationSize = populationSize;
        this.chromosomes = new Array();
    }

    /**
     * Initialize population randomly.
     */
    initPopulation() {
        for(var i = 0; i < this.populationSize; i++) {
            this.chromosomes.push(new Chromosome(i));
        }
    }

}


