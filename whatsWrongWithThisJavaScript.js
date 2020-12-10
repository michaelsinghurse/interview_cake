// whatsWrongWithThisJavaScript.js

// There is a bug in this script. Can you find it?

// After the script runs, btnNum will equal 3. When a button is clicked,
// the callback will use the current value of btnNum (3) not the value that
// it was when the `onclick` handler was added to the element. So no matter
// what button the user clicks, `undefined` will be the alert message since
// prices[3] = undefined.
// To fix the bug, within the onclick handler, you can declare a variable 
// priceIndex and set it equal to btnNum. Then use priceIndex rather than
// btnNum to access a value in the prizes array.

<button id="btn-0">Button 1</button>
<button id="btn-1">Button 2</button>
<button id="btn-2">Button 3</button>

<script type="text/javascript">
  const prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];

  for (var btnNum = 0; btnNum < prizes.length; btnNum++) {

    // For each of our buttons, when the user clicks it...
    document.getElementById(`btn-${btnNum}`).onclick = () => {

      // Tell her what she's won!
      alert(prizes[btnNum]);
    };
  }
</script>
