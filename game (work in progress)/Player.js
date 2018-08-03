class Player {
    constructor(sprite, speed) {
        this.sprite = sprite;
        this.position = sprite.position;
        this.speed = speed;
        this.level = 1;
    }

    show() {
        drawSprite(this.sprite);
    }

    update() {
        // if mouse is to right
        if(mouseX > this.sprite.position.x + 10 && mouseX) {
            this.sprite.changeAnimation('walk');
            this.sprite.mirrorX(1);
            this.move("->");
        }
        //else if mouse is to the left
        else if(mouseX < this.sprite.position.x - 10) {
            this.sprite.changeAnimation('walk');
            this.sprite.mirrorX(-1);
            this.move("<-");
        }
        // else don't move
        else {
            this.sprite.mirrorX(1);
            this.sprite.changeAnimation('stand');
            this.move();
        }

    }

    move(direction) {
        if (direction == "->")  this.sprite.velocity.x = this.speed;
        if (direction == "<-")  this.sprite.velocity.x = -this.speed;
        if (!direction) this.sprite.velocity.x = 0;            
    }

}