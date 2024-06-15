let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const figures = {
  a: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  b: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  c: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  d: [
    [1, 1],
    [1, 1],
  ],
  e: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  f: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  g: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

let activeFigure = generateNewTetro();
let gameSpeed = 600;
const startButton = document.createElement("button");
let gameTime;
startButton.classList.add("start-btn");
startButton.addEventListener("click", (event) => {
  start();
});
startButton.textContent = "Start";

const stopButton = document.createElement("button");
stopButton.classList.add("stop-btn");
stopButton.addEventListener("click", (event) => {
  reset();
});
stopButton.textContent = "Stop";
const buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("wrapper");

const htmlScore = document.createElement("span");
htmlScore.classList.add("score");
htmlScore.textContent = 'SCORE: 0';

let score = 0;
buttonWrapper.append(startButton, stopButton);
document.body.prepend(buttonWrapper, htmlScore);
function drawField() {
  const container = document.querySelector(".grid");
  container.innerHTML = "";
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      container.append(cell);
      if (playfield[y][x] === 1) {
        cell.classList.add("tetro");
      }
      if (playfield[y][x] === 2) {
        cell.classList.add("tetro-fixed");
      }
    }
  }
}

function getRandom(max) {
  return Math.round(Math.random() * max);
}

function generateNewTetro() {
  let possibleFigures = "abcdefg";
  let rand = getRandom(possibleFigures.length - 1);
  let shape = figures[possibleFigures[rand]];
  return {
    x: Math.round((playfield[0].length - shape[0].length) / 2),
    y: 0,
    shape,
  };
}

function fixTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }
}

function checkLineComplete() {
  let count = 0;
  for (let y = 0; y < playfield.length; y++) {
    if (playfield[y].toString() === "2,2,2,2,2,2,2,2,2,2") {
      playfield.splice(y, 1);
      playfield.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      count++;
    }  
  }
  if(count === 1) {
    score+= 1000 * count;
  }
  else if(count === 2) {
    score+= 1200 * count;
  }
  else if(count === 3) {
    score+= 1500 * count;
  }
  else if(count === 4) {
    score+= 2000 * count;
  }
  else {
    score+= 2500 * count;
  }
  htmlScore.textContent = `SCORE: ${score}`;
  changeSpeed();
}

function drawNewFigure() {
  cleanFigure();
  for (let y = 0; y < activeFigure.shape.length; y++) {
    for (let x = 0; x < activeFigure.shape[y].length; x++) {
      if (activeFigure.shape[y][x] === 1) {
        playfield[activeFigure.y + y][activeFigure.x + x] =
          activeFigure.shape[y][x];
      }
    }
  }
}

function cleanFigure() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 0;
      }
    }
  }
}

function moveDown() {
  activeFigure.y += 1;
  if (hasCollisions()) {
    activeFigure.y -= 1;
    fixTetro();
    checkLineComplete();
    activeFigure = generateNewTetro();
    if (hasCollisions()) {
      gameOver();
    }
    drawNewFigure();
  }
}

function hasCollisions() {
  for (let y = 0; y < activeFigure.shape.length; y++) {
    for (let x = 0; x < activeFigure.shape[y].length; x++) {
      if (
        activeFigure.shape[y][x] &&
        (playfield[activeFigure.y + y] === undefined ||
          playfield[activeFigure.y + y][activeFigure.x + x] === undefined ||
          playfield[activeFigure.y + y][activeFigure.x + x] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

function rotateTetro() {
  let oldFigure = activeFigure.shape;
  activeFigure.shape = activeFigure.shape.map((element, index) =>
    activeFigure.shape.map((elem) => elem[index]).reverse()
  );
  if (hasCollisions()) {
    activeFigure.shape = oldFigure;
  }
}

document.onkeydown = function (event) {
  if (event.keyCode === 37) {
    activeFigure.x -= 1;
    if (hasCollisions()) {
      activeFigure.x += 1;
    }
  } else if (event.keyCode === 39) {
    activeFigure.x += 1;
    if (hasCollisions()) {
      activeFigure.x -= 1;
    }
  } else if (event.keyCode === 38) {
    rotateTetro();
  } else if (event.keyCode === 40) {
    activeFigure.y += 1;
    if (hasCollisions()) {
      activeFigure.y -= 1;
    }
  }
  update();
};

drawField();
function start() {
  moveDown();
  update();
  gameTime = setTimeout(start, gameSpeed);
}

function update() {
  drawNewFigure();
  drawField();
}

function gameOver() {
  alert("Game Over");
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

function reset() {
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  clearTimeout(gameTime);
  drawField();
  cleanFigure();
  activeFigure = generateNewTetro();
  score = 0;
  htmlScore.textContent = score;
  gameSpeed = 500;
}

function changeSpeed() {
  if(score >= 40000) {
    gameSpeed = 100;
  }
  else if(score >= 30000) {
    gameSpeed = 150;
  }
  else if(score >= 25000) {
    gameSpeed = 200;
  }
  else if(score >= 20000) {
    gameSpeed = 300;
  } 
  else if(score >= 10000) {
    gameSpeed = 400;
  }
}
