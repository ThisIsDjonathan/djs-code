/**
 * A chromosome it's a set of genes. 
 * A gene it's the representation of genetic characteristic of chromosome.
 */
class Chromosome {
    constructor(id) {
        this.id = id;
        this.genes = new Array();
        this.initChromo();
    }


    /**
     * Initialize chromosome with a random path.
     */
    initChromo() {
        // aux vars
        var pct = 0.0;
        var step = 0.1;

        // Start position
        var s = {'x' : width / 2, 'y' : height / 2};

        // End position
        var e = {'x' : random(width), 'y' : random(height)};

		var distToDest = {"x" : e.x - s.x, "y" : e.y - s.y};

		while (pct < 1.0) {
			s.x += pct * distToDest.x;
			s.y += pct * distToDest.y;
            pct += step;
		} 
    }


}
