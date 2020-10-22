// fibBottomUp.js
// A buttom up algorithm to compute the Fibonacci number for a given index

"use strict";

function fib(n) {
  if (n < 0) throw new Error("Negative index: " + n);

  if (n === 0 || n === 1) return n;

  let nMinusTwo = 0;
  let nMinusOne = 1;
  let fib;

  for (let index = 2; index <= n; index += 1) {
    fib = nMinusTwo + nMinusOne;
    nMinusTwo = nMinusOne;
    nMinusOne = fib;
  }

  return fib;
}

// TESTS

let desc, n, expected;
desc = "fib of negative number throws error";
n = -1;
expected = null;
assertThrowsError(desc, () => fib(n));

desc = "fib of 0 return 0";
n = 0;
expected = 0;
assertAreEqual(desc, fib(n), expected);

desc = "fib of 1 returns 1";
n = 1;
expected = 1;
assertAreEqual(desc, fib(n), expected);

desc = "fib of 2 returns 1";
n = 2;
expected = 1;
assertAreEqual(desc, fib(n), expected);

desc = "fib of 4 returns 3";
n = 4;
expected = 3;
assertAreEqual(desc, fib(n), expected);

desc = "fib of 5 returns 5";
n = 5;
expected = 5;
assertAreEqual(desc, fib(n), expected);

desc = "fib of 8 returns 21";
n = 8;
expected = 21;
assertAreEqual(desc, fib(n), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("-----------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  try {
    func();
    console.log("FAIL");
  } catch (_e) {
    console.log("PASS");
  }
}
