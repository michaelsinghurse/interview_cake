// cakeThiefBottomUp.js

// O(n*m) time complexity where n is the number of cake types and m is 
// the capacity. we iterate from 1 to m and in each loop iterate through 
// all m cake types.
// O(m) space complexity where m is the capacity.
function maxDuffelBagValue(cakeTypes, capacity) {
  // our function does not handle negative cake weights or values
  if (cakeTypes.some(cake => cake.weight < 0 || cake.value < 0)) {
    throw new Error("Cake provided with a negative weight or value");
  }

  // if any cake has a weight of 0 and a value over 0, then the bag can contain
  // an infinite number of those cakes. the maximum value would be Infinity.
  if (cakeTypes.some(cake => !cake.weight && cake.value)) return Infinity;

  // initialize an array that holds that maximum value the duffel bag can hold
  // at each capacity, from a capacity of 0 up the capacity passed into the 
  // function.
  const maxValuesAtCapacities = (new Array(capacity + 1)).fill(0);

  // start the loop at a capacity of 1 because the max value when the capacity 
  // is 0 is 0, considering that we already returned if there was a zero weight
  // cake with a value over 0.
  for (let subCapacity = 1; subCapacity <= capacity; subCapacity += 1) {
    let maxValueAtSubCapacity = 0;
    
    // for each cake type, consider what the value of the duffel back would be
    // if it were added. the value is the value of the current cake plus the
    // value at the capacity of the current capacity reduced by the cake's
    // weight. use a greedy algorithm to retain the maximum value produced by any
    // cake.
    cakeTypes.forEach(cake => { 
      if (cake.weight <= subCapacity) { 
        const valueWithThisCake = 
          cake.value + maxValuesAtCapacities[subCapacity - cake.weight];

        maxValueAtSubCapacity = Math.max(maxValueAtSubCapacity, valueWithThisCake);
      }
    });

    // we used a greedy algorithm to walk through the cakes and find the maximum
    // value produced by adding any one cake. add this value to the max values
    // array.
    maxValuesAtCapacities[subCapacity] = maxValueAtSubCapacity;
  }

  return maxValuesAtCapacities[capacity];
}

// TESTS
let desc, caketypes, capacity, actual, expect;

desc = "example provided";
cakeTypes = [
  { weight: 7, value: 160 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];
capacity = 20;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 555;
assertAreEqual(desc, actual, expected);

desc = "example provided, smaller capacity";
cakeTypes = [
  { weight: 7, value: 160 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];
capacity = 10;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 270;
assertAreEqual(desc, actual, expected);

desc = "cake with zero weight returns Infinity if its value is over 0";
cakeTypes = [
  { weight: 0, value: 160 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];
capacity = 20;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = Infinity;
assertAreEqual(desc, actual, expected);

desc = "cake with zero weight does not return Infinity if its value is also 0";
cakeTypes = [
  { weight: 0, value: 0 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];
capacity = 20;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 555;
assertAreEqual(desc, actual, expected);

desc = "bag with 0 capacity holds 0 value if all cakes weigh something";
cakeTypes = [
  { weight: 7, value: 160 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];
capacity = 0;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 0; 
assertAreEqual(desc, actual, expected);

desc = "bag with 0 capacity holds Infinity if at least one cake weighs nothing";
cakeTypes = [
  { weight: 7, value: 160 },
  { weight: 3, value: 90 },
  { weight: 0, value: 15 },
];
capacity = 0;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = Infinity;
assertAreEqual(desc, actual, expected);

desc = "if no cakes provided, bag has no value";
cakeTypes = [];
capacity = 20;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 0;
assertAreEqual(desc, actual, expected);

desc = "a cake with a negative weight throws an error";
cakeTypes = [
  { weight: -10, value: 5 },
];
capacity = 20;
assertThrowsError(desc, () => maxDuffelBagValue(cakeTypes, capacity));

desc = "a cake with a negative value throws an error";
cakeTypes = [
  { weight: 10, value: -5 },
];
capacity = 20;
assertThrowsError(desc, () => maxDuffelBagValue(cakeTypes, capacity));

desc = "lots of cakes";
cakeTypes = [
  { weight: 2, value: 3 },
  { weight: 3, value: 6 },
  { weight: 5, value: 1 },
  { weight: 6, value: 1 },
  { weight: 7, value: 1 },
  { weight: 8, value: 1 }
];
capacity = 7;
actual = maxDuffelBagValue(cakeTypes, capacity);
expected = 12;
assertAreEqual(desc, actual, expected);

function assertAreEqual(desc, actual, expected) {
  console.log("----------------------------------------------------------");
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
  } catch (_e) {
    console.log("PASS");
  }
}
