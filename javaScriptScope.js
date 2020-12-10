// javaScriptScope.js

// Question
// If we execute the following script, what will be output to the console?
// Answer
// `undefined` will be logged to the console. `var` has function scope, so the 
// `text` declared in the function shadows the `text` declared outside the 
// function, and its value is initialized to `undefined` at the top of the function
// (before the console.log statement)
// If instead `text` was declared in both instances with `let`, then an error
// would be thrown for an uninitialized variable. `let` has function scope,
// so the inner `text` will be recognized by the console log statement but 
// it will not have been initialized.
var text = "outside";

function logIt() {
  console.log(text);
  var text = 'inside';
}

logIt();


 
