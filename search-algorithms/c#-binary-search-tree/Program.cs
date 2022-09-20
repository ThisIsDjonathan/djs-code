using static BinarySearchTree;
using static Node;

var binarySearchTree = new BinarySearchTree();

var node1 = new Node(5);
var node2 = new Node(3);
var node3 = new Node(6);
var node4 = new Node(2);

binarySearchTree.Insert(node1);
binarySearchTree.Insert(node2);
binarySearchTree.Insert(node3);
binarySearchTree.Insert(node4);
binarySearchTree.Print();

Node nodeToFind = binarySearchTree.Find(5);
nodeToFind.Print();

