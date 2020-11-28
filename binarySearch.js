// binarySearch.js

// Binary search implementation. 
// Assume input array is sorted in ascending order.
// O(lg n) time
// O(1) space
function arrayHasNum(haystack, needle) {
  let floorIndex = -1;
  let ceilingIndex = haystack.length;

  while (floorIndex + 1 < ceilingIndex) {
    const middleIndex = Math.floor((floorIndex + ceilingIndex) / 2);
    const middleValue = haystack[middleIndex];

    if (middleValue === needle) {
      return true;
    }

    if (middleValue > needle) {
      ceilingIndex = middleIndex;
    } else {
      floorIndex = middleIndex;
    }
  }

  return false;
}

// TEST
let desc, nums, actual, expected;

desc = "short array - true";
nums = [1, 2, 5, 6, 10];
actual = arrayHasNum(nums, 6);
expected = true;
assertEqual(desc, actual, expected);

desc = "short array - false";
nums = [1, 2, 5, 6, 10];
actual = arrayHasNum(nums, 3);
expected = false;
assertEqual(desc, actual, expected);

desc = "long array - true";
nums = [1, 2, 5, 6, 10, 11, 12, 50, 55, 60, 65, 67];
actual = arrayHasNum(nums, 60);
expected = true;
assertEqual(desc, actual, expected);

desc = "short array - false";
nums = [1, 2, 5, 6, 10, 11, 12, 50, 55, 60, 65, 67];
actual = arrayHasNum(nums, 4);
expected = false;
assertEqual(desc, actual, expected);

function assertEqual(desc, actual, expected) {
  console.log("---------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
}
