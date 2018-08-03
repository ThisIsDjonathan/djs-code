class GameObject {
    constructor(sprite, speed) {
        this.sprite = sprite;
        this.position = sprite.position;
        this.speed = speed ? speed : 0;
        this.animation = sprite.animation;
    }

    show() {
        drawSprite(this.sprite);
    }
}