class Palu extends Player {
    constructor(sprite, speed) {
        super(sprite, speed);
        this.inLove = false;
        this.timeTalking = 0;
        this.counter = new Counter(14, ()=> {
            bar.animation.nextFrame();
        } , () => {
                bar.animation.nextFrame();
                bar.animation.getLastFrame();
                this.inLove = true;
            }
        );
    }

    /**
     * Level 1 stuff.
     */
    talkWithJohn() {
       	// Handle bar
        bar.show();
        bar.animation.stop();

        // Draw palu's computer
        computer.show();

        if(this.sprite.overlap(computer.sprite) && !this.inLove) {
            this.counter.go();
            
/*            
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
*/       
        }
    }

    /**
     * Level 2
     */
    takeAirplane() {
        // Show and update airplane
        airplane.show();
        airplane.position.x = mouseX;
        airplane.position.y = mouseY;

        palu.position.x = airplane.position.x;
        palu.position.y = airplane.position.y - 10;
        
        // Hide computer and love bar
        bar.isVisible = false;
        computer.isVisible = false;
        console.log("level2");
    }
    
}