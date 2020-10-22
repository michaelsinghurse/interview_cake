// balancedBinaryTree.js

const isLeafNode = (node) => !node.left && !node.right;

function getLevelsWithLeafNodes(root) {
  function callbackFunction(node, level) {
    if (isLeafNode(node)) {
      levelsWithLeafNodes.push(level);
    }
  }

  function walk(node, level, callback) {
    callback(node, level);

    if (node.left) {
      walk(node.left, level + 1, callback);
    }
    if (node.right) {
      walk(node.right, level + 1, callback);
    }
  }

  const levelsWithLeafNodes = [];
  walk(root, 1, callbackFunction);
  
  return levelsWithLeafNodes;
}

// My Solution - Recursive DFS. Produce an array with all the levels that
// have leaf nodes. Find the max and min levels in the array. Test whether
// the difference between the min and max is less than or equal to 1.
// O(n) space because of the call stack on the recursion 
// O(k + n) time where n is the number of nodes
function isSuperbalanced1(root) {
  const levelsWithLeafNodes = getLevelsWithLeafNodes(root);

  let minLevel = levelsWithLeafNodes[0];
  let maxLevel = levelsWithLeafNodes[0];

  for (let index = 1; index < levelsWithLeafNodes.length; index += 1) {
    const level = levelsWithLeafNodes[index];

    minLevel = Math.min(minLevel, level);
    maxLevel = Math.max(maxLevel, level);
  }

  return maxLevel - minLevel <= 1;
}

// Interview Cake Solution
// Iterative DFS. Examine each node in a stack and test whether its a leaf node.
// If it is, add it's level to an array that tracks levels. Check the levels
// array each time you add to it to make sure the difference between two levels 
// doesn't exceed 1. If it does, short-circuit and return false. If you examine
// all the nodes and haven't return false yet, return true;
// O(n) Space
// O(n) Time
function isSuperbalanced(root) {
  // keep track of all the unique levels with leaf nodes
  const levels = [];

  // array acts as a stack of nodes to examine
  const nodes = [];

  // start by pushing root node on stack
  nodes.push([root, 1]);

  // loop while there are still nodes to examine in the stack
  while (nodes.length) {
    const nodePair = nodes.pop();
    const node = nodePair[0];
    const level = nodePair[1];
    
    if (isLeafNode(node)) {
      if (!levels.includes(level)) {
        levels.push(level);
      }

      // if there are more than two unique levels, then the difference must
      // be greater than 1. if there are exactly two unique levels, then
      // see if the difference is greater than 1. if yes in either case,
      // short circuit and return false.
      if (
        (levels.length > 2) ||
        (levels.length === 2 && Math.abs(levels[0] - levels[1]) > 1)
      ) {
        return false;
      }
    } else {
    
      // if the node is not a leaf node, push its child(ren) on the stack to
      // examine
      if (node.left) {
        nodes.push([node.left, level + 1]);
      }
      if (node.right) {
        nodes.push([node.right, level + 1]);
      }
    }
  }

  // if we have examined all the nodes in the stack and did not short-circuit
  // and return false, then we know that the tree is super balanced. 
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

let desc = "tree with only one node";
let root = new BinaryTreeNode("L1N1");
let expected = true;
assertAreEqual(desc, isSuperbalanced(root), expected);

desc = "perfect binary tree with two levels";
root = new BinaryTreeNode("L1N1");
let l2n1 = root.insertLeft("L2N1");
let l2n2 = root.insertRight("L2N2");
expected = true;
assertAreEqual(desc, isSuperbalanced(root), expected);

desc = "tree with three levels, only one node on third level";
root = new BinaryTreeNode("L1N1");
l2n1 = root.insertLeft("L2N1");
l2n2 = root.insertRight("L2N2");
let l3n1 = l2n1.insertLeft("L3N1");
expected = true;
assertAreEqual(desc, isSuperbalanced(root), expected);

desc = "tree with four levels, only one node on third and fourth levels";
root = new BinaryTreeNode("L1N1");
l2n1 = root.insertLeft("L2N1");
l2n2 = root.insertRight("L2N2");
l3n1 = l2n1.insertLeft("L3N1");
let l4n1 = l3n1.insertLeft("L4N1");
expected = false;
assertAreEqual(desc, isSuperbalanced(root), expected);

desc = "perfect binary tree with three levels";
root = new BinaryTreeNode("L1N1");
l2n1 = root.insertLeft("L2N1");
l2n2 = root.insertRight("L2N2");
l3n1 = l2n1.insertLeft("L3N1");
let l3n2 = l2n1.insertRight("L3N2");
let l3n3 = l2n2.insertLeft("L3N3");
let l3n4 = l2n2.insertRight("L3N4");
expected = true;
assertAreEqual(desc, isSuperbalanced(root), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
}
