// largestStack.js

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (!this.items.length) return null;
    return this.items.pop();
  }

  peek() {
    if (!this.items.length) return null;
    return this.items[this.items.length - 1];
  }
}

class MaxStack {
  constructor() {
    this.stack = new Stack();
    this.maxesStack = new Stack();
  }

  push(item) {
    this.stack.push(item);
    if (this.maxesStack.peek() === null || item >= this.maxesStack.peek()) {
      this.maxesStack.push(item);
    }
  }

  pop() {
    const item = this.stack.pop();
    if (item === this.maxesStack.peek()) {
      this.maxesStack.pop();
    }
    return item;
  }

  getMax() {
    return this.maxesStack.peek();
  }
}

// TESTS
let desc, stack, actual, expected;

desc = "stack with three numbers - 1, 2, 3";
stack = new MaxStack();
stack.push(1);
stack.push(2);
stack.push(3);
actual = stack.getMax();
expected = 3;
assertAreEqual(desc, actual, expected);

desc = "stack with negative numbers";
stack = new MaxStack();
stack.push(-1);
stack.push(-5);
stack.push(-2);
actual = stack.getMax();
expected = -1;
assertAreEqual(desc, actual, expected);

desc = "stack contains all the same numbers";
stack = new MaxStack();
stack.push(3);
stack.push(3);
stack.push(3);
actual = stack.getMax();
expected = 3;
assertAreEqual(desc, actual, expected);

desc = "stack contains no numbers";
stack = new MaxStack();
actual = stack.getMax();
expected = null;
assertAreEqual(desc, actual, expected);

desc = "stack contains one number only";
stack = new MaxStack();
stack.push(12345);
actual = stack.getMax();
expected = 12345;
assertAreEqual(desc, actual, expected);

desc = "push numbers then pop a few then check getMax";
stack = new MaxStack();
stack.push(1);
stack.push(3);
stack.push(2);
stack.push(4);
stack.pop();
actual = stack.getMax();
expected = 3;
assertAreEqual(desc, actual, expected);

function assertAreEqual(desc, actual, expected) {
  console.log("-------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

