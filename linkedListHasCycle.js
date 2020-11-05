// linkedListHasCycle.js

// Function determines whether a singly-linked list contains a cycle.
// O(n) time complexity where n is the number of nodes in the list
// O(1) space complexity
function containsCycle(node) {
  let fastRunner = node;
  let slowRunner = node;
  
  while (true) {
    for (let steps = 0; steps < 2; steps += 1) {
      fastRunner = fastRunner.next;
      if (fastRunner === slowRunner) {
        return true;
      }
      if (fastRunner === null) {
        return false;
      }
    }
    slowRunner = slowRunner.next;
  }
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// TESTS
let desc, actual, expected;
let a, b, c, d, e;

desc = "linked list with only one node";
a = new LinkedListNode("a");

actual = containsCycle(a);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "linked list with two nodes - pass in first";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
a.next = b;

actual = containsCycle(a);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "linked list with two nodes - pass in second";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
a.next = b;

actual = containsCycle(b);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "linked list with three nodes - contains cycle";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");
a.next = b;
b.next = c;
c.next = a;

actual = containsCycle(a);
expected = true;
assertAreEqual(desc, actual, expected);

desc = "linked list with four nodes - no cycle";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");
d = new LinkedListNode("d");
a.next = b;
b.next = c;
c.next = d;

actual = containsCycle(a);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "linked list with four nodes - contains cycle";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");
d = new LinkedListNode("d");
a.next = b;
b.next = c;
c.next = d;
d.next = b;

actual = containsCycle(a);
expected = true;
assertAreEqual(desc, actual, expected);


function assertAreEqual(desc, actual, expected) {
  console.log("-----------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !=== ${expected}`);
  }
}
