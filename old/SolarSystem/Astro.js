class Astro {
    constructor (name, position, texture, radius, angle, speed, astros, rotationVector) {
        this.name = name;
        this.position = position;
        this.diameter = radius * 2;
        this.circumference = this.diameter * PI;
        this.texture = texture;
        this.angle = angle;
        this.speed = speed;
        this.scl = 10;
        this.radius = radius * this.scl;
        this.astros = astros;

        this.rotationVector = this.position.cross(rotationVector);
    }

    show() {

        push();
        for(let i = 0; i < this.astros.length; i++) {
            rotate(this.angle, this.rotationVector);
        }

        noStroke();
        texture(this.texture);
        translate(this.position.x, this.position.y);
        this.orbit();
        sphere(this.radius);
        pop();
    }

    orbit() {
        this.angle += this.speed;
        rotate(this.angle);

        for(let i = 0; i < this.astros.length; i++) {
            this.astros[i].orbit();
        }
    }


}