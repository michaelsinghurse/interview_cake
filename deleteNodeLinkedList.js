// deleteNodeLinkedList.js

// O(1) space
// O(1) time
// This method will work from all nodes except the tail. Passing in a tail
// raises an error. It essentially turns the node passed in into a clone of its
// next node. It change it's value and next properties to that of that next node
// in the list. The next node is therefore left dangling.
function deleteNode(node) {
  if (node.next) {
    node.value = node.next.value;
    node.next = node.next.next;
  } else {
    throw new Error("cannot delete the last node in the list");
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

desc = "three nodes in list, delete the head";
let a = new LinkedListNode("a");
let b = new LinkedListNode("b");
let c = new LinkedListNode("c");

a.next = b;
b.next = c;

deleteNode(a);
actual = a.value;
expected = "b";
assertAreEqualObjects(desc, actual, expected);

desc = "three nodes in list, delete the middle";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");

a.next = b;
b.next = c;

deleteNode(b);
actual = a.next.value;
expected = "c";
assertAreEqualObjects(desc, actual, expected);

desc = "three nodes in list, delete the tail";
a = new LinkedListNode("a");
b = new LinkedListNode("b");
c = new LinkedListNode("c");

a.next = b;
b.next = c;

actual = () => deleteNode(c);
assertThrowsError(desc, actual);

function assertAreEqualObjects(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
  }
}

function assertThrowsError(desc, func) {
  console.log("-------------------------------------------------------------");
  console.log(desc);

  try {
    func();
    console.log("FAIL");
  } catch (_error) {
    console.log("PASS");
  }
}


