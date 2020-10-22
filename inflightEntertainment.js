// inflightEntertainment.js

function areThereTwoMovies(flightLength, movieLengths) {
  const validLengths = new Set();

  for (let index = 0; index < movieLengths.length; index += 1) {
    const movieLength = movieLengths[index];

    if (movieLength >= flightLength) continue;

    const matchingLength = flightLength - movieLength;

    if (validLengths.has(matchingLength)) {
      return true;
    } else {
      validLengths.add(movieLength); // average time of O(1) for array appends
    }
  }

  return false;
}

let desc, flightLength, movieLengths, expected;

desc = "only two movies whose sum is the length of flight";
flightLength = 200;
movieLengths = [100, 100];
expected = true;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);

desc = "only two movies who sum is not the length of flight";
flightLength = 200;
movieLengths = [100, 99];
expected = false;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);

desc = "one movie has same length as the flight";
flightLength = 120;
movieLengths = [150, 140, 160, 120];
expected = false;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);

desc = "one movie has half length as the flight";
flightLength = 300;
movieLengths = [150, 125, 130, 400];
expected = false;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);

desc = "first and last movies in long list work";
flightLength = 200;
movieLengths = [75, 300, 201, 100, 150, 145, 190, 195, 125];
expected = true;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);

desc = "only one movie and it equals flight length";
flightLength = 100;
movieLengths = [100];
expected = false;
assertAreEqual(desc, areThereTwoMovies(flightLength, movieLengths), expected);


function assertAreEqual(desc, actual, expected) {
  console.log("*********************************************************");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
  }
}
