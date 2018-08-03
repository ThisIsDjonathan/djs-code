class Palu extends Player {
    constructor(sprite, speed) {
        super(sprite, speed);
        this.inLove = false;
        this.timeTalking = 0;
    }

    /**
     * Level 1 stuff.
     */
    talkWithJohn() {
        if(this.sprite.overlap(computerSprite) && !this.inLove) {
            this.timeTalking = frameCount;
            if(this.timeTalking == nextFrameOn) {
                bar.animation.nextFrame();
                nextFrameOn = frameCount + 20;
                if(bar.animation.getFrame() == bar.animation.getLastFrame()) {
                    this.inLove = true;
                }
            }
        } else {
            nextFrameOn = frameCount + 20;
        }
   

    }

    /**
     * Level 2
     */
    takeAirplane() {
        console.log("level2");
    }
    
}