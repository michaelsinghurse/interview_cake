// fiveSidedDie.js

const rand7 = () => 1 + Math.floor(Math.random() * 7);

// Given the function rand7, which returns a random integer between 1 and 7
// inclusive, rand5 returns a random integer between 1 and 5 inclusive.
// Each integer 1..5 has a 1/7 chance of being the output
// O(infinity) time complexity - it may never return
// O(1) space
function rand5() {
  let result;
  do {
    result = rand7();
  } while (result > 5);
  return result;
}

// TESTS
const TRIALS = 100000;

console.log(`results of running rand5 ${TRIALS} times:`);

let ones = 0;
let twos = 0;
let threes = 0;
let fours = 0;
let fives = 0;

for (let times = 0; times < TRIALS; times += 1) {
  const result = rand5();
  
  switch (result) {
    case 1:
      ones += 1;
      break;
    case 2:
      twos += 1;
      break;
    case 3:
      threes += 1;
      break;
    case 4:
      fours += 1;
      break;
    case 5:
      fives += 1;
      break;
    default:
      break;
  }
}

const toPercent = (portion, total) => Math.round(portion / total * 100);

console.log("1:", toPercent(ones, TRIALS));
console.log("2:", toPercent(twos, TRIALS));
console.log("3:", toPercent(threes, TRIALS));
console.log("4:", toPercent(fours, TRIALS));
console.log("5:", toPercent(fives, TRIALS));
