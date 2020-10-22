// cafeOrderChecker.js

// BRUTE FORCE => because we're considering every possible combination
// Space: O(1)
// Time: O(n^2) => for each placed order, loop through served orders 
function isFIFO1(ordered1, ordered2, served) {
  const orders = [ordered1, ordered2];

  for (let orderIndex = 0; orderIndex < orders.length; orderIndex += 1) {
    const order = orders[orderIndex];

    let lastIndex = -1;
    for (let index = 0; index < order.length; index += 1) {
      const currentOrder = order[index];
      const servedIndex = served.findIndex(servedOrder => (
         servedOrder === currentOrder
      ));
      if (servedIndex < lastIndex) return false;
      lastIndex = servedIndex;
    }
  }

  return true;
}

// GREEDY => greedy because we're tracking the dine-in and take-out indices
// Space: O(1)
// Time: O(n) => where n is the length of the served array
function isFIFO(dineIn, takeOut, served) {
  let dineInIndex = 0;
  let takeOutIndex = 0;

  for (let servedIndex = 0; servedIndex < served.length; servedIndex += 1) {
    const servedElement = served[servedIndex];

    if (servedElement === dineIn[dineInIndex]) {
      dineInIndex += 1;
    } else if (servedElement === takeOut[takeOutIndex]) {
      takeOutIndex += 1;
    } else {
      return false;
    }
  }
  
  // make sure we have accounted for every dine-in and take-out order
  return dineInIndex === dineIn.length && takeOutIndex === takeOut.length;
}

let desc, takeOut, dineIn, served, expected;

desc = "first provided example";
takeOut = [1, 3, 5];
dineIn = [2, 4, 6];
served = [1, 2, 4, 6, 5, 3];
expected = false;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "second provided example";
takeOut = [17, 8, 24];
dineIn = [12, 19, 2];
served = [17, 8, 12, 19, 24, 2];
expected = true;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "one array is empty";
takeOut = [];
dineIn = [1, 2, 3, 4];
served = [1, 2, 3, 4];
expected = true;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "both arrays are empty";
takeOut = [];
dineIn = [];
served = [];
expected = true;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "orders are strings, not numbers";
takeOut = ["a", "b", "c"];
dineIn = ["d", "m", "z"];
served = ["a", "d", "b", "m", "c", "z"];
expected = true;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "take out and dine in orders numbers are descending";
takeOut = [6, 5, 4, 3];
dineIn = [2, 1, 0];
served = [2, 1, 0, 6, 5, 4, 3];
expected = true;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "some take out orders are not in served orders";
takeOut = [2, 3, 7, 9, 11];
dineIn = [1, 4, 8, 10];
served = [2, 3, 1, 4, 9, 11, 8, 10];
expected = false;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

desc = "the last dine in order is not in served";
takeOut = [17, 8, 24];
dineIn = [12, 19, 2];
served = [17, 8, 12, 19, 24];
expected = false;
assertAreEqualBooleans(desc, isFIFO(takeOut, dineIn, served), expected);

function assertAreEqualBooleans(desc, actual, expected) {
  console.log("*************************************************");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}
