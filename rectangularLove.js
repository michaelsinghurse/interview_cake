// rectangularLove.js

"use strict";

// Find the overlap in the x dimension for the two rectangles.
// Returns an array where the first element is the starting x coordinate for
// the overlap and the second element is the ending x coordinate for the 
// overlap. If there is no overlap, null is returned.
// O(1) time and space
function findXOverlap(rect1, rect2) {
  const xRect1 = [ rect1.leftX, rect1.leftX + rect1.width ];
  const xRect2 = [ rect2.leftX, rect2.leftX + rect2.width ];
  const start = Math.max(xRect1[0], xRect2[0]);
  const end = Math.min(xRect1[1], xRect2[1]);

  if (end > start) {
    return [ start, end ];
  } else {
    return null;
  }
}

// Comments from the `findXOverlap` function apply here except this function 
// handles the y dimension.
function findYOverlap(rect1, rect2) {
  const yRect1 = [ rect1.bottomY, rect1.bottomY + rect1.height ];
  const yRect2 = [ rect2.bottomY, rect2.bottomY + rect2.height ];
  const start = Math.max(yRect1[0], yRect2[0]);
  const end = Math.min(yRect1[1], yRect2[1]);

  if (end > start) {
    return [ start, end ];
  } else {
    return null;
  }

}

// Find the overlap between two rectangles. Assume the sides of the rectangles
// are parallel to the x and y axises. Returns a rectangle object describing the
// overlap if there is one, or null if there is no overlap.
// O(1) time and space
function findOverlap(rect1, rect2) {
  // step 1: find the overlap in the x dimension. if null, return null.
  const xOverlap = findXOverlap(rect1, rect2);
  if (!xOverlap) return null;
  
  // step 2: find the overlap in the y dimension. if null, return null.
  const yOverlap = findYOverlap(rect1, rect2);
  if (!yOverlap) return null;

  // step 3: build and return the overlap rectangle. 
  return {
    leftX: xOverlap[0],
    bottomY: yOverlap[0],
    width: xOverlap[1] - xOverlap[0],
    height: yOverlap[1] - yOverlap[0],
  };
}

// TESTS
let desc, actual, expected;
let rect1, rect2;

desc = "example given";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 5,
  bottomY: 2,
  width: 3,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = {
  leftX: 5,
  bottomY: 2,
  width: 2,
  height: 2,
};
assertEqualObjects(desc, actual, expected);

desc = "no overlap";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 20,
  bottomY: 20,
  width: 3,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = null;
assertEqualObjects(desc, actual, expected);

desc = "one corner of first and one corner of second overlap";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 2,
  bottomY: 3,
  width: 10,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = {
  leftX: 2,
  bottomY: 3,
  width: 5,
  height: 1,
};
assertEqualObjects(desc, actual, expected);

desc = "two corners of first are contained with in the second";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 5,
  bottomY: 0,
  width: 5,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = {
  leftX: 5,
  bottomY: 1,
  width: 2,
  height: 3,
};
assertEqualObjects(desc, actual, expected);

desc = "two corners of second are contained within the first";
rect1 = {
  leftX: 0,
  bottomY: 0,
  width: 5,
  height: 10,
};
rect2 = {
  leftX: 3,
  bottomY: 2,
  width: 5,
  height: 2,
};
actual = findOverlap(rect1, rect2);
expected = {
  leftX: 3,
  bottomY: 2,
  width: 2,
  height: 2,
};
assertEqualObjects(desc, actual, expected);

desc = "complete overlap of rectangles";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
actual = findOverlap(rect1, rect2);
expected = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
assertEqualObjects(desc, actual, expected);

desc = "one corner touches (same point) but no overlap";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 7,
  bottomY: 4,
  width: 3,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = null; 
assertEqualObjects(desc, actual, expected);

desc = "one side touches (same line) but does not overlap";
rect1 = {
  leftX: 1,
  bottomY: 1,
  width: 6,
  height: 3,
};
rect2 = {
  leftX: 7,
  bottomY: 2,
  width: 3,
  height: 6,
};
actual = findOverlap(rect1, rect2);
expected = null;
assertEqualObjects(desc, actual, expected);

function assertEqualObjects(desc, actual, expected) {
  let areEqual = false;
  
  if (actual === null && expected === null) {

    areEqual = true;

  } else if (actual && expected) {

    if (Object.keys(actual).length === Object.keys(expected).length) {

      if (
        Object.keys(actual).every(actualKey => {
          return expected.hasOwnProperty(actualKey) &&
            actual[actualKey] === expected[actualKey];
        })
      ) {
        areEqual = true;
      }
    }
  }

  console.log("-----------------------------------------------------------");
  console.log(desc);
  
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
  }
}


