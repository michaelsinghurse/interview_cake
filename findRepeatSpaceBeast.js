// findRepeatSpaceBeast.js

// O(n) space. we walk through the node with loops four different time. each
// walk has worst case n steps. O(4n) = O(n) 
// O(1) space
function findDuplicate(array) {
  const n = array.length - 1;

  // make sure we're in the cycle 
  let currentPosition = n + 1;

  for (let i = 0; i < n; i++) {
    currentPosition = array[currentPosition - 1];
  }

  // count how many steps it takes to get back to the current position
  // in the cycle. this will tell us the length of the cycle
  const rememberedPositionInCycle = currentPosition;
  let currentPositionInCycle = array[currentPosition - 1];
  let nodesInCycle = 1;

  while (currentPositionInCycle !== rememberedPositionInCycle) {
    currentPositionInCycle = array[currentPositionInCycle - 1];
    nodesInCycle += 1;
  }

  // set up two pointers. one at the first node in the linked-list, which is
  // actually the last node in the array. the second at a node that is
  // nodesInCycle away from the first node
  let pointerStart = n + 1;
  let pointerAhead = n + 1;
  for (let i = 0; i < nodesInCycle; i++) {
    pointerAhead = array[pointerAhead - 1];
  }

  // now the nodes are a distance apart that is the same as the cycle length. we
  // merely have to move the start and ahead pointers by one step at a time until
  // they are both on the same node
  while (pointerStart !== pointerAhead) {
    pointerStart = array[pointerStart - 1];
    pointerAhead = array[pointerAhead - 1];
  }
  
  // could return either pointerStart or pointerAhead - the both point to same
  // node
  return pointerAhead;
}

// TESTS
let desc, input, expected;

desc = "three elements - one duplicate";
input = [2, 1, 1];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "four elements - one duplicate";
input = [2, 3, 1, 3];
expected = 3;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "five elements - one duplicate";
input = [4, 3, 1, 1, 2];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "six elements - one duplicate";
input = [3, 4, 2, 3, 1, 5];
expected = 3;
assertAreEqual(desc, findDuplicate(input), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

