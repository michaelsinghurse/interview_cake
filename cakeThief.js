// cakeThief.js

// O(n*k) time where n is the size of cakeTypes and k is the capacity divided 
// by the smallest value. the k complexity comes from the loop where you're 
// deducting current value from remaining capacity.
// O(n) space where n is the size of cakeTypes. the set used to track cakes
// considered would be of size n in the worst case of having to consider every
// cake
function maxDuffelBagValue(cakeTypes, capacity) {
  // our function does not handle negative cake weights or values
  if (cakeTypes.some(cake => cake.weight < 0 || cake.value < 0)) {
    throw new Error("Cake provided with a negative weight or value");
  }

  // if no cakes are provided, then the bag cannot hold any value
  if (cakeTypes.length === 0) return 0;

  // if any cake has a weight of 0 and a value over 0, then the bag can contain
  // an infinite number of those cakes. the maximum value would be Infinity.
  if (cakeTypes.some(cake => !cake.weight && cake.value)) return Infinity;

  // if the capacity is zero, then the the bag cannot contain any cakes with 
  // weight over 0. since we've already returned if there is a zero weight cake 
  // with a value over zero, we know that the bag cannot contain any value
  if (capacity === 0) return 0;

  let remainingCapacity = capacity;
  let valueInDuffelBag = 0;
  
  let cakesConsidered = new Set();

  while (cakesConsidered.size < cakeTypes.length) {
    let currentMaxValuePerWeight = 0;
    let currentWeight;
    let currentValue;
    let currentIndex;

    // walk through cakes and find the cake with the greatest value per weight
    // that has not already been targeted to add to the bag 
    cakeTypes.forEach((cake, index) => {
      // don't consider the same cake twice
      if (cakesConsidered.has(index)) return; 

      // if a cake has a weight of 0, we know it must have a value of 0 because 
      // we didn't short-circuit return above. move on to the next cake.
      if (cake.weight === 0) {
        cakesConsidered.add(index);
        return;
      }
      
      const valuePerWeight = cake.value / cake.weight;

      if (valuePerWeight > currentMaxValuePerWeight) {
        currentMaxValuePerWeight = valuePerWeight;
        currentWeight = cake.weight;
        currentValue = cake.value;
        currentIndex = index;
      }
    });
    
    // we now can add as much of this cake as we can to the duffel bag
    while (remainingCapacity - currentWeight >= 0) {
      valueInDuffelBag += currentValue; 
      remainingCapacity -= currentWeight;
    }

    // add the current cake to the cakes considered set so we don't try to add
    // it to the bag again
    cakesConsidered.add(currentIndex);
  }

  return valueInDuffelBag;
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
