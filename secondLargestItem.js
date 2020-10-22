

// Use depth-first-search to find the largest node. The second largest will
// either be the node's left child, if it has one, or the node's parent 
// O(1) space
// O(n) time where n is the number of nodes
// ... worst case time is an unbalanced binary search tree where each
// node (except the rightmost node) only has one right child.
function findSecondLargestItem(root) {
  if (!root.left && !root.right) {
    throw new Error("Root node must have at least one child.");
  }
  
  // node is the node we are inspecting to see if its the rightmost.
  // we also need to keep a reference to the node's parent because the parent 
  // node may be the second greatest.
  let node = root;
  let parent = null;

  while (true) {
    if (node.right) {

      // if node has a right child, node is not the rightmost. inspect its right 
      // child and it becomes the parent node 
      parent = node;
      node = node.right;

    } else {
      
      // node has no right child. it is the rightmost node, and therefore has
      // the greatest value. the second greatest value is either its left child
      // if it has one, or its parent
      if (node.left) {
        return node.left;
      } else {
        return parent; 
      }
    }
  }
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

let desc = "example of binary search tree given in problem";
let fifty = new BinaryTreeNode(50);
let seventeen = fifty.insertLeft(17);
let seventytwo = fifty.insertRight(72);
let twelve = seventeen.insertLeft(12);
let twentythree = seventeen.insertRight(23);
let fiftyfour = seventytwo.insertLeft(54);
let seventysix = seventytwo.insertRight(76);
let nine = twelve.insertLeft(9);
let fourteen = twelve.insertRight(14);
let nineteen = twentythree.insertLeft(19);
let sixtyseven = fiftyfour.insertRight(67);
let expected = seventytwo;
assertAreEqualObjects(desc, findSecondLargestItem(fifty), expected);

desc = "example given, but pass in a left subtree";
expected = twelve;
assertAreEqualObjects(desc, findSecondLargestItem(twelve), expected);

desc = "example given, but pass in a right subtree";
expected = seventytwo;
assertAreEqualObjects(desc, findSecondLargestItem(seventytwo), expected);

desc = "root node only has one left child";
expected = nineteen;
assertAreEqualObjects(desc, findSecondLargestItem(twentythree), expected);

desc = "root node only has one right child";
expected = fiftyfour;
assertAreEqualObjects(desc, findSecondLargestItem(fiftyfour), expected);

desc = "a root node with no children throws an error";
assertThrowsError(desc, () => findSecondLargestItem(sixtyseven));

function assertAreEqualObjects(desc, actual = {}, expected) {
  console.log("-----------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual.value} !== ${expected.value}`);
  }
}

function assertThrowsError(desc, func) {
  console.log("-----------------------------------------------------------");
  console.log(desc);
  
  try {
    func();
    console.log("FAIL");
  } catch (_error) {
    console.log("PASS");
  }
}
