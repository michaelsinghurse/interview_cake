// highestProductOf3.js

// SORT THEN RETURN PRODUCT OF 3 BIGGEST
// O(n) space to make a copy of input
// O(n lg n) to sort
// Fails with negative numbers
function highestProductOf33(arrayOfInts) {
  if (arrayOfInts.length < 3) {
    throw new Error("input array must contain at least three integers");
  }

  const inputSorted = arrayOfInts.slice().sort((a, b) => a - b);
  const length = inputSorted.length;

  return inputSorted[length - 3] 
    * inputSorted[length - 2] 
    * inputSorted[length - 1];
}

// BRUTE FORCE
// O(1) space
// O(n ^ 3) time
// Passes all tests
function highestProductOf32(arrayOfInts) {
  if (arrayOfInts.length < 3) {
    throw new Error("input array must contain at least three integers");
  }

  let highestProduct = -Infinity;

  for (let index1 = 0; index1 < arrayOfInts.length; index1 += 1) {
    const firstNum = arrayOfInts[index1];

    for (let index2 = 0; index2 < arrayOfInts.length; index2 += 1) {
      if (index2 === index1) continue;

      const secondNum = arrayOfInts[index2];

      for (let index3 = 0; index3 < arrayOfInts.length; index3 += 1) {
        if (index3 === index1 || index3 === index2) continue;

        const thirdNum = arrayOfInts[index3];
        const product = firstNum * secondNum * thirdNum;

        if (product > highestProduct) {
          highestProduct = product;
        }
      }
    }
  }

  return highestProduct; 
}

// GREEDY
// O(1) space
// O(n) time where `n` is the length of `arrayOfInts`
function highestProductOf3(arrayOfInts) {
  if (arrayOfInts.length < 3) {
    throw new Error("input array must contain at least three integers");
  }
  
  let num1 = arrayOfInts[0];
  let num2 = arrayOfInts[1];
  let num3 = arrayOfInts[2];
  let greatestProduct = num1 * num2 * num3; 

  for (let index = 3; index < arrayOfInts.length; index += 1) {
    const currentNum = arrayOfInts[index];
    
    const productWithoutNum1 = currentNum * num2 * num3;
    const productWithoutNum2 = currentNum * num1 * num3;
    const productWithoutNum3 = currentNum * num1 * num2;

    if (
      productWithoutNum1 > greatestProduct && 
      productWithoutNum1 > productWithoutNum2 &&
      productWithoutNum1 > productWithoutNum3
    ) {
      greatestProduct = productWithoutNum1;
      num1 = currentNum;
    } else if (
      productWithoutNum2 > greatestProduct &&
      productWithoutNum2 > productWithoutNum1 &&
      productWithoutNum2 > productWithoutNum3
    ) {
      greatestProduct = productWithoutNum2;
      num2 = currentNum;
    } else if (
      productWithoutNum3 > greatestProduct &&
      productWithoutNum3 > productWithoutNum1 &&
      productWithoutNum3 > productWithoutNum2
    ) {
      greatestProduct = productWithoutNum3;
      num3 = currentNum;
    }
  }

  return greatestProduct;
}


// TESTS
let desc, arrayOfInts, expected;

desc = "example given with negative numbers";
arrayOfInts = [-10, -10, 1, 3, 2];
expected = 300;
assertAreEqual(desc, highestProductOf3(arrayOfInts), expected);

desc = "three numbers in array";
arrayOfInts = [1, 2, 3];
expected = 6;
assertAreEqual(desc, highestProductOf3(arrayOfInts), expected);

desc = "many numbers in array";
arrayOfInts = [10, 6, 2, 1, 9, 8, 5];
expected = 720;
assertAreEqual(desc, highestProductOf3(arrayOfInts), expected);

desc = "negative numbers in array but highest is positive";
arrayOfInts = [-10, -5, 0, 1, 2, 3];
expected = 150;
assertAreEqual(desc, highestProductOf3(arrayOfInts), expected);

desc = "negative numbers in array and highest is negative";
arrayOfInts = [-10, -5, -3, -2, -1];
expected = -6;
assertAreEqual(desc, highestProductOf3(arrayOfInts), expected);

desc = "less than three numbers in input";
arrayOfInts = [1];
assertThrowsError(desc, () => highestProductOf3(arrayOfInts));

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
  console.log("------------------------------------------------------------");
  console.log(desc);
  try {
    fun();
    console.log("FAIL ... Did not throw an error");
  } catch (e) {
    console.log("PASS");
  }
}
