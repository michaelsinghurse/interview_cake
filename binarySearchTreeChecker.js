// binarySearchTreeChecker.js

const isValidBinarySearchNode = (node, min, max ) => {
  return node.value > min && node.value < max;
};

const nodeObjectFactory = (node, min, max) => (
  {
    node: node,
    ancestorMinValue: min,
    ancestorMaxValue: max,
  }
);

// Walk through the tree with a depth-first search (DFS). For each node,
// validate that it is greater than the min and less than the max of the nodes
// that are its ancestors. If it is not, short-circuit and return false. If you
// walk through the entire tree without short-circuiting, return true.
// O(n) time where n is the number of nodes
// O(n) space where n is the number of nodes
function isBinarySearchTree(root) {
  const nodeObjects = [];
  nodeObjects.push(nodeObjectFactory(root, -Infinity, Infinity));

  while (nodeObjects.length) {
    const nodeObject = nodeObjects.pop();
    const node = nodeObject.node;
    const min = nodeObject.ancestorMinValue;
    const max = nodeObject.ancestorMaxValue;

    if (!isValidBinarySearchNode(node, min, max)) {
      return false;
    }

    if (node.left) {
      nodeObjects.push(nodeObjectFactory(node.left, min, node.value));
    }
    if (node.right) {
      nodeObjects.push(nodeObjectFactory(node.right, node.value, max));
    }
  }

  return true;
}

// TESTS
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}

let desc = "example from binary search tree definition";
let fifty = new BinaryTreeNode(50);
let seventeen = fifty.insertLeft(17);
let twelve = seventeen.insertLeft(12);
let nine = twelve.insertLeft(9);
let fourteen = twelve.insertRight(14);
let twentythree = seventeen.insertRight(23);
let nineteen = twentythree.insertLeft(19);
let seventytwo = fifty.insertRight(72);
let fiftyfour = seventytwo.insertLeft(54);
let sixtyseven = fiftyfour.insertRight(67);
let seventysix = seventytwo.insertRight(76);
let expected = true;
assertAreEqual(desc, isBinarySearchTree(fifty), expected);

desc = "example from binary search tree definition... sub tree only";
assertAreEqual(desc, isBinarySearchTree(seventeen), expected);

desc = "example from binary search tree definition... now invalid";
fifty.value = 500; // change value from 50 to 500
expected = false;
assertAreEqual(desc, isBinarySearchTree(fifty), expected);

desc = "three nodes only. 1 is root and 2 and 3 are children."
let one = new BinaryTreeNode(1);
let two = one.insertLeft(2);
let three = one.insertRight(3);
expected = false;
assertAreEqual(desc, isBinarySearchTree(one), expected);

desc = "valid imbalanced tree";
one = new BinaryTreeNode(1);
two = one.insertRight(2);
three = two.insertRight(3);
expected = true;
assertAreEqual(desc, isBinarySearchTree(one), expected);

desc = "invalid imbalanced tree";
one = new BinaryTreeNode(1);
two = one.insertLeft(2);
three = two.insertLeft(3);
expected = false;
assertAreEqual(desc, isBinarySearchTree(one), expected);

desc = "gotcha example from problem";
fifty = new BinaryTreeNode(50);
let thirty = fifty.insertLeft(30);
let eighty = fifty.insertRight(80);
let twenty = thirty.insertLeft(20);
let sixty = thirty.insertRight(60); // this node is out of place
let seventy = eighty.insertLeft(70);
let ninety = eighty.insertRight(90);
expected = false;
assertAreEqual(desc, isBinarySearchTree(fifty), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}


