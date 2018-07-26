class Astro {
    constructor (position, texture, radius, angle, speed) {
        this.position = position;
        this.diameter = radius * 2;
        this.circumference = this.diameter * PI;
        this.texture = texture;
        this.angle = angle;
        this.speed = speed;
        this.scl = 10;
        this.radius = radius * this.scl;

        // If the astro it's on center (its the sun) does not cross to rotate
        if(this.position.x == 0 && this.position.y == 0) {
            this.rotationVector = createVector(10, this.angle * this.speed, 23);
        } else {
            this.rotationVector = this.position.cross(createVector(1, 0, 1));
        }
    }

    show() {
        push();
        texture(this.texture);
        translate(this.position.x, this.position.y);
        rotate(this.angle * this.speed, this.rotationVector);
        sphere(this.radius);
        pop();

        stroke(255,0,0);
        strokeWeight(4);
        line(0, 0, 0, this.position.x, this.position.y, this.position.z);
        line(0, 0, 0, this.rotationVector.x, this.rotationVector.y, this.rotationVector.z);
        
        this.angle += this.speed;

    }
}