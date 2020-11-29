// inPlaceShuffle.js

const getRandom = (floor, ceiling) => {
  return floor + Math.floor(Math.random() * (ceiling - floor + 1));
};

function shuffleInPlace(array) {
  for (let index = 0; index < array.length; index += 1) {
    // Get the value at the current index and the value at a random index
    // Use the Fisher-Yates method rather than the naive method
    const currentValue = array[index];
    const randomIndex = getRandom(index, array.length - 1);
    const randomValue = array[randomIndex];

    // Swap the values
    array[index] = randomValue;
    array[randomIndex] = currentValue;
  }
}

// TESTS
let desc, array, clone;

desc = "short array of numbers";
array = [1, 2, 3];
clone = [...array];
shuffleInPlace(array);
assertShuffled(desc, clone, array);

desc = "medium array of numbers";
array = [10, 2, 3, 5, 2, 6];
clone = [...array];
shuffleInPlace(array);
assertShuffled(desc, clone, array);

desc = "long array of numbers";
array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 200, 500];
clone = [...array];
shuffleInPlace(array);
assertShuffled(desc, clone, array);

desc = "short array of strings";
array = ["a", "b", "c"];
clone = [...array];
shuffleInPlace(array);
assertShuffled(desc, clone, array);

desc = "medium array of strings";
array = ["a", "a", "b", "c", "d", "E", "F", "g"];
clone = [...array];
shuffleInPlace(array);
assertShuffled(desc, clone, array);

// sort each array. walk through arrays and compare the elements. 
// if any pair is not the same, the test fails. 
// if all pairs are the same, the test passes
// assume arrays contain only primitives, i.e. elements are not objects
function assertShuffled(desc, original, shuffled) {
  console.log("-----------------------------------------------------------");
  console.log(desc);

  const originalSorted = [...original].sort();
  const shuffledSorted = [...shuffled].sort();
  
  let testPasses = true;

  for (
    let index = 0; 
    index < Math.max(originalSorted.length, shuffledSorted.length); 
    index += 1
  ) {
    if (!testPasses) continue;

    if (originalSorted[index] !== shuffledSorted[index]) {
      testPasses = false;
    }
  }

  if (testPasses) {
    console.log(`PASS ... ${original} == ${shuffled}`);
  } else {
    console.log(`FAIL ... ${original} !== ${shuffled}`);
  }
}


