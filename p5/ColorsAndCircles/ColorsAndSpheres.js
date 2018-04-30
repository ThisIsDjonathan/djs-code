
function setup() {
  // Create canvas
  createCanvas(640, 480);
}

function draw() {
  var sphere = new Sphere();
  sphere.show();
}


function generateSpheres(qty) {
  var spheres = [];
  for(i = 0; i < qty; i++) {
    spheres.push(new Sphere());
  }
  return spheres;
}


class Sphere {
  constructor (x, y, radius) {
    this.x = random(1, 600);
    this.y = random(1, 600);
    this.radius = random(10, 100);
    this.color = new Color();
    this.diameter = this.radius * 2
  }

  up(speed) {
    this.y -= speed;
  }

  down(speed) {
    this.y += speed;
  }

  show() {
    // Set color and stroke
    fill(this.color.r, this.color.g, this.color.b, this.color.a);
    strokeWeight(0);

    // Draw it on canvas
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  inBottom() {
    return this.y > height;
  }

  inTop() {
    return this.y < height;
  }

}

class Color {
  constructor() {
    this.r = random(1, 255);
    this.g = random(1, 255);
    this.b = random(1, 255);
    this.a = random(1, 255);
  }
}
