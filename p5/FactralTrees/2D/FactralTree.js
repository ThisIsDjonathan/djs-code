/**
 * Based on Coding Train
 * https://www.youtube.com/watch?v=fcdNSZ9IzJM&t=187s&ab_channel=TheCodingTrain
 */

let tree;
let root;

function setup() {  
  createCanvas(640, 480);
  
  // Create an empty tree
  tree = new Tree();

  // Set point A and B of tree's root
  let pointA = createVector(width / 2, height);
  let pointB = createVector(width / 2, height - 100);
  
  // Creat root
  root = new Branch(pointA, pointB);

  // Add root to tree
  tree.addBranch(root);
}


function draw() {
  background(50);

  tree.show();  
}

function mousePressed() {
  if(tree.branches.length < 100) {
    tree.branches.forEach(function(b) {
      let newB = b.branch();
      tree.addBranches(newB);  
    });
  }
}

