// makingChange.js

"use strict";

function changeCombinations(amount, denominations) {
  // Initialize an array of zeroes with indices up to amount
  const waysOfDoingNCents = (new Array(amount + 1)).fill(0);
  waysOfDoingNCents[0] = 1;

  denominations.forEach(coin => {
    for (let higherAmount = coin; higherAmount <= amount; higherAmount += 1) {
      const higherAmountRemainder = higherAmount - coin;
      waysOfDoingNCents[higherAmount] += waysOfDoingNCents[higherAmountRemainder];
    }
  });

  return waysOfDoingNCents[amount];
}

// TESTS
let desc, actual, expected;

desc = "example provided";
actual = changeCombinations(4, [1, 2, 3]);
expected = 4;
assertAreEqual(desc, actual, expected);

desc = "one way only to make zero cents";
actual = changeCombinations(0, [1, 2, 3]);
expected = 1;
assertAreEqual(desc, actual, expected);

desc = "no ways if no denominations provided";
actual = changeCombinations(4, []);
expected = 0;
assertAreEqual(desc, actual, expected);

desc = "smallest denomination is bigger than amount";
actual = changeCombinations(4, [10, 25]);
expected = 0;
assertAreEqual(desc, actual, expected);

desc = "change for one dollar";
actual = changeCombinations(100, [1, 5, 10, 25]);
expected = 242;
assertAreEqual(desc, actual, expected);

function assertAreEqual(desc, actual, expected) {
  console.log("-----------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
}


