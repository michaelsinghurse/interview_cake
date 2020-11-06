// reverseLinkedList.js

// Reverse a linked list in place. Takes a reference to the head node and 
// returns a reference to the new head, which was formally the tail.
// O(n) time complexity where n is the number of nodes in the list
// O(1) space complexity
function reverseLinkedList(head) {
  let previousNode;
  let currentNode = null;
  let nextNode = head;

  while (nextNode) {
    previousNode = currentNode;
    currentNode = nextNode;
    nextNode = currentNode.next;

    currentNode.next = previousNode;
  }

  return currentNode;
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// TESTS
let desc, actual, expected;
let a, b, c, d;

desc = "linked list with only one node returns same node";
a = new LinkedListNode("a");
actual = reverseLinkedList(a);
expected = a;
assertAreEqual(desc, actual, expected);

desc = "linked list with three nodes returns last node";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");
a.next = b;
b.next = c;

actual = reverseLinkedList(a);
expected = c;
assertAreEqual(desc, actual, expected);

desc = "new head node now points to second node";
actual = c.next;
expected = b;
assertAreEqual(desc, actual, expected);

desc = "second node now points to the first";
actual = b.next;
expected = a;
assertAreEqual(desc, actual, expected);

desc = "first node now has has null for next";
actual = a.next;
expected = null;
assertAreEqual(desc, actual, expected);

function assertAreEqual(desc, actual, expected) {
  console.log("-------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    const actualValue = actual ? actual.value : actual;
    const expectedValue = expected ? expected.value : expected;

    console.log(`FAIL ... ${actualValue} !== ${expectedValue}`);
  }
}


