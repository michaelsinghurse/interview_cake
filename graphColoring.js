// graphColoring.js

// O(n * D) time where n is the number of nodes and D is the maximum degree. 
// Function iterates through each node in the graph and then iterates through 
// all of its neighbors. O(n * (D + D + 1)) = O(n * D)
// O(1) space
function colorGraph(graph, colors) {
  // this runs n times where n is the number of nodes
  graph.forEach(node => {
    // this runs at most D + 1 times where D is the maximum degree
    for (let index = 0; index < colors.length; index += 1) {
      const color = colors[index];

      let neighborHasColor = false;
      // this runs at most D times where D is the maximum degree
      node.neighbors.forEach(neighbor => {
        if (node === neighbor) {
          throw new Error("The graph has a loop at node " + node.label + "!");
        }

        if (neighbor.color === color) {
          neighborHasColor = true;
        }
      });

      if (!neighborHasColor) {
        node.color = color;
      }
    }
  });
}

// TESTS
class GraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = new Set();
    this.color = null;
  }
}

let desc;
let graph = [];
const COLORS = ["red", "blue", "white", "black", "green", "yellow"];

desc = "example given - three nodes in a row";
{
  const a = new GraphNode("a");
  const b = new GraphNode("b");
  const c = new GraphNode("c");

  a.neighbors.add(b);
  b.neighbors.add(a);
  c.neighbors.add(b);
  b.neighbors.add(c);

  graph = [a, b, c];
}
colorGraph(graph, COLORS);
assertAreEqual(desc, isValidGraphColoring(graph), true);

desc = "3 nodes making a triangle"
{
  const a = new GraphNode("a");
  const b = new GraphNode("b");
  const c = new GraphNode("c");

  a.neighbors.add(b);
  a.neighbors.add(c);
  b.neighbors.add(a);
  b.neighbors.add(c);
  c.neighbors.add(a);
  c.neighbors.add(b);

  graph = [a, b, c];
}
colorGraph(graph, COLORS);
assertAreEqual(desc, isValidGraphColoring(graph), true);

desc = "4 nodes making a square"
{
  const a = new GraphNode("a");
  const b = new GraphNode("b");
  const c = new GraphNode("c");
  const d = new GraphNode("d");

  a.neighbors.add(b);
  a.neighbors.add(d);
  b.neighbors.add(a);
  b.neighbors.add(c);
  c.neighbors.add(b);
  c.neighbors.add(d);
  d.neighbors.add(c);
  d.neighbors.add(a);

  graph = [a, b, c, d];
}
colorGraph(graph, COLORS);
assertAreEqual(desc, isValidGraphColoring(graph), true);

desc = "4 nodes making a square plus diagonal edges"
{
  const a = new GraphNode("a");
  const b = new GraphNode("b");
  const c = new GraphNode("c");
  const d = new GraphNode("d");

  a.neighbors.add(b);
  a.neighbors.add(c);
  a.neighbors.add(d);
  b.neighbors.add(a);
  b.neighbors.add(c);
  b.neighbors.add(d);
  c.neighbors.add(a);
  c.neighbors.add(b);
  c.neighbors.add(d);
  d.neighbors.add(a);
  d.neighbors.add(b);
  d.neighbors.add(c);

  graph = [a, b, c, d];
}
colorGraph(graph, COLORS);
assertAreEqual(desc, isValidGraphColoring(graph), true);

desc = "node with a loop throws a error";
{
  const a = new GraphNode("a");
  const b = new GraphNode("b");
  const c = new GraphNode("c");

  a.neighbors.add(a);
  a.neighbors.add(b);
  b.neighbors.add(a);
  c.neighbors.add(b);
  b.neighbors.add(c);

  graph = [a, b, c];
}
assertThrowsError(desc, () => colorGraph(graph, COLORS));

function assertAreEqual(desc, actual, expected) {
  console.log("------------------------------------------------------------");
  console.log(desc);
  if (actual === expected) {
    console.log("PASS");
  } else {
    console.log(`FAIL ... ${actual} !== ${expected}`);
  }
}

function assertThrowsError(desc, func) {
  console.log("------------------------------------------------------------");
  console.log(desc);
  try {
    func();
    console.log("FAIL");
  } catch (_error) {
    console.log("PASS");
  }
}

function isValidGraphColoring(graph) {
  // each node must have a color
  if (graph.some(node => !node.color)) {
    return false;
  }

  // adjacent nodes cannot have the same color
  if (graph.some(node => node.neighbors.has(node.color))) {
    return false;
  }

  // the number of colors used must be at most D + 1 where D is the max degree
  const maxDegree = graph.reduce((max, node) => {
    return Math.max(max, node.neighbors.size);
  }, 0);

  const colorsUsed = new Set();

  graph.forEach(node => {
    if (!colorsUsed.has(node.color)) {
      colorsUsed.add(node.color);
    }
  });
  
  if (colorsUsed.size > maxDegree + 1) {
    return false;
  }

  // if all tests pass, return true
  return true;
}
