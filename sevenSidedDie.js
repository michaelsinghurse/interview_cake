// sevenSidedDie.js

// Given a function rand5 that returns an integer 1..5 each with equal
// probabilty, write a function that returns an integer 1..7 each with equal
// probability.
// O(infinity) time complexity (worst case although very unlikely)
// O(1) space complexity
function rand7() {
  const rand5 = () => 1 + Math.floor(Math.random() * 5);
  
  // call rand5 twice and subtract 1 for each result to find a base 5 number.
  // convert this base 5 number to decimal, which is assigned to offset.
  let offset;

  do {
    // deduct 1 from rand5 to make the result 0 based, i.e. outcomes are 0..4
    // each with a 1/5 possiblity of occuring
    const roll1 = rand5() - 1;
    const roll2 = rand5() - 1;
  
    // treat roll1 and roll2 like two digits in a base 5 number. e.g. if roll1 
    // is 2 and roll2 is 3, then the base 5 number is 23, or 13 in base 10.
    offset = roll1 * 5 + roll2 * 1;

    
    // the minimum possible offset is when roll1 and roll2 are both 0, so 0
    // the maximum possible offset is when roll1 and roll2 are both 4, so 24 
    // we need to return an integer 1..7. 7 goes into 24 3 times, and so we 
    // want to throw out offsets of 21 or more.
  } while (offset >= 21);

  const nums = "123456712345671234567";

  return Number(nums[offset]);
}

// TESTS
const TRIALS = 100000;
let [ones, twos, threes, fours, fives, sixes, sevens] = (new Array(7)).fill(0);

console.log(`Result of ${TRIALS} trials of rand7()`);

for (let times = 0; times < TRIALS; times += 1) {
  const result = rand7();

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
    case 6:
      sixes += 1;
      break;
    case 7:
      sevens += 1;
      break;
    default:
      break;
  }
}

console.log("1:", ones);
console.log("2:", twos);
console.log("3:", threes);
console.log("4:", fours);
console.log("5:", fives);
console.log("6:", sixes);
console.log("7:", sevens);
