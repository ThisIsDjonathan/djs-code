
class Base {
  constructor () {
    this.data = []
    this.size = this.data.length
    this.maxSize = 5
  }

  isFull () {
    return this.size >= this.maxSize;
  }
  
  isEmpty (value) {
    return value == undefined || value == "";
  }

  isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}

