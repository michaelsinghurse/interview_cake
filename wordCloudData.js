// wordCloudData.js

/*****************************************************************************/
// O(n) space
// O(n) time
// Problem with this is the logic is very dense and the function does too many
// things. It needs refactored.
// Also does not consider case. "Bill" and "bill" are the same words.
function wordCloudMap(text) {
  const cloud = new Map();
  let wordStartIndex = 0;
  let wordLength = 0;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index].toLowerCase();
    if (char >= "a" && char <= "z") {
      if (wordLength === 0) {
        wordStartIndex = index;
      }
      wordLength += 1;
    } else if ((char === "-" || char === "'") && wordLength > 0) {
      wordLength += 1;
    } else if (wordLength > 0) {
      const word = text
        .slice(wordStartIndex, wordStartIndex + wordLength)
        .toLowerCase();
      cloud.set(word, (cloud.get(word) || 0) + 1)
      wordStartIndex += wordLength;
      wordLength = 0;
    }

    if (index === text.length - 1 && wordLength > 0) {
      const word = text
        .slice(wordStartIndex, wordStartIndex + wordLength)
        .toLowerCase();
      cloud.set(word, (cloud.get(word) || 0) + 1)
    }
  }
  
  return cloud;
}

/*****************************************************************************/

const capitalize = word => word[0].toUpperCase() + word.slice(1);

const isLetter = char => char.toLowerCase() >= "a" && char.toLowerCase() <= "z";

const isWordPunctuation = char => char === "-" || char === "'";

// O(1) time - average for appending an item on array. O(n) for some appends. 
// O(1) space - average. 
function addWordToMapInPlace(word, map) {

  // case 1: map has word. simply increment word's value.
  if (map.has(word)) {
    map.set(word, map.get(word) + 1);

    // case 2: map has the upper case version. that means that word is
    // in lower case. we only keep words in upper case if they are always in
    // upper case, therefore take the upper case version's count, increment by
    // one, set that count for the lower case version, and delete the upper
    // case version
  } else if (map.has(capitalize(word))) {
      map.set(word, map.get(capitalize(word)) + 1);
      map.delete(capitalize(word));

    // case 3: map has the lower case version. that means that word is
    // in upper case. we only keep words in upper case if they are always in
    // upper case in text. therefore simply increment the lower case version.
  } else if (map.has(word.toLowerCase())) {
    map.set(word.toLowerCase(), map.get(word.toLowerCase()) + 1);

    // case 4: neither the word, nor its upper case or lower case versions 
    // are in map. in this case, simply add word to map and set 
    // its count to 1
  } else {
    map.set(word, 1);
  }
}

// O(n) time where n is length of text
// O(n) space where is the length of text
function wordCloudMap(text) {
  const wordCloud = new Map();

  let wordStartingIndex = 0;
  let wordLength = 0;
  
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (isLetter(char) || (isWordPunctuation(char) && wordLength > 0)) {
      if (wordLength === 0) {
        wordStartingIndex = index;
      } 

      wordLength += 1;
    } else {
      if (wordLength > 0) {
        addWordToMapInPlace(
          text.slice(wordStartingIndex, wordStartingIndex + wordLength),
          wordCloud);

        wordLength = 0;
      }
    }
    
    // if this is the last character in text
    if (index === text.length - 1 && wordLength > 0) {
      addWordToMapInPlace(
        text.slice(wordStartingIndex, wordStartingIndex + wordLength),
        wordCloud);
    }
  }

  return wordCloud;
}


let desc, text, expected;

desc = "one word";
text = "hi";
expected = new Map();
expected.set("hi", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "one word capitalized";
text = "Hi";
expected = new Map();
expected.set("Hi", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "two words";
text = "Hi there";
expected = new Map();
expected.set("Hi", 1);
expected.set("there", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "two words with punctuation at the end";
text = "Hi there!";
expected = new Map();
expected.set("Hi", 1);
expected.set("there", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "one word with leading empty space";
text = " there";
expected = new Map();
expected.set("there", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "empty string";
text = "";
expected = new Map();
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "string with only punctuation characters";
text = "!# ? #.! ,";
expected = new Map();
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "long sentence";
text = "Hi there. My name is Michael. What is your name? Michael. Oh, hi, Michael!";
expected = new Map();
expected.set("hi", 2);
expected.set("there", 1);
expected.set("My", 1);
expected.set("name", 2);
expected.set("is", 2);
expected.set("Michael", 3);
expected.set("What", 1);
expected.set("your", 1);
expected.set("Oh", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "using a dash within a word and outside word";
text = "Drive-through, Mom? No - sorry."
expected = new Map();
expected.set("Drive-through", 1);
expected.set("Mom", 1);
expected.set("No", 1);
expected.set("sorry", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

desc = "using an apostrphe within a word";
text = "Michael's car.";
expected = new Map();
expected.set("Michael's", 1);
expected.set("car", 1);
assertAreEqualMaps(desc, wordCloudMap(text), expected);

function assertAreEqualMaps(desc, actual, expected) {
  let areEqual = true;

  if (!(actual instanceof Map) || !(expected instanceof Map)) {
    areEqual = false;
  }
  if (actual.size !== expected.size) {
    areEqual = false;
  }
  for (let [key, value] of actual) {
    if (!expected.has(key) || expected.get(key) !== value) {
      areEqual = false;
    }
  }

  console.log("-------------------------------------------------------------");
  console.log(desc);
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}
