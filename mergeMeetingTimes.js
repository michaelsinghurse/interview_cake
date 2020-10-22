// mergeMeetingTimes.js

"use strict";

// make a copy of the input array and then sort the copy by the earliest start 
// time. initialize a merged meetings array. walk down the sorted array and try 
// to merge the current meeting with the previous meeting on the merged 
// meetings array. if it can't be merged, simply add the meeting to the merged 
// meetings array as is. return the merged meeting array.
// O(n lg n) time
// O(n) space
function mergeMeetingTimes(meetings) {
  if (meetings.length < 2) return meetings;
  
  const meetingsCopy = JSON.parse(JSON.stringify(meetings));

  const meetingsSorted = meetingsCopy.sort((a, b) => a.startTime - b.startTime);
  
  const meetingsMerged = [ meetingsSorted[0] ];

  for (let index = 1; index < meetingsSorted.length; index += 1) {
    const currentMeeting = meetingsSorted[index];
    const previousMeeting = meetingsMerged[meetingsMerged.length - 1];

    if (currentMeeting.startTime <= previousMeeting.endTime) {
      previousMeeting.endTime = 
        Math.max(currentMeeting.endTime, previousMeeting.endTime);
    } else {
      meetingsMerged.push(currentMeeting);
    }
  }

  return meetingsMerged;
}

// TESTS
let desc, input, expected;

desc = "example provided";
input = [
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 4,  endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9,  endTime: 10 },
];
expected = [
  { startTime: 0, endTime: 1 },
  { startTime: 3, endTime: 8 },
  { startTime: 9, endTime: 12 },
];
assertEqualArrays(desc, mergeMeetingTimes(input), expected);

desc = "no meeting times in array";
input = [];
expected = []; 
assertEqualArrays(desc, mergeMeetingTimes(input), expected);

desc = "only one meeting time in array";
input = [
  { startTime: 0,  endTime: 1 },
];
expected = [
  { startTime: 0, endTime: 1 },
];
assertEqualArrays(desc, mergeMeetingTimes(input), expected);

desc = "one long meeting with several contained within it";
input = [
  { startTime: 0,  endTime: 10 },
  { startTime: 3,  endTime: 5 },
  { startTime: 4,  endTime: 8 },
  { startTime: 9,  endTime: 10 },
];
expected = [
  { startTime: 0, endTime: 10 },
];
assertEqualArrays(desc, mergeMeetingTimes(input), expected);

desc = "several meetings that don't overlap";
input = [
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 10, endTime: 12 },
  { startTime: 15,  endTime: 16 },
];
expected = [
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 10, endTime: 12 },
  { startTime: 15,  endTime: 16 },
];
assertEqualArrays(desc, mergeMeetingTimes(input), expected);

desc = "meetings that end when the next begins";
input = [
  { startTime: 0,  endTime: 1 },
  { startTime: 1,  endTime: 5 },
  { startTime: 5,  endTime: 8 },
  { startTime: 8, endTime: 12 },
];
expected = [
  { startTime: 0, endTime: 12 },
];
assertEqualArrays(desc, mergeMeetingTimes(input), expected);


desc = "meetings in reverse chronological order";
input = [
  { startTime: 10,  endTime: 11 },
  { startTime: 8,  endTime: 12 },
  { startTime: 5,  endTime: 6 },
  { startTime: 2, endTime: 5 },
];
expected = [
  { startTime: 2, endTime: 6 },
  { startTime: 8, endTime: 12 },
];
console.log("before", input);
assertEqualArrays(desc, mergeMeetingTimes(input), expected);
console.log("after", input);

function assertEqualArrays(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  let areEqual = true;;

  if (!Array.isArray(actual) || !Array.isArray(expected)) {
    areEqual = false;
  } else if (actual.length !== expected.length) {
    areEqual = false;
  } else {

    for (let index = 0; index < actual.length; index += 1) {
      if (JSON.stringify(actual[index]) !== JSON.stringify(expected[index])) {
        areEqual = false;
      }
    }
  }

  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", JSON.stringify(actual)); 
    console.log("expected:", JSON.stringify(expected));
  }
}


