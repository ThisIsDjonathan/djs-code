let cars = []

function setup() {
  createCanvas(600, 600)

  for (let i = 0; i < 100; i++) {
    cars.push(new Car())
  }
}

function draw() {
  background(50)
  for (let car of cars) {
    if (mouseIsPressed) {
      let force = createVector(mouseX, mouseY)
      force.sub(car.pos)
      force.setMag(map(dist(car.pos.x, car.pos.y, mouseX, mouseY), 0, dist(0, 0, width, height), 0.0, 0.5))
      car.applyForce(force)
    } else {
      car.applyRandomForce()
    }
    car.update()
    car.show()
  }
}

