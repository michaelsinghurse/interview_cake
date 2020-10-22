// reverseWords.js

// Time: O(n)
// Space: O(1)
function reverseChars(array, start, end) {
  let leftIndex = start !== undefined ? start : 0;
  let rightIndex = end !== undefined ? end : array.length - 1;

  while (leftIndex < rightIndex) {
    [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]]; 

    leftIndex += 1;
    rightIndex -= 1;
  }
}

// Time: O(n)
// Space: O(1)
function reverseWords(array) {
  // step 1: reverse every character in the input array
  reverseChars(array);

  // step 2: then reverse the characters of every word
  let start = 0;

  for (let index = 0; index <= array.length; index += 1) {
    if (index === array.length || array[index] === " ") {
      end = index - 1;
      reverseChars(array, start, end);
      start = index + 1;
    }
  }
}

let desc, actual, expected;

desc = "example provided";
actual = "cake pound steal".split("");
reverseWords(actual);
expected = "steal pound cake".split("");
assertAreEqualArrays(desc, actual, expected);

desc = "two word message";
actual = "hello world".split("");
reverseWords(actual);
expected = "world hello".split("");
assertAreEqualArrays(desc, actual, expected);

desc = "short and long word";
actual = "a photograph".split("");
reverseWords(actual);
expected = "photograph a".split("");
assertAreEqualArrays(desc, actual, expected);

desc = "one word only";
actual = "computer".split("");
reverseWords(actual);
expected = "computer".split("");
assertAreEqualArrays(desc, actual, expected);

desc = "a very long sentence";
actual = "today will be the best day of my life".split("");
reverseWords(actual);
expected = "life my of day best the be will today".split("");
assertAreEqualArrays(desc, actual, expected);

desc = "empty string";
actual = "".split("");
reverseWords(actual);
expected = "".split("");
assertAreEqualArrays(desc, actual, expected);


function assertAreEqualArrays(desc, actual, expected) {
  const areEqual = JSON.stringify(actual) === JSON.stringify(expected);
  console.log("********************************************************");
  console.log("==>", desc);
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual", actual);
    console.log("expected", expected);
  }
}
