class Planet {
    constructor (position, texture, radius, angle, speed) {
        this.position = position;
        this.radius = radius;
        this.diameter = this.radius * 2;
        this.circumference = this.diameter * PI;
        this.texture = texture;
        this.angle = angle;
        this.speed = speed;
    }


    show() {
        push();
        texture(this.texture);
        translate(this.position.x, this.position.y);
        rotateZ(23);
        rotateX(10);
        rotateY(this.angle * this.speed);
        sphere(this.radius);
        pop();
        
        this.angle += this.speed;

    }


}