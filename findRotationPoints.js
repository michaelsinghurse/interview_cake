// findRotationPoint.js

function findRotationPoint(words) {
  if (words.length < 2) {
    throw new Error("Array must have at least two words.");
  }

  const firstWord = words[0];

  let floorIndex = -1;
  let ceilingIndex = words.length;

  while (ceilingIndex - floorIndex > 1) {
    const halfDistance = Math.floor((ceilingIndex - floorIndex) / 2);
    const guessIndex = floorIndex + halfDistance;

    const guessWord = words[guessIndex];

    // if the guessed word comes later in the dictionary than the first word
    // then we know that the array hasn't rotated yet. the rotation point must
    // be further to the right. reset the floor to the current guess and loop
    // if the guess word is equal to the first word, then the array must be
    // two elements long, and guess index is 0.
    if (guessWord >= firstWord) {
      floorIndex = guessIndex;
      continue;
    }
    
    // if the guessed word comes before the first word in the dictionary then
    // we know the array has already rotated. there are two options in that case
    // either the current word is the rotation point, or the rotation point is
    // further to the left;
    if (guessWord < firstWord) {
      // if the guess word comes before the first word and before the previous
      // word, then we know the guess word must be the rotation point
      if (guessWord < words[guessIndex - 1]) {
        return guessIndex;

      // if the guess word comes before the first word but after the previous
      // word then the rotation point is further to the left.
      } else {
        ceilingIndex = guessIndex;
      }
    }
  }
  
  // if we haven't found a rotation point in the while loop, then one does not
  // exist. in this case, return -1.
  return -1;
}

// TESTS
let desc, input, expected;

desc = "example provided";
input = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
  'asymptote',  // <-- rotates here!
  'babka',
  'banoffee',
  'engender',
  'karpatka',
  'othellolagkage',
];
expected = 5;
assertAreEqual(desc, findRotationPoint(input), expected);

desc = "long list of one letter strings";
input = ["t", "u", "v", "c", "e", "g", "h", "i", "j", "k", "n"];
expected = 3;
assertAreEqual(desc, findRotationPoint(input), expected);

desc = "only two words";
input = [
  'ptolemaic',
  'asymptote',
];
expected = 1;
assertAreEqual(desc, findRotationPoint(input), expected);

desc = "only one word";
input = [
  'ptolemaic',
];
assertThrowsError(desc, () => findRotationPoint(input));

desc = "empty array";
input = [];
assertThrowsError(desc, () => findRotationPoint(input));

desc = "no rotation point";
input = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'undulate',
  'xenoepist',
];
expected = -1;
assertAreEqual(desc, findRotationPoint(input), expected);

desc = "rotation point starts at letter k";
input = [
  'ptolemaic',
  'retrograde',
  'supplant',
  'karpatka',
  'othellolagkage',
];
expected = 3;
assertAreEqual(desc, findRotationPoint(input), expected);

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
  console.log("-----------------------------------------------------------");
  console.log(desc);
  
  try {
    func();
    console.log("FAIL ... Did not throw error.");
  } catch (_e) {
    console.log("PASS");
  }
}




