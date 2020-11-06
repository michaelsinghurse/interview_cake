// kthLastNodeLinkedList.js

// Returns a reference to the kth from last node in a linked list. 
// For example, if k is 1, then a reference to the tail is returned. If k is 2, 
// then a reference to the second to last node is returned. If k is bigger than 
// the length of the list, then null is returned.
// O(n) time complexity where n is the number of nodes in the list.
// O(1) space complexity
function kthToLastNode(k, headNode) {
  // step 1: find the length of the linked list
  let listLength = 0;
  let currentNode = headNode;

  while (currentNode) {
    listLength += 1;
    currentNode = currentNode.next;
  }
  
  // step 2: find the node at index of length minus k
  const indexKthToLastNode = listLength - k;
  let referenceKthToLastNode = null;

  for (let index = 0; index <= indexKthToLastNode; index += 1) {
    if (index === 0) {
      referenceKthToLastNode = headNode;
    } else {
      referenceKthToLastNode = referenceKthToLastNode.next;
    }
  }

  return referenceKthToLastNode;
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// TESTS
let desc, actual, expected;

const a = new LinkedListNode("a");
const b = new LinkedListNode("b");
const c = new LinkedListNode("c");
const d = new LinkedListNode("d");
const e = new LinkedListNode("e");

a.next = b;
b.next = c;
c.next = d;
d.next = e;

desc = "example provided";
actual = kthToLastNode(2, a);
expected = d;
assertAreEqual(desc, actual, expected);

desc = "if k is 1, the tail is returned";
actual = kthToLastNode(1, a);
expected = e;
assertAreEqual(desc, actual, expected);

desc = "if k is the length of the list, the head is returned";
actual = kthToLastNode(5, a);
expected = a;
assertAreEqual(desc, actual, expected);

desc = "if k is bigger than the length of the list, null is returned";
actual = kthToLastNode(6, a);
expected = null
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


