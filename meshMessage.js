// meshMessage.js

// Space complexity: O(n)
// - `visited` is O(n) worst case
// - `queque` is O(n) worst case
// Time complexity: O(n + m) where n is number of nodes and m is number of edges
// - `visited` is O(1) for adding and indexing
// - `queque` is O(1) for adding and indexing
// - while loop is O(n) worst case
// - will will have consider all m edges when going through the while loop
function findShortestPath(network, sender, recipient) {
  // if sender and recipient are same person, just return an array with sender
  if (sender === recipient) return [sender];

  // if sender has no neighbors, there is no route to recipient
  if (!network[sender]) return null;

  // use a set to track the nodes that have been visited. do this to avoid an
  // infinite loop if there is a circuit in the graph
  const visited = new Set();
  visited.add(sender);

  // queque is FIFO. This is a breadth-first-search of the graph.
  const queque = [];
 
  network[sender].forEach(neighbor => {
    // each element in queque will be a two-element array. the first element is
    // the node to examine. the second element is an array of the nodes that are
    // on the route to that node, starting with sender.
    queque.push([neighbor, [sender]]);
    visited.add(neighbor);
  });

  // use an index to walk through the queque rather than using
  // Array.prototype.shift(). do this to avoid the time cost of shift().
  let index = 0;
  
  while (index < queque.length) {
    const [ node, route ] = queque[index];
   
    // if node is the one we're looking for, simply add it to the route and
    // return the route
    if (node === recipient) {
      route.push(node);
      return route;
    }

    // if node is not the one we're looking for, then we need to add its
    // neighbors to the queque (if it has neighbors)
    if (network[node]) {
      // make a copy of route before manipulating it. add the current node to
      // the route because we are now adding the current node's neighbors to the
      // queque.
      const updatedRoute = route.concat(node);

      network[node].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          queque.push([neighbor, updatedRoute]); 
          visited.add(neighbor);
        }
      });
    }

    index += 1;
  }

  // if we have examined every accessible node in the graph and haven't found
  // recipient, then there is no route. 
  return null;
}

// TESTS
let desc = "example given";
let network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
};
let sender = "Jayden";
let recipient = "Adam";
let shortestPaths = [['Jayden', 'Amelia', 'Adam']];
assertAreEqual(desc, findShortestPath(network, sender, recipient), shortestPaths);

desc = "example given with different sender and recipient";
network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
};
sender = "Omar";
recipient = "Miguel";
shortestPaths = [
  ["Omar", "Ren", "Jayden", "Amelia", "Miguel"],
  ["Omar", "Min", "Jayden", "Amelia", "Miguel"],
];
assertAreEqual(desc, findShortestPath(network, sender, recipient), shortestPaths);

desc = "example given with different sender and recipient";
network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
};
sender = "Min";
recipient = "William";
shortestPaths = [
  ["Min", "William"],
];
assertAreEqual(desc, findShortestPath(network, sender, recipient), shortestPaths);

desc = "example given with different sender and recipient";
network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
};
sender = "Noam";
recipient = "Ren";
shortestPaths = [
  ["Noam", "Jayden", "Ren"],
];
assertAreEqual(desc, findShortestPath(network, sender, recipient), shortestPaths);

desc = "example given but no path from sender to receiver exists";
network = {
  'Min'     : ['William', 'Jayden', 'Omar'],
  'William' : ['Min', 'Noam'],
  'Jayden'  : ['Min', 'Amelia', 'Ren', 'Noam'],
  'Ren'     : ['Jayden', 'Omar'],
  'Amelia'  : ['Jayden', 'Adam', 'Miguel'],
  'Adam'    : ['Amelia', 'Miguel', 'Sofia', 'Lucas'],
  'Miguel'  : ['Amelia', 'Adam', 'Liam', 'Nathan'],
  'Noam'    : ['Nathan', 'Jayden', 'William'],
  'Omar'    : ['Ren', 'Min', 'Scott'],
};
sender = "Scott";
recipient = "Nathan";
shortestPaths = null;
assertAreEqual(desc, findShortestPath(network, sender, recipient), shortestPaths);

function assertAreEqual(desc, actual, validResults) {
  let areEqual = false;

  if (actual === null && validResults === null) {
    areEqual = true;
  } else if (actual === null || validResults === null) {
    areEqual = false;
  } else if (validResults.some(result => JSON.stringify(result) === JSON.stringify(actual))) {
    areEqual = true;
  }

  console.log("-------------------------------------------------------------");
  console.log(desc);
  if (areEqual) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("Actual:");
    console.log(actual);
    console.log("Valid results:");
    validResults.forEach(result => console.log(result));
  }
}
