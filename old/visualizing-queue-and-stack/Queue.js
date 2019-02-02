
/**
 * A Queue is a linear structure which follows FIFO order in which the operations are performed.
 */
class Queue extends Base {
  
  constructor () {
    super();
  }

  /**
   * Add value to queue.
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
   * Remove and return the first value from queue.
   */
  pop () {
    if (this.size >= 0) {
      let value = this.data.shift()
      this.size = this.data.length
      return value
    }
  }

  /**
   * Return the first value from queue without removing it.
   */
  peek () {
    return this.data[0]
  }
}