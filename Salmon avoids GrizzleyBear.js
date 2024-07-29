/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Salmon avoids GrizzleyBear
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p" 
const obstacle = "o" 



setLegend(
  [player, bitmap`
................
................
................
.......000......
......09990...00
.....0LLLLL0.0L0
...00LL1LL1L0LL0
..0LLLLLLL10L1L0
.0LLLLL1LLLLLL0.
0LL9LLL1LLLLL0..
0L909LLLL1LL0...
0LL9LL1LL1L1L0..
.0LLLL1LLLL1LL0.
..0LLLLLLLLLLLL0
...00LLL00000L10
.....000.....00.`], 
  [ obstacle, bitmap`
................
................
...CCC....CCC...
...C0C....C0C...
...CCCCCCCCCC...
.....C10C01C....
.....C10C01C....
.....CCCCCCC....
.....CC333CC....
......CCCCC.....
.....CC111CC....
....CCC111CCC...
...CCCC111CCCC..
..CCCCCCCCCCCCC.
...CC.CC.CC.CC..
......CC.CC.....` ], 
)

const melody = tune `
115.83011583011583: B4/115.83011583011583,
115.83011583011583: F5/115.83011583011583,
115.83011583011583: G5/115.83011583011583 + F4/115.83011583011583 + E5~115.83011583011583 + B4~115.83011583011583,
115.83011583011583: E4/115.83011583011583 + D4-115.83011583011583,
115.83011583011583: D5/115.83011583011583 + F4/115.83011583011583 + A5/115.83011583011583 + E4/115.83011583011583 + D4-115.83011583011583,
115.83011583011583,
115.83011583011583: C5/115.83011583011583 + D5-115.83011583011583 + A5~115.83011583011583,
115.83011583011583: G4/115.83011583011583 + F5/115.83011583011583 + C5/115.83011583011583 + D5-115.83011583011583,
115.83011583011583,
115.83011583011583: D4/115.83011583011583,
115.83011583011583,
115.83011583011583: D5/115.83011583011583 + C4/115.83011583011583 + G5/115.83011583011583 + D4-115.83011583011583 + G4~115.83011583011583,
115.83011583011583: C4/115.83011583011583 + B4/115.83011583011583 + D4-115.83011583011583 + C5-115.83011583011583 + G5~115.83011583011583,
115.83011583011583: B4/115.83011583011583 + C5-115.83011583011583,
115.83011583011583: F5/115.83011583011583,
115.83011583011583: E4/115.83011583011583,
115.83011583011583: C5/115.83011583011583 + D5/115.83011583011583,
115.83011583011583,
115.83011583011583: G4~115.83011583011583,
115.83011583011583: D4/115.83011583011583 + A5/115.83011583011583 + D5/115.83011583011583,
231.66023166023166,
115.83011583011583: A4/115.83011583011583 + F5/115.83011583011583 + G5-115.83011583011583,
115.83011583011583: B4/115.83011583011583 + C5/115.83011583011583 + F5/115.83011583011583 + G5-115.83011583011583,
115.83011583011583: A5/115.83011583011583,
115.83011583011583: E4/115.83011583011583 + A4~115.83011583011583,
231.66023166023166,
115.83011583011583: G5/115.83011583011583 + C5/115.83011583011583 + D5-115.83011583011583,
115.83011583011583: E4/115.83011583011583 + C5/115.83011583011583 + D5-115.83011583011583 + F4-115.83011583011583,
115.83011583011583: E4/115.83011583011583 + F4-115.83011583011583 + A4~115.83011583011583,
115.83011583011583`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; 
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; 
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);