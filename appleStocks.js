// appleStocks.js

// O(1) space
// O(n) time where n is the length of stockPrices
function getMaxProfit(stockPrices) {
  if (stockPrices.length < 2) {
    throw new Error("Function requires at least two prices in stockPrices");
  }

  let minPrice = stockPrices[0];
  let maxProfit = -Infinity;
  
  for (let index = 1; index < stockPrices.length; index += 1) {
    const currentPrice = stockPrices[index];
    const currentProfit = currentPrice - minPrice;
    
    maxProfit = Math.max(currentProfit, maxProfit);
    minPrice = Math.min(currentPrice, minPrice);
  }

  return maxProfit;
}

let desc, stockPrices, expected;

desc = "example provided";
stockPrices = [10, 7, 5, 8, 11, 9];
expected = 6;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

desc = "only two prices";
stockPrices = [10, 15];
expected = 5;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

desc = "only one price";
stockPrices = [10];
expected = undefined;
assertThrowsError(desc, () => getMaxProfit(stockPrices));

desc = "no prices - empty array";
stockPrices = [];
expected = undefined;
assertThrowsError(desc, () => getMaxProfit(stockPrices));

desc = "price stays the same all day"
stockPrices = [1, 1, 1, 1, 1];
expected = 0;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

desc = "last two makes greatest profit";
stockPrices = [10, 11, 12, 7, 20];
expected = 13;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

desc = "first two makes greater profit";
stockPrices = [10, 20, 17, 18, 19];
expected = 10;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

desc = "prices are decreasing all day";
stockPrices = [10, 7, 5, 3, 2];
expected = -1;
assertAreEqual(desc, getMaxProfit(stockPrices), expected);

function assertAreEqual(desc, actual, expected) {
  console.log("-------------------------------------------------------------");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}

function assertThrowsError(desc, func) {
  console.log("-------------------------------------------------------------");
  console.log(desc);
  try {
    func();
    console.log("FAIL");
  } catch (e) {
    console.log("PASS");
  }
}


