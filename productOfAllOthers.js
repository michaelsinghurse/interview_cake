// productOfAllOthers.js

function productFromIndexPlus1ToEnd(array, index) {
  let product = 1;

  for (let i = index + 1; i < array.length; i += 1) {
    product *= array[i]; 
  }

  return product;
}

// GREEDY
// O(n) space
// O(n^2) time (I believe). Or maybe O(n lg n)
function getProductOfAllIntsExceptAtIndex1(ints) {
  if (ints.length < 2) return ints;

  let leftProduct = 1;
  const products = [];

  for (let index = 0; index < ints.length; index += 1) {
    const currentNum = ints[index];

    // find the product of all elements starting
    // at index + 1 and going to the end of the array
    // this will add time complexity. (n-1) + (n-2) + (n-3) + ... + 1
    const rightProduct = productFromIndexPlus1ToEnd(ints, index);

    // the mapped value is simply the leftProduct times the rightProduct
    products[index] = leftProduct * rightProduct;

    // reset the leftProduct by multiplying it by the current number
    leftProduct *= currentNum;
  }

  return products;
}

// GREEDY
// O(2n) = O(n) time
// O(n) space
// Walk through the array twice, first going left to right, then right to left.
// And keeping the current product as you go.
function getProductOfAllIntsExceptAtIndex(int) {
  if (ints.length < 2) return ints;

  const output = [];

  // go from left to right
  let productSoFar = 1;

  for (let index = 0; index < ints.length; index += 1) {
    output[index] = productSoFar;
    productSoFar *= ints[index];
  }

  // go from right to left
  productSoFar = 1;

  for (let index = ints.length - 1; index >= 0; index -= 1) {
    output[index] *= productSoFar;
    productSoFar *= ints[index];
  }
  
  // output array now contains the product of all values excluding the value of
  // the current index
  return output;
}

// TESTS
let desc, ints, expected;

desc = "example provided";
ints = [1, 7, 3, 4];
expected = [84, 12, 28, 21];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "array of 0's";
ints = [0, 0, 0];
expected = [0, 0, 0];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "array includes negatives";
ints = [-3, -1, 4];
expected = [-4, -12, 3];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "one element only";
ints = [5];
expected = [5];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "two elements only";
ints = [1, 2];
expected = [2, 1];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "empty array";
ints = [];
expected = [];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

desc = "many elements";
ints = [1, 2, 3, 4, 1, 2, 3];
expected = [144, 72, 48, 36, 144, 72, 48];
assertEqualArrays(desc, getProductOfAllIntsExceptAtIndex(ints), expected);

function assertEqualArrays(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}
