class GameObject {
    constructor(sprite, speed) {
        this.sprite = sprite;
        this.position = sprite.position;
        this.speed = speed ? speed : 0;
        this.animation = sprite.animation;
        this.isVisible = true;
    }

    show() {
        if(this.isVisible)
            drawSprite(this.sprite);
    }

   
}