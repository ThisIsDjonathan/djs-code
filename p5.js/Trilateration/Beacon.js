class Beacon {
  constructor (id, pos, r, color) {
    this.id = id
    this.pos = pos
    this.r = r
    this.color = color
  }

  show () {
    push()
    noStroke()
    fill(beacon.color)
    ellipse(beacon.pos.x, beacon.pos.y, beacon.r * 10)
    pop();
  }
}