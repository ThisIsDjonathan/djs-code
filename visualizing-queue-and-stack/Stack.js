
/**
 * A stack is a container of objects that are inserted and removed 
 * according to the last-in first-out (LIFO) principle.
 */
class Stack extends Base {
    constructor () {
        super();
    }

    /**
     * Add value to stack.
     */
    push (value) {
        if (!this.isFull()) {
            if (!this.isEmpty(value)) {
                if (this.isNumber(value)) {
                this.data.push(value);
                this.size = this.data.length;
                }
            }
        }
    }

    /**
     * Remove and return value from stack.
     */
    pop () {
        if (this.size >= 0) {
            let value = this.data.pop()
            this.size = this.data.length
            return value
        }
    }

    /**
     * Return the top value from stack without removing it.
     */
    peek () {
        return this.data[this.size - 1]
    }
}

