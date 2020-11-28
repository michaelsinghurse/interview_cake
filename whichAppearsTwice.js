// whichAppearsTwice.js

// Given an array of n + 1 numbers, and the fact that every number in the range
// 1..n appears once except for one number that appears twice, the function 
// returns the duplicate number.
// The sum of a triangular series 1, 2, 3, ..., n is (n + 1) * n / 2. Using 
// this formula, the duplicate number will be the difference between the actual
// sum of the array and the sum of the triangular series.
// O(n) time where n is the length of the array
// O(1) space
function findDuplicate(nums) {
  if (nums.length === 0) {
    throw new Error("There are no values in the input array");
  }

  const n = nums.length - 1;

  const triangularSum = (n + 1) * n / 2;

  const actualSum = nums.reduce((sum, val) => {
    sum += val;
    return sum;
  }, 0);

  if (actualSum > triangularSum) {
    return actualSum - triangularSum;
  }

  throw new Error("Unable to find duplicate");
}

// TESTS
let desc, nums, actual, expected;

desc = "small array";
nums = [1, 2, 3, 2];
actual = findDuplicate(nums);
expected = 2;
assertEqual(desc, actual, expected);

desc = "medium array";
nums = [6, 1, 2, 3, 4, 5, 6, 7];
actual = findDuplicate(nums);
expected = 6;
assertEqual(desc, actual, expected);

desc = "large array";
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 5 ];
actual = findDuplicate(nums);
expected = 5;
assertEqual(desc, actual, expected);

desc = "small array, numbers not sorted";
nums = [2, 5, 4, 1, 2, 3];
actual = findDuplicate(nums);
expected = 2;
assertEqual(desc, actual, expected);

desc = "empty array throws error";
nums = [];
actual = () => findDuplicate(nums);
assertThrowsError(desc, actual, expected);

function assertEqual(desc, actual, expected) {
  console.log("-----------------------------------------------------------");
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
