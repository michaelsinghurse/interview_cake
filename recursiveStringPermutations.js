// recursiveStringPermutations.js

function findPermutations(string) {
  // Base case
  if (string.length <= 1) {
    return new Set([string]);
  }

  const allCharsExceptLast = string.slice(0, -1);
  const lastChar = string.slice(-1);
  
  // Recursive call - returns a Set
  const permutationsOfAllCharsExceptLast = findPermutations(allCharsExceptLast);
  
  const permutations = new Set();
  permutationsOfAllCharsExceptLast.forEach(permutationOfAllCharsExceptLast => {
    for (let position = 0; position <= allCharsExceptLast.length; position++) {
      const permutation = permutationOfAllCharsExceptLast.slice(0, position) +
                          lastChar +
                          permutationOfAllCharsExceptLast.slice(position);

      permutations.add(permutation);
    }
  });

  return permutations;
}

// TESTS
let desc;
let input;
const expected = new Set();

desc = "two letter string";
input = "ab";
expected.clear();
expected.add("ab");
expected.add("ba");
assertEqualSets(desc, findPermutations(input), expected);

desc = "three letter string";
input = "abc";
expected.clear();
expected.add("abc");
expected.add("acb");
expected.add("bac");
expected.add("bca");
expected.add("cba");
expected.add("cab");
assertEqualSets(desc, findPermutations(input), expected);

desc = "four letter string";
input = "abcd";
expected.clear();
expected.add("abcd");
expected.add("abdc");
expected.add("acbd");
expected.add("acdb");
expected.add("adcb");
expected.add("adbc");
expected.add("bacd");
expected.add("badc");
expected.add("bcad");
expected.add("bcda");
expected.add("bdac");
expected.add("bdca");
expected.add("cabd");
expected.add("cadb");
expected.add("cbad");
expected.add("cbda");
expected.add("cdab");
expected.add("cdba");
expected.add("dabc");
expected.add("dacb");
expected.add("dbac");
expected.add("dbca");
expected.add("dcab");
expected.add("dcba");
assertEqualSets(desc, findPermutations(input), expected);

function assertEqualSets(desc, actual, expected) {
  let areEqualSets = true;
  
  // check that both objects are not undefined or null
  if (!actual || !expected) {
    areEqualSets = false;
    
  // check that both are sets
  } else if (actual.constructor.name !== "Set" || 
             expected.constructor.name !== "Set") {
    areEqualSets = false;

  // check that they have the same number of elements
  } else if (actual.size !== expected.size) {
    areEqualSets = false;
  
  // check that each element in the first is contained in the second
  } else if (Array.from(actual).some(element => !expected.has(element))) {
    areEqualSets = false;
  }

  console.log("------------------------------------------------------------");
  console.log(desc);

  if (areEqualSets) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}
