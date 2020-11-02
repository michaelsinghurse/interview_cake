// parenthesisMatching.js

// O(n) time complexity where n is the length of the string. O(1) space.
function findRightParenthesis(string, leftPosition) {
  // if the char at leftPosition is not a left parenthesis, throw error
  if (string[leftPosition] !== "(") {
    throw new Error("char at leftPosition is not a left parenthesis");
  }

  // keep track of how many left parenthesis you have. we start with 1, which is
  // the one at `leftPosition`.
  let leftParenthesisCount = 1;

  // start at the position one to the right of leftPosition since we already
  // know and have counted that the char at leftPosition is a left parenthesis
  for (let index = leftPosition + 1; index < string.length; index += 1) {
    const char = string[index];

    // keep track of the number of open/left parenthesis we encounter
    if (char === "(") {
      leftParenthesisCount += 1;

      // if we find a right parenthesis, and there is more than one left 
      // parenthesis, then deduct the number of left parenthesis by 1. 
    } else if (char === ")" && leftParenthesisCount > 1) {
      leftParenthesisCount -= 1;

      // if we find a right parenthesis, and there is only one left parenthesis,
      // then this is the right parenthesis we've been searching for. return the
      // index where its found.
    } else if (char === ")" && leftParenthesisCount === 1) {
      return index;
    }
  }

  // since we've walked through the string and haven't found a matching right
  // parenthesis, throw an error
  throw new Error("there is no matching right parenthesis");
}

// TESTS
let desc, string, actual, expected;

desc = "example provided";
string = "Sometimes (when I nest them (my parentheticals) too much " + 
  "(like this (and this))) they get confusing."
actual = findRightParenthesis(string, 10);
expected = 79;
assertAreEqual(desc, actual, expected);

desc = "example provided - different left parenthesis";
actual = findRightParenthesis(string, 28);
expected = 46;
assertAreEqual(desc, actual, expected);

desc = "example provided - another different left parenthesis";
actual = findRightParenthesis(string, 57);
expected = 78;
assertAreEqual(desc, actual, expected);

desc = "example provided - yet another different left";
actual = findRightParenthesis(string, 68);
expected = 77;
assertAreEqual(desc, actual, expected);

desc = "example provided - char at left position is not parenthesis";
assertThrowsError(desc, () => findRightParenthesis(string, 1));

desc = "there is no matching right parenthesis";
string = "this left parenthesis ( has no matching right";
assertThrowsError(desc, () => findRightParenthesis(string, 22));

function printTestHeader(desc) {
  console.log("-------------------------------------------------------------");
  console.log(desc);
}

function assertAreEqual(desc, actual, expected) {
  printTestHeader(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  printTestHeader(desc);
  try {
    func();
    console.log("FAIL");
  } catch (_e) {
    console.log("PASS");
  }
}


