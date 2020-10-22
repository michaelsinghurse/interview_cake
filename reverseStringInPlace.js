// reverseStringInPlace.js

// time: O(n) - have to iterate through half the length of the array
// space: O(1) - create three variables no matter the size of input 
function reverseInPlace1(array) {
  const maxIndex = Math.floor(array.length / 2) - 1; 

  for (let index = 0; index <= maxIndex; index += 1) {
    const rightIndex = array.length - index - 1;
    const left = array[index];
    const right = array[rightIndex];
    
    array[index] = right;
    array[rightIndex] = left;
  }
}

function reverseInPlace(array) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex < rightIndex) {
    [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]]; 
    
    leftIndex += 1;
    rightIndex -= 1;
  }
}

let desc, actual, expected;

desc = "simple case - odd num elements";
actual = ["a", "b", "c", "d", "e"];
reverseInPlace(actual);
expected = ["e", "d", "c", "b", "a"];
assertEqualArrays(desc, actual, expected);

desc = "simple case - even num elements";
actual = ["a", "b", "c", "d", "e", "f"];
reverseInPlace(actual);
expected = ["f", "e", "d", "c", "b", "a"];
assertEqualArrays(desc, actual, expected);

desc = "empty array";
actual = [];
reverseInPlace(actual);
expected = [];
assertEqualArrays(desc, actual, expected);

desc = "only one element";
actual = ["a"];
reverseInPlace(actual);
expected = ["a"];
assertEqualArrays(desc, actual, expected);

desc = "only two elements";
actual = ["a", "b"];
reverseInPlace(actual);
expected = ["b", "a"];
assertEqualArrays(desc, actual, expected);

function assertEqualArrays(desc, array1, array2) {
  const areEqual = JSON.stringify(array1) === JSON.stringify(array2);

  console.log("*****************************************************");
  console.log(desc);
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log(array1, "is not equal", array2);
  }
}
 
