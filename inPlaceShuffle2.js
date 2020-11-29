// inPlaceShuffle.js

function getRandom(floor, ceiling) {
  return floor + Math.floor(Math.random() * (ceiling - floor + 1));
}

// Using a set to keep track of used indices
// O(n) space
// O(n)+ time. not sure exact time
function shuffleInPlace1(array) {
  // copying the array is O(n) space and O(n) time
  const arrayCopy = [...array];
  // the set will be O(n) space and O(n) time
  const usedIndices = new Set();

  // iterating through the array is O(n) time
  for (let index = 0; index < arrayCopy.length; index += 1) {
    const currentValue = arrayCopy[index];

    let randomIndex = getRandom(0, array.length - 1);

    // what's the runtime complexity of this? O(n)+
    while (usedIndices.has(randomIndex)) {
      randomIndex = getRandom(0, array.length - 1);
    }

    array[randomIndex] = currentValue;
    usedIndices.add(randomIndex);
  }
}

// Fisher-Yates or Knuth shuffle
// O(1) space
// O(n) time
function shuffleInPlace(array) {
  for (let index = 0; index < array.length; index += 1) {
    const currentValue = array[index];

    const randomIndex = getRandom(index, array.length - 1);

    if (index !== randomIndex) {
      const randomIndexValue = array[randomIndex];
      array[index] = randomIndexValue;
      array[randomIndex] = currentValue;
    }
  }
}

let input;

input = [1];
printShufflePrint(input);

input = [1, 2];
printShufflePrint(input);

input = [1, 2, 3];
printShufflePrint(input);

input = [1, 2, 3, 4, 5];
printShufflePrint(input);

input = ["a", "b", "c"];
printShufflePrint(input);

input = [true, true, false, false];
printShufflePrint(input);

function printShufflePrint(input) {
  console.log("----------------------------------------------------------");
  console.log("before:", input);
  shuffleInPlace(input);
  console.log("after:", input);
}

