// nthFibonacciNumber.js

function fib(index) {
  if (typeof index !== "number" || index < 0 || index % 1 !== 0) {
    throw new Error(`Invalid input: ${index}`);
  }
  
  if (index === 0 || index === 1) return index;

  let nMinusTwo = 0;
  let nMinusOne = 1;
  let fib;

  for (let count = 2; count <= index; count += 1) {
    fib = nMinusOne + nMinusTwo;
    nMinusTwo = nMinusOne;
    nMinusOne = fib;
  }

  return fib;
}

// TESTS
let desc, input, expected;

desc = "negative number throws error"
input = -5;
assertThrowsError(desc, () => fib(input));

desc = "floating point number throws error";
input = 1.5;
assertThrowsError(desc, () => fib(input));

desc = "string throws error";
input = "0";
assertThrowsError(desc, () => fib(input));

desc = "fib of 0";
input = 0;
expected = 0;
assertAreEqual(desc, fib(input), expected);

desc = "fib of 1";
input = 1;
expected = 1;
assertAreEqual(desc, fib(input), expected);

desc = "fib of 6";
input = 6;
expected = 8;
assertAreEqual(desc, fib(input), expected);

desc = "fib of 9";
input = 9;
expected = 34;
assertAreEqual(desc, fib(input), expected);

function testHeader(desc) {
  console.log("-----------------------------------------------------------");
  console.log(desc);
}

function assertAreEqual(desc, actual, expected) {
  testHeader(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  testHeader(desc);

  try {
    func();
    console.log("FAIL");
  } catch (_e) {
    console.log("PASS");
  }
}
