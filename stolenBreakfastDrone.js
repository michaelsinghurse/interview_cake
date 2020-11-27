// stolenBreakfastDrone.js

// Solution #1
// Sort array and then walk through and short-circuit return when you find a
// unique id.
// O(n*lg n) time, O(1) space
function findUniqueId1(deliveryIds) {
  if (deliveryIds.length === 0) {
    throw new Error("The input array is empty");
  }

  // sort the array by ascending order
  deliveryIds.sort((a, b) => a - b);
  
  // walk through the array. compare the current element to the one to its
  // right. if they are not the same, return the current element.
  for (let index = 0; index < deliveryIds.length; index += 2) {
    if (deliveryIds[index] !== deliveryIds[index + 1]) {
      return deliveryIds[index];
    }
  }
  
  // we walked through the array and found no unique id
  throw new Error("There are no unique ids in the array");  
}

// Solution #2
// Initialize an ids count object. Walk through the array. For each element,
// either add the id as a key to the object and set its value to 1, or increment
// the value if the key is already there. After the walk, return the key that
// has a value of 1.
// O(n) time, O(n) space
function findUniqueId2(deliveryIds) {
  if (deliveryIds.length === 0) {
    throw new Error("The input array is empty");
  }

  // walk through the array and populate the counts object. for each element in
  // the array, set a key in the object equal to 1, if it hasn't appeared yet,
  // or increment the value if the key has appeared.
  const counts = {};
  deliveryIds.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });
  
  // walk through the keys from the counts object. if the value of any key is
  // 1, then short-circuit return that key
  const keys = Object.keys(counts);
  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];

    if (counts[key] === 1) {
      // the key is currently a string. cast it back into a number before returning
      return +key;
    }
  }

  // we haven't found any id that appeared only once so throw an error
  throw new Error("There are no unique ids in the array");
}

// Solution #3
// Walk through the array. Keep a running sum and a set of numbers that have
// already appeared. If the current number has appeared, then subtract it from
// sum. If it has not appeared, then add it to the set and add it the running
// sum. At the end of walkthrough the array, return the value of sum if it is
// greater than 0. If it is 0, through an error.
// O(n) time, O(n) space
function findUniqueId3(deliveryIds) {
  if (deliveryIds.length === 0) {
    throw new Error("The input array is empty");
  }

  // keep a running tally of the sum of ids and a set of ids seen. 
  let sum = 0;
  let numbersSeen = new Set();

  deliveryIds.forEach(id => {
    // if we have already seen the id, then subtract it from the sum
    if (numbersSeen.has(id)) {
      sum -= id;

      // if we haven't seen the id, then add it to the set of seen ids and add
      // it to the sum 
    } else {
      numbersSeen.add(id);
      sum += id;
    }
  });

  // if the sum is greater than 0, then the unique id is the value that is left,
  // i.e. the value that has not been canceled out by its pair.
  if (sum > 0) {
    return sum;
  }

  // if sum is 0, then all ids have a match. there are no unique ids.
  throw new Error("Input array does not contain a unique id");
}

// Fastest and cheapest solution - use XOR bitwise operation
// O(n) time, O(1) space
function findUniqueId(deliveryIds) {
  if (!deliveryIds.length) {
    throw new Error("Array does not contain any ids");
  }

  let uniqueDeliveryId = 0;

  deliveryIds.forEach(id => {
    uniqueDeliveryId ^= id;
  });

  if (uniqueDeliveryId > 0) {
    return uniqueDeliveryId;
  }

  throw new Error("No unique delivery id was found.");
}

// TESTS
let desc, ids, actual, expected;

desc = "small array";
ids = [1, 2, 3, 1, 2];
actual = findUniqueId(ids);
expected = 3;
assertEqual(desc, actual, expected);

desc = "large array";
ids = [8, 7, 3, 2, 9, 2, 3, 1, 9, 1, 4, 4, 8];
actual = findUniqueId(ids);
expected = 7;
assertEqual(desc, actual, expected);

desc = "unique is first id";
ids = [8, 7, 3, 2, 9, 2, 3, 1, 9, 1, 4, 4, 8];
actual = findUniqueId(ids);
expected = 7;
assertEqual(desc, actual, expected);

desc = "unique is last id";
ids = [8, 7, 3, 2, 9, 2, 3, 1, 9, 1, 4, 4, 8];
actual = findUniqueId(ids);
expected = 7;
assertEqual(desc, actual, expected);

desc = "no uniques in the array";
ids = [1, 2, 3, 1, 2, 3];
actual = () => findUniqueId(ids);
assertThrowsError(desc, actual);

desc = "array is empty";
ids = [];
actual = () => findUniqueId(ids);
assertThrowsError(desc, actual);

function assertEqual(desc, actual, expected) {
  console.log("-------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
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


