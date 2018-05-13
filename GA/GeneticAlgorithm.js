class GeneticAlgorithm {
    constructor() {
        this.population = new Population();
    }


    /**
     * Detemine a chromossome quality. On our case, a good one it's a chromossome who has discovery some sugar.
     */
    fitness(chromossome) {
    }
}



/*
    1. Codificar a população de indivíduos.
    2. Definir uma função de aptidão.
    3. Definir um método de seleção dos pais.
    4. Definir os operadores genéticos:
        • Recombinação (crossover)
        • Mutação
    5. Definir um critério de parada
*/