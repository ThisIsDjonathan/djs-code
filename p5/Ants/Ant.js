class Ant {
	constructor(id, x, y, home) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.beginX = x;
		this.beginY = y;
		this.home = home;
		this.stepSize = 5;
		this.pct = 0;
		this.step = 0.05;
		this.size = 10;
		this.life = 100;
		this.history = new Array();
		this.knownSugar = new Array();	
		this.hasSugar = false;	
		this.moving = false;
		this.isAtHome = false;
		this.dest = {"x" : width / 2, "y" : height / 2}; 
		this.origin = {"x" : width / 2, "y" : height / 2}; // Start on center
	}
	
	/**
	 * Shows ant on map. Control ant's color and size. When it has sugar, color and size are different.
	 */
	show() {
		// If ant has sugar, it has a diff color and size
		if(this.hasSugar && this.life > 0) {
			// Set a bigger size
			fill(183, 49, 49);
			this.size = 15;
			ellipse(this.x, this.y, this.size, this.size);
			
			// Draw a small piece of sugar
			fill(230, 230, 230);
			
			ellipse(this.x, this.y, this.size * 0.3, this.size * 0.3);
		} else if(!this.hasSugar && this.life > 0) {
			fill(183, 49, 49);
			this.size = 10;
			ellipse(this.x, this.y, this.size, this.size);
		}
	}

	/**
	 * Move ant to xy position.
	 * @param pos - destination xy. 
	 */
	moveTo(pos) {
		// Set param dest as our destiny
		var endX = pos.x;
		var endY = pos.y;

		// Calculate distance of actual position to dest pos 
		var xDistToDest = endX - this.x;
		var yDistToDest = endY - this.y;

		// Add and step to travel percent
		this.pct += this.step;
		
		this.moving = true;

		// If travel percent isn't 100%, move it	
		if (this.pct < 1.0) {
			this.x = this.x + this.pct * xDistToDest;
			this.y = this.y + this.pct * yDistToDest;
		} else {
			this.moving = false;
		}

		//this.history.push(this.x, this.y);

	}

	/**
	 * Ant will travel to random points on map to try find a sugar. 
	 * If ant finalize a travel without find a sugar, it will try again goint to a new random position.
	 * @sugars - This function receives and array with all sugars on map.
	 */
	searchSugar(sugars) {
		// Set end position
		var endPos = {"x" : this.dest.x, "y" : this.dest.y};

		// Calculate distance between actual position and destination 
		var distToDest = {"x" : endPos.x - this.x, "y" : endPos.y - this.y};

		// Add and step to travel percent
		this.pct += this.step;
		
		this.moving = true;

		// If travel percent isn't 100%, move it	
		if (this.pct < 1.0) {
			this.x += this.pct * distToDest.x;
			this.y += this.pct * distToDest.y;
			
			// For each step, check if a sugar was found
			if(this.checkSugarColision(sugars)) {
				console.log("Ant " + this.id + " has founded a sugar!");				
				
				// Set hasSugar as true
				this.hasSugar = true;
				
				// Save sugar position
				var sugarPos = {"x" : this.x, "y" : this.y};
				this.knownSugar.push(sugarPos);
			} 
			// If sugar wasn't found, ant's life get shorter 
			else {
				this.life -= 0.5;
			}
		// Else, ant has finished travel and without found a sugar, try again
		} else {
			this.moving = false;
			this.dest = this.getNewDest();
		}
		
		// Add travel end points to history
		var toHist = {"x" : this.x, "y" : this.y};		
		this.history.push(toHist);

	}

	/**
	 * Go to home setting endX and endY as home xy position.
	 * If it's already at home, stay there and shake!
	 */
	goHome() {
		if(!this.isAtHome) {
			this.isAtHome = true;
			this.moveTo(this.home);
		} else {
			var stayHome = {"x" : random(this.home.x - this.home.radius + 10, this.home.x + this.home.radius - 10)
			              , "y" : random(this.home.y - this.home.radius + 10, this.home.y + this.home.radius - 10)};
			this.moveTo(stayHome);

		}
	}

	/**
	 * Get a random xy destination.
	 */
	getNewDest() {
		return {'x' : random(width), 'y' : random(height)};
	}

	/**
	 * Verify if ant its in the same position of a sugar.
	 * @param sugars - This function receives and array with all sugars on map.
	 * @returns true when ant has founded a sugar. 
	 */
	checkSugarColision(sugars) {
		// Save ant position to analyze on for statement
		var x = this.x;
		var y = this.y;

		// Loop on sugars to check colision
		for(var i = 0; i < sugars.length; i++) {
			var d = dist(x, y, sugars[i].x, sugars[i].y);
			
			if(d <= sugars[i].size / 2) {
				sugars[i].takePiece();
				return true;
			}
		}

		return false;	
	}

}
