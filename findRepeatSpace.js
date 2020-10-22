// findRepeatSpace.js

// DIVIDE AND CONQUER ON THE RANGE OF POSSIBLE NUMS
// O(1) space
// O(n lg n) => lg n for dividing n distinct nums in half. n for iterating
// through array each time.
function findDuplicate(nums) {
  if (nums.length < 2) {
    throw new Error("Input array must have at least two elements.");
  }
  
  let floorNum = 1;
  let ceilingNum = nums.length - 1;

  while (floorNum < ceilingNum) {
    const midPoint = floorNum + Math.floor((ceilingNum - floorNum) / 2);
    const lowerRangeFloor = floorNum;
    const lowerRangeCeiling = midPoint;
    const upperRangeFloor = midPoint + 1;
    const upperRangeCeiling = ceilingNum;

    const lowerDistinctNums = lowerRangeCeiling - lowerRangeFloor + 1;
    
    let lowerCount = 0;

    nums.forEach(num => {
      if (num >= lowerRangeFloor && num <= lowerRangeCeiling) {
        lowerCount += 1;
      }
    });

    if (lowerCount > lowerDistinctNums) {
      floorNum = lowerRangeFloor;
      ceilingNum = lowerRangeCeiling;
    } else {
      floorNum = upperRangeFloor;
      ceilingNum = upperRangeCeiling;
    }
  }

  return floorNum;
}

// BRUTE FORCE
// O(1) space
// O(n^2) time
function findDuplicate1(nums) {
  if (nums.length < 2) {
    throw new Error("Input array must have at least two elements.");
  }

  for (let indexOuter = 0; indexOuter < nums.length; indexOuter += 1) {
    const currentOuter = nums[indexOuter];

    for (let indexInner = 0; indexInner < nums.length; indexInner += 1) {
      if (indexOuter === indexInner) continue;

      const currentInner = nums[indexInner];

      if (currentOuter === currentInner) return currentOuter;
    }
  }
}

// SORT THEN GREEDY
// O(n) space if the sort returns a new array
// O(1) space if the sort is in place
// O(n lg n) time
function findDuplicate2(nums) {
  if (nums.length < 2) {
    throw new Error("Input array must have at least two elements.");
  }

  const numsSorted = nums.sort((a, b) => a - b);

  for (let index = 1; index < numsSorted.length; index += 1) {
    if (numsSorted[index - 1] === numsSorted[index]) {
      return numsSorted[index];
    }
  }
}

// TESTS
let desc, input, expected;

desc = "two element array with same number";
input = [1, 1];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "long array with one number duplicated";
input = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9];
expected = 6;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "first and last number of array of duplicated";
input = [1, 2, 3, 4, 5, 6, 7, 1];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "first two numbers duplicated";
input = [1, 1, 2, 3, 4];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "last two numbers duplicated";
input = [1, 2, 3, 4, 5, 6, 7, 7];
expected = 7;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "multiple numbers are duplicated";
input = [9, 4, 3, 2, 1, 9, 4, 3, 2, 1];
expected = 1;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "one number appears three times";
input = [8, 3, 5, 6, 8, 7, 2, 8, 1];
expected = 8;
assertAreEqual(desc, findDuplicate(input), expected);

desc = "array with only one element throws an error";
input = [1];
assertThrowsError(desc, () => findDuplicates(input));

desc = "array with no elements throws an error";
input = [];
assertThrowsError(desc, () => findDuplicates(input));

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
  console.log("-----------------------------------------------------------");
  console.log(desc);

  try {
    func();
    console.log("FAIL ... No error thrown");
  } catch (_e) {
    console.log("PASS");
  }
}
