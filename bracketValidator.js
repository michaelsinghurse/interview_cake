// bracketValidator.js

// O(n) for time complexity where n is the number of characters in string. Worst
// case is to iterate through each character in the string. At each character
// could perform either a push or pop on the array.
// O(n) for space complexity where n is the number of characters in string.
// Worst case is every character is an opening bracket and the stack grows to
// size n.
function areBracketsValid2(string) {
  if (!string) throw new Error("string value is falsey");
  
  const stack = [];

  for (let index = 0; index < string.length; index += 1) {
    const char = string[index];

    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
      continue;
    } 

    if (char === ")" || char === "}" || char === "]") {
      const lastOpener = stack.pop();
      
      if (char === ")" && lastOpener !== "(") return false;
      if (char === "}" && lastOpener !== "{") return false;
      if (char === "]" && lastOpener !== "[") return false;
    }
  }

  return stack.length === 0;
}

// TESTS
let desc, string, actual, expected;

desc = "provided example #1";
string = "{ [ ] ( ) }";
actual = areBracketsValid(string);
expected = true;
assertAreEqual(desc, actual, expected);

desc = "provided example #2";
string = "{ [ ( ] ) }";
actual = areBracketsValid(string);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "provided example #3";
string = "{ [ }";
actual = areBracketsValid(string);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "empty string throws an error";
string = "";
actual = () => areBracketsValid(string);
assertThrowsError(desc, actual);

desc = "first bracket is a closer";
string = ")(){}[]";
actual = areBracketsValid(string);
expected = false;
assertAreEqual(desc, actual, expected);

desc = "last bracket is an opener";
string = "(){}[](";
actual = areBracketsValid(string);
expected = false;
assertAreEqual(desc, actual, expected);

function printHeader(desc) {
  console.log("------------------------------------------------------------");
  console.log(desc);
}

function assertAreEqual(desc, actual, expected) {
  printHeader(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  printHeader(desc);
  try {
    func();
    console.log("FAIL");
  } catch (_error) {
    console.log("PASS");
  }
}
