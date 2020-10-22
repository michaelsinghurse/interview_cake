// mergeSortedArrays.js

// Time: O(n) => where n is the total number of elements from each array 
// Space: O(n) => where n is the total number of elements from each array 
function mergeArrays(array1, array2) {
  const mergedArray = [];

  let index1 = 0;
  let index2 = 0;

  while (index1 < array1.length || index2 < array2.length) {
    const val1 = array1[index1] !== undefined ? array1[index1] : Infinity;
    const val2 = array2[index2] !== undefined ? array2[index2] : Infinity;

    if (val1 <= val2) {
      mergedArray.push(val1);
      index1 += 1;
    } else {
      mergedArray.push(val2);
      index2 += 1;
    }
  }

  return mergedArray;
}

let desc, array1, array2, actual, expected;

desc = "example provided";
array1 = [3, 4, 6, 10, 11, 15];
array2 = [1, 5, 8, 12, 14, 19];
expected = [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19];
assertAreEqualArrays(desc, mergeArrays(array1, array2), expected);

desc = "one array is empty";
array1 = [];
array2 = [1, 5, 8, 12, 14, 19];
expected = [1, 5, 8, 12, 14, 19];
assertAreEqualArrays(desc, mergeArrays(array1, array2), expected);

desc = "both arrays are empty";
array1 = [];
array2 = [];
expected = [];
assertAreEqualArrays(desc, mergeArrays(array1, array2), expected);

desc = "second array is much longer";
array1 = [3];
array2 = [1, 5, 8, 12, 14, 19, 20, 30, 100];
expected = [1, 3, 5, 8, 12, 14, 19, 20, 30, 100];
assertAreEqualArrays(desc, mergeArrays(array1, array2), expected);

desc = "no overlap in ranges of arrays";
array1 = [300, 400, 50300];
array2 = [1, 5, 8, 12, 14, 19, 20, 30, 100];
expected = [1, 5, 8, 12, 14, 19, 20, 30, 100, 300, 400, 50300];

assertAreEqualArrays(desc, mergeArrays(array1, array2), expected);
function assertAreEqualArrays(desc, actual, expected) {
  const areEqual = JSON.stringify(actual) === JSON.stringify(expected);
  
  console.log("********************************************************");
  console.log(desc);
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}
