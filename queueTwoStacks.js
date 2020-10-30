// queueTwoStacks.js

// O(m) runtime if m is the number of enqueue and dequeue operations. Assume
// that the arrays used for stacks have O(1) push and pop time complexities.
class Queue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  enqueue(item) {
    this.inStack.push(item);
  }

  dequeue() {
    // the oldest item will be at the top of outStack if there are any items on
    // outStack.
    if (this.outStack.length) {
      return this.outStack.pop();
    }

    // if there are no items in outStack, then we need to build it first and
    // then remove the top item. but make sure there are items in inStack before
    // removing items from it.
    if (!this.inStack.length) {
      throw new Error("cannot dequeue from an empty queue");
    }

    while (this.inStack.length) {
      const item = this.inStack.pop();
      this.outStack.push(item);
    }

    return this.outStack.pop();
  }
}

// TESTS
let desc, actual, expected;

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

desc = "dequeue #1";
actual = queue.dequeue();
expected = 1;
assertAreEqual(desc, actual, expected);

desc = "dequeue #2";
actual = queue.dequeue();
expected = 2;
assertAreEqual(desc, actual, expected);

desc = "dequeue #3";
actual = queue.dequeue();
expected = 3;
assertAreEqual(desc, actual, expected);

desc = "dequeue on empty throws error";
actual = () => queue.dequeue();
assertThrowsError(desc, actual);

function assertAreEqual(desc, actual, expected) {
  logHeader(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  logHeader(desc);
  try {
    func();
    console.log("FAIL");
  } catch (_e) {
    console.log("PASS");
  }
}

function logHeader(desc) {
  console.log("------------------------------------------------------------");
  console.log(desc);
}


