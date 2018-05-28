let tree;

function setup() {  
  createCanvas(640, 480);
  tree = new Tree();

  let pointA = createVector(width / 2, height);
  let pointB = createVector(width / 2, height - 100);
  let root = new Branch(pointA, pointB);


  tree.addBranch(root);
  let newBranch = root.branch();

  tree.addBranch(newBranch);

}


function draw() {
  background(50);

  tree.show();  
}

