let stack, queue;
let inputValue, popButton, pushButton, peekButton;
let lastSize, lastQueueVal, lastStackVal;
const STEP = 50, RECT_SIZE = 50


function setup() {
  createCanvas(450, 400);
  background(51);

  textSize(16);
  textAlign(CENTER);
  rectMode(CENTER);
  
  stack = new Stack;
  queue = new Queue;
  lastSize = stack.size;

  inputValue = createInput();
  inputValue.position(20, 20);

  pushButton = createButton('PUSH');
  pushButton.position(inputValue.x + inputValue.width + 10, 20);
  pushButton.mousePressed(addValue);

  popButton = createButton('POP');
  popButton.position(pushButton.x + pushButton.width + 10, pushButton.y);
  popButton.mousePressed(removeValue);
}

function addValue() {
  let value = inputValue.value();
  inputValue.value('');
  stack.push(value);
  queue.push(value);
}

function removeValue() {
  lastStackVal = stack.pop();
  lastQueueVal = queue.pop();
}

function show() {
  push();
  fill(255);
  
  textAlign(CENTER);
  text('Stack', width*0.3, height-8);
  text('Queue', width*0.7, height-8);

  textAlign(LEFT);
  
  if (stack.size > 0 && queue.size > 0) {
    text('Next value from stack: ' + stack.peek(), inputValue.x + 20, inputValue.y + inputValue.height + 20);
    text('Next value from queue: ' + queue.peek(), inputValue.x + 20, inputValue.y + inputValue.height + 40);
  }

  if (lastQueueVal != undefined && lastStackVal != undefined) {
    text('Last value removed from stack: ' + lastStackVal, inputValue.x + 20, inputValue.y + inputValue.height + 60);
    text('Last value removed from queue: ' + lastQueueVal, inputValue.x + 20, inputValue.y + inputValue.height + 80);
  }

  pop();
}

function draw() {
  if (stack.size != lastSize) {
    background(51);
    

    drawStack();
    drawQueue();
    show();
    lastSize = stack.size;
  }
}

function drawStack() {
  let prevPos = createVector(width*0.3, height + STEP)
  let actualPos = createVector(width*0.3, height + STEP)

  for (value of stack.data) {
    actualPos.y = prevPos.y - STEP
    prevPos = actualPos

    stroke(1)
    rect(actualPos.x, actualPos.y - STEP, RECT_SIZE, RECT_SIZE)
    text(value, actualPos.x, actualPos.y - RECT_SIZE * 0.85)
  }
}

function drawQueue() {
  let prevPos = createVector(width*0.7, height + STEP)
  let actualPos = createVector(width*0.7, height + STEP)

  for (value of queue.data) {
    actualPos.y = prevPos.y - STEP
    prevPos = actualPos

    stroke(1)
    rect(actualPos.x, actualPos.y - STEP, RECT_SIZE, RECT_SIZE)
    text(value, actualPos.x, actualPos.y - RECT_SIZE * 0.85)
  }
}