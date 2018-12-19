class Beacon {
  constructor (id, pos, color) {
    this.id = id
    this.pos = pos
    this.r = 5
    this.color = color
  }

  show () {
    push()
    noStroke()
    fill(beacon.color)
    ellipse(beacon.pos.x, beacon.pos.y, beacon.r * 10)
    pop()
  }
}