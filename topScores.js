// topScores.js

// Function takes an array of numbers and a number. Returns a new array of 
// the same numbers sorted from greatest to least. Retains duplicates.
// O(n) time and space complexity.
function sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE) {
  const scoreCounts = (new Array(HIGHEST_POSSIBLE_SCORE + 1)).fill(0);
  
  unsortedScores.forEach(score => {
    scoreCounts[score] += 1;
  });

  const sortedScores = [];

  for (let index = scoreCounts.length - 1; index >= 0; index -= 1) {
    const scoreCount = scoreCounts[index];
    if (scoreCount === 0) continue;

    for (let times = 1; times <= scoreCount; times += 1) {
      sortedScores.push(index);
    }
  }

  return sortedScores;
}

// TESTS
let desc, scores, highest, expected;

desc = "example provided";
scores = [37, 89, 41, 65, 91, 53];
highest = 100;
expected = [91, 89, 65, 53, 41, 37]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "example provided with duplicate score";
scores = [37, 89, 41, 65, 91, 53, 37];
highest = 100;
expected = [91, 89, 65, 53, 41, 37, 37]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "all same scores";
scores = [100, 100, 100, 100];
highest = 100;
expected = [100, 100, 100, 100]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "one score only";
scores = [37];
highest = 100;
expected = [37]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "two scores onlye";
scores = [37, 89];
highest = 100;
expected = [89, 37]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "small scores and very big scores";
scores = [100000, 0, 1, 90000];
highest = 100000;
expected = [100000, 90000, 1, 0]
assertEqualArrays(desc, sortScores(scores, highest), expected);

desc = "no scores";
scores = [];
highest = 100;
expected = []
assertEqualArrays(desc, sortScores(scores, highest), expected);

function assertEqualArrays(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}
