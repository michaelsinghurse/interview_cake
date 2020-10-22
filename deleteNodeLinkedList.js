/*
 * Problem
 * - write a function
 * - input: 
 *   - object (instanceof LinkedListNode)
 *   - validate input?
 * - output: 
 *   - boolean for successful?
 * - requirements:
 *   - delete the node passed in - remove it from the list
 *   - should I delete the object or just remove it from the list? remove only 
 *
 * Example
 *  - deleteNode(b);    // true
 *  - a.next === c;     // true
 *  - deleteNode(c);    // true
 *  - a.next === null;  // true
 *
 * Data Structure
 * - none required
 *
 * Algorithm
 * - validate that input is an instance of LinkedListNode. If not return false;
 * - find which node points to "b"
 * - change the value of that node's next property to point to the node b points
 *   to
 * - return true
 */

function deleteNode(node) {
  if (!(node instanceof LinkedListNode)) return false;
  const nextValue = node.next.value;
  const nextNext = node.next.next;
  node.value = nextValue;
  node.next = nextNext;
  return true;  
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const a = new LinkedListNode("A");
const b = new LinkedListNode("B");
const c = new LinkedListNode("C");

a.next = b;
b.next = c;

/*
deleteNode(b);
console.log(a);
console.log(b);
console.log(c);
*/
// All should return `true`
console.log(deleteNode({}) === false);
console.log(deleteNode(b) === true);
console.log(a.next !== b);
console.log(a.next.value !== "B");
console.log(a.next === c);
console.log(a.next.value === "C");
