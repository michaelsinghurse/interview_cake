// twoEggProblem.js

/*
Problem
- a building has 100 floors. find the highest floor an egg can be dropped from
  without breaking. you have two eggs and want to minimize the number of drops
- assume we know nothing about the eggs. they could be made of plastic, not 
  real eggs. or they may be real eggs, but the building is 1 mm floors. in other
  words, the probability of each floor being the highest floor is 1:100.
  
Example
// floors
// 12345678901234567890123456789...
// oooooooo*********************...
// function should return 8

Data Structure


Algorithm
- INSIGHT: You have more than two drops!
- brute force:
  - start at floor one and drop an egg. keep going up one floor until an egg
    breaks. return the current floor minus one.
  - O(100) time, worst case is the highest floor is floor 100.
  - O(1) space

- drop at middle floor.
  - drop an egg at floor 50. if it breaks, start at floor 1 and work upward.
    if it does not break, start at floor 51 and go upward. when the second egg
    breaks, return the current floor minus 1.
  - O(51) time, worst case is floor 50 does not break and have to go up to floor
    100.
  - O(1) space

- start at two and go up by twos
  - drop the first egg at floor 2. if it breaks, drop at 1. if yes, return 1.
    if no, return 2. if floor 2 does not break, drop at 4. if 4 breaks, drop at
    3. if 3 breaks, return 2. if not, return 3. if floor 4 does not break, drop
    at 6. if 6 breaks, drop at 5. if 5 breaks, return 4. if 5 does not break, 
    return 6. if 6 does not break, drop at 8.
  - O(51) time for dropping at 2, 4, 6, ..., 98, 100, 99 = 51 
  - O(1) space

- drop at increments of X
  - drop the first egg at floor, say, 10. if it does not break, then go up to 20.
    if it does break at 10, then start walking up to 10 from floor 1 with the
    second egg.
  - if X = 10, then worst case is dropping the first at 10, 20, ... 90, and then
    dropping the second from 91..100. T = 9 + 10 = 19.
  - if X = 5, worst case is 5, 10, .. 95, and 96..100. T = 19 + 5 = 24.
  - if X = 20, worst case is 20, 40, 60, 80, 81..100 = 24
  - if X = 15, worst case is 15, 30, 45, 60, 75, 90, 91..100 = 6 + 14 = 20 
  - if x = 12, worst case is 12, 24, .., 96, 97..100 = 8 + 11 = 19 
  - if x = 11, worst case is 11, 22, .., 99, 100 = 9 + 10 = 19 
  - if x = 9, worst case is 9, 18, .., 99 = 11 + 8 = 19
  - if x = 8, worst case is 8, 16, .., 96 = 12 + 7 = 19
  - total = integer division (100 / x) + x - 1
  - O(19) time worst case dropping at increments of 8 to 13

- drop at increments of X, X-1, ..., 1
  - drop the first egg at increment X. if it does not break, drop the second at
    incremetn of X-1, and so on until the last egg dropped is exactly at floor 
    100.
  - X + (X - 1) + (X - 2) + ... + 1 = 100. This is a triangular series.
  - (X + 1) * X / 2 = 100. solve for X. X ~= 14
  - if top floor is 13, then drop at 14, 1, 2, .., 13 = 14 drops
  - if top floor is 100, then drop at 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99,
    96, 97, 98 = 14
  - if top floor is 26, then 14, 27, 15, 16, .. 26 = 14
  - O(14) worst case for dropping at increments of 14, 13, ..., 1
*/

const total = (increment) => Math.floor(100 / increment) + increment - 1;

for (let index = 1; index < 50; index += 1) {
  console.log(index, "\t", total(index));
}
