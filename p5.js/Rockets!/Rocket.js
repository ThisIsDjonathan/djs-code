
class Rocket { 
  constructor () {
    this.mass = 0.5
    this.size = 10
    this.pos = createVector(width/2, height-50)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.color = color(155, 200, 215)
    this.speedLimit = 2
    this.direction = createVector(0, 0)
  }

  show () {
    noStroke()
    fill(this.color)
    rect(this.pos.x-5, this.pos.y, this.size, this.size*3)
    //ellipse(this.pos.x, this.pos.y, this.size)
  }

  update () {
    this.checkEdges()
    
    // Velocity changes according to acceleration
    this.vel.add(this.acc)
    this.vel.limit(this.speedLimit)
    
    // Position changes by velocity
    this.pos.add(this.vel)
    
    // Clear acceleration each frame
    this.acc.mult(0)

  }

  // Newton's 2nd law: F = M * A or A = F / M
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acc.add(f)
  }

  /**
   * 
   */
  checkEdges() {
    if (this.pos.y >= height - this.size*3) {
      this.pos.y = height - this.size*3
    }
  }


}