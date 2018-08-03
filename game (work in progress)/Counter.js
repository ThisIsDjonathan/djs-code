class Counter {
    constructor(target) {
        this.target = target;
        this.time = 0;
        this.steps = 1;
        this.next = 100;
        this.running = false;
        this.done = false;
    }

    go() {
        this.running = true;
        this.update();
    }

    update() {
        if(this.running) {
            if(this.time >= this.next) {
                if(this.steps <= this.target) {
                    console.log("STEP " + this.steps);
                    this.next = this.time + floor(frameRate() + (frameRate() * 0.6));
                    this.steps++;
                } else {
                    if(!this.done) {
                        console.log("DONE");
                        this.done = true;
                        this.stop;
                    }
                    
                }
            } else {
                this.time++;
            }
        }
    }

    stop() {
        this.running = false;
    }

    restart() {
        this.time = 0;
        this.next = 100;
        this.steps = 0;
        this.running = true;
    }

    setTarget(target) {
        this.tager = target;
    }

    
}