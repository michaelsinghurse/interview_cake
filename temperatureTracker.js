// temperatureTracker.js

"use strict";

// Object to hold all the temperatures as well as return metrics with getter
// methods for max temp, min temp, mean temp, and mode temp.
// If temperatures are all integers and in the range 0..110, then the worst case
// space cost is O(110 + 1) = O(111), which is constant space O(1).
// The time costs for initializing, inserting, and the getter methods are all
// O(1)
class TempTracker {
  constructor() {
    this.tempCounts = {};
    this.min = null;
    this.max = null;
    this.mean = null;
    this.numOfTemps = 0;
    this.mode = null;
  }

  getMax() {
    return this.max;
  }

  getMin() {
    return this.min;
  }

  getMean() {
    return Math.round(this.mean);
  }

  getMode() {
    return this.mode;
  }

  insert(temp) {
    this.tempCounts[temp] = (this.tempCounts[temp] || 0) + 1;
    this.numOfTemps += 1;
    this._updateMetrics(temp);
  }
  
  _updateMax(temp) {
    if (this.max === null || temp > this.max) {
      this.max = temp;
    }
  }
  
  _updateMean(temp) {
    // to find the previous total, take the prev/current mean and multiple by
    // the previous num of temps. because num of temps was incremented by the 
    // insert method, we need to subtract one to find how many temps there were
    // when the previous mean was calculated
    const prevGrossTemps = (this.mean || 0) * (this.numOfTemps - 1);
    const newGrossTemps = prevGrossTemps + temp;
    this.mean = newGrossTemps / this.numOfTemps;
  }

  _updateMetrics(temp) {
    this._updateMax(temp);
    this._updateMin(temp);
    this._updateMean(temp);
    this._updateMode(temp);
  }

  _updateMin(temp) {
    if (this.min === null || temp < this.min) {
      this.min = temp;
    }
  }

  _updateMode(temp) {
    if (this.mode === null || this.tempCounts[temp] > this.tempCounts[this.mode]) {
      this.mode = temp;
    } 
  }
}

// TEST
let desc, actual, expected, temps;

// first set of tests
temps = new TempTracker();
temps.insert(0);
temps.insert(0);
temps.insert(0);
desc = "three temps of 0 - min";
actual = temps.getMin();
expected = 0;
assertEqual(desc, actual, expected);

desc = "three temps of 0 - max";
actual = temps.getMax();
expected = 0;
assertEqual(desc, actual, expected);

desc = "three temps of 0 - mean";
actual = temps.getMean();
expected = 0;
assertEqual(desc, actual, expected);

desc = "three temps of 0 - mode";
actual = temps.getMode();
expected = 0;
assertEqual(desc, actual, expected);

// second set of tests
temps = new TempTracker();
temps.insert(110);
temps.insert(110);
temps.insert(110);
desc = "three temps of 110 - min";
actual = temps.getMin();
expected = 110;
assertEqual(desc, actual, expected);

desc = "three temps of 110 - max";
actual = temps.getMax();
expected = 110;
assertEqual(desc, actual, expected);

desc = "three temps of 110 - mean";
actual = temps.getMean();
expected = 110;
assertEqual(desc, actual, expected);

desc = "three temps of 110 - mode";
actual = temps.getMode();
expected = 110;
assertEqual(desc, actual, expected);

// third set of tests
temps = new TempTracker();
temps.insert(0);
temps.insert(110);
temps.insert(50);
temps.insert(0);
temps.insert(25);
temps.insert(25);
temps.insert(75);
temps.insert(90);
temps.insert(50);
temps.insert(50);
desc = "ten temps - min";
actual = temps.getMin();
expected = 0;
assertEqual(desc, actual, expected);

desc = "ten temps - max";
actual = temps.getMax();
expected = 110;
assertEqual(desc, actual, expected);

desc = "ten temps - mean";
actual = temps.getMean();
expected = 48;
assertEqual(desc, actual, expected);

desc = "ten temps - mode";
actual = temps.getMode();
expected = 50;
assertEqual(desc, actual, expected);

function assertEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);

  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}


