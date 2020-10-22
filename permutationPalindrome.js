// permutationPalindrome.js

"use strict";

// Time O(n) => where n is the number of characters in `chars`
// Space O(k) => where k is the total number of characters. Unicode ~ 110,000 
function hasPermutationPalindrome1(chars) {
  const counts = {};

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index].toLowerCase();

    counts[char] = counts[char] || 0;
    counts[char] += 1;
  }
  
  let numCharsWithOddCounts = 0;

  for (let key in counts) {
    if (counts[key] % 2 === 1) {
      numCharsWithOddCounts += 1; 
    }
  }

  return numCharsWithOddCounts <= 1;
}

// Time O(n)
// Space O(k)
function hasPermutationPalindrome(chars) {
  const unMatchedChars = new Set();

  for (let index = 0; index < chars.length; index += 1) {
    const char = chars[index].toLowerCase();

    if (unMatchedChars.has(char)) {
      unMatchedChars.delete(char); 
    } else {
      unMatchedChars.add(char); 
    }
  }

  return unMatchedChars.size <= 1;
}


let desc, chars, expected;

desc = "first example given";
chars = "civic";
expected = true;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "second example given";
chars = "ivicc";
expected = true;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "third example given";
chars = "civil";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "fourth example given";
chars = "livci";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "one character only";
chars = "a";
expected = true;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "two characters same letters";
chars = "aa";
expected = true;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "two characters different letters";
chars = "ab";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Michael";
chars = "Michael";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Ursula";
chars = "Ursula";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Zofia";
chars = "Zofia";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Bernadette";
chars = "Bernadette";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Buddy";
chars = "Buddy";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "Mom";
chars = "Mom";
expected = true;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

desc = "even number of characters. all the same except one";
chars = "aaaaab";
expected = false;
assertAreEqual(desc, hasPermutationPalindrome(chars), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
}

