// /**
//  * Logika za kretanje
//  */

var image = document.getElementById("image123");
var elements = document.querySelectorAll(".ramp");

// const horizontalLine = document.getElementById("horizontalLine");
// const horizontalLineLowerLeft = document.getElementById(
//   "horizontalLineLowerLeft"
// );
// const horizontalLineLowerRight = document.getElementById(
//   "horizontalLineLowerRight"
// );
var isMoving = false;
var cubeLeft = cube.getBoundingClientRect().left;
var cubeTop = cube.getBoundingClientRect().top;
var cubeRight = cube.getBoundingClientRect().right;
var cubeBottom = cube.getBoundingClientRect().bottom;
var pressedKeys = new Set();
var step = 5;

// var jumpHeight = 800; // Adjust the jump height as needed
var proba = cube.getBoundingClientRect().y;
var startHeight = cube.getBoundingClientRect().y;
var height = cube.getBoundingClientRect().height;
var isJumping = false;

/**
 * Varijable za animaciju
 */

var cubeMoveAnimation = null;
var mainJumpAnimation = null;
var sideJumpAnimation = null;

/**
 * Varijable za fps
 */
var stop = false;
var frameCount = 0;
var $results = document.getElementById("results");
var fps, fpsInterval, startTime, now, then, elapsed;

document.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key.toLowerCase());
  elements = document.querySelectorAll(".ramp");
  if (!isMoving) {
    isMoving = true;

    proba = cube.getBoundingClientRect().y;
    startHeight = cube.getBoundingClientRect().y;
    height = cube.getBoundingClientRect().height;
    requestAnimationFrame(moveCube);
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
  if (pressedKeys.size == 0 && !isJumping) {
    isMoving = false;
    cancelAnimationFrame(cubeMoveAnimation);
  }
});

function moveCube() {
  if (isMoving) {
    if (pressedKeys.has("a") && pressedKeys.has("w")) {
      obliqueThrow(135);
      return;
    } else if (pressedKeys.has("a") && pressedKeys.has("s")) {
      moveDiagonaly(225);
    } else if (pressedKeys.has("d") && pressedKeys.has("w")) {
      obliqueThrow(45);
      return;
    } else if (pressedKeys.has("d") && pressedKeys.has("s")) {
      moveDiagonaly(315);
    } else {
      if (pressedKeys.has("d")) {
        cubeLeft += step;
      } else if (pressedKeys.has("w")) {
        obliqueThrow(90);
        return;
      } else if (pressedKeys.has("a")) {
        cubeLeft -= step;
      } else if (pressedKeys.has("s")) {
        cubeTop += step;
      }
    }
    cube.style.top = `${cubeTop}px`;
    cube.style.left = `${cubeLeft}px`;
    cubeMoveAnimation = requestAnimationFrame(moveCube);
  }
}

function moveDiagonaly(degree) {
  const angle = (degree * Math.PI) / 180;
  const deltaX = step * Math.cos(angle);
  const deltaY = -step * Math.sin(angle);
  cubeLeft += deltaX;
  cubeTop += deltaY;
}
