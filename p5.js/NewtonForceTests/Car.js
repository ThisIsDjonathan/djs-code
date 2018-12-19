
class Car {
  constructor () {
    this.color = color(70,130,180)
    this.pos = createVector(width/2, height/2)
    this.vel = createVector()
    this.acc = createVector()
  }

  applyForce(force) {
    this.acc.add(force)
  }

  applyRandomForce() {
    this.applyForce(p5.Vector.random2D())
  }

  update () {
    this.vel.add(this.acc)
    this.vel.limit(3)
    this.pos.add(this.vel)
    this.vel.mult(0)
    this.checkBoundaries()
  }

  show () {
    noStroke()
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, 10)
  }

  checkBoundaries () {
    let border = 10
    if (this.pos.x > width - border) {
      this.pos.x = width - border
    }
    
    if (this.pos.x < border) {
      this.pos.x = border
    }

    if (this.pos.y > height - border) {
      this.pos.y = height - border
    }
    
    if (this.pos.y < border) {
      this.pos.y = border
    }
  }
}