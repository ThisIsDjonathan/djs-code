class SpaceDust {
	constructor(spawnPos, spawnVel) {
		if (spawnPos != 0) {
			this.pos = spawnPos;
		} else {
			this.pos = createVector(random(width), random(height));
		}

		if (spawnVel != 0) {
			this.velocity = spawnVel;
		} else {
			this.velocity = createVector(random(-START_VELOCITY, START_VELOCITY), 
									 	 random(-START_VELOCITY, START_VELOCITY));
		}
	}

	update() {
		// Collision
		for (let i = 0; i < spaceDust.length; i++) {
			let xDist = Math.abs(this.pos.x - spaceDust[i].pos.x);
			let yDist = Math.abs(this.pos.y - spaceDust[i].pos.y);
			
			if (xDist + yDist < DUST_SIZE) {
				this.velocity.x = (this.velocity.x + spaceDust[i].velocity.x) / 2;
				this.velocity.y = (this.velocity.y + spaceDust[i].velocity.y) / 2;
			}
		}

		// Gravity
		let dist = Math.sqrt(this.pos.x * this.pos.x + this.pos.y * this.pos.y);
		let force = GRAVITY / dist * dist;
		let dir = 2 * Math.PI - Math.atan((this.pos.y - starPos.y) / (this.pos.x - starPos.x));

		if (this.pos.x >= starPos.x) {
			this.velocity.x -= Math.cos(dir) * force;
			this.velocity.y += Math.sin(dir) * force;
		} else {
			this.velocity.x += Math.cos(dir) * force;
			this.velocity.y -= Math.sin(dir) * force;
		}

		// Move and draw
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
		rect(this.pos.x + camPos.x, this.pos.y + camPos.y, DUST_SIZE, DUST_SIZE);
	}
}
