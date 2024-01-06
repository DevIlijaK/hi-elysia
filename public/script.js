// /**
//  * Logika za kretanje
//  */

const cube = document.getElementById("proba123");
const image = document.getElementById("image123");
const horizontalLine = document.getElementById("horizontalLine");
const horizontalLineLowerLeft = document.getElementById(
  "horizontalLineLowerLeft"
);
const horizontalLineLowerRight = document.getElementById(
  "horizontalLineLowerRight"
);
let isMoving = false;
let cubeLeft = cube.getBoundingClientRect().left;
let cubeTop = cube.getBoundingClientRect().top;
let cubeRight = cube.getBoundingClientRect().right;
let cubeBottom = cube.getBoundingClientRect().bottom;
const pressedKeys = new Set();
let step = 5;

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
  console.log(cube.getBoundingClientRect());
  if (!isMoving) {
    isMoving = true;

    proba = cube.getBoundingClientRect().y;
    startHeight = cube.getBoundingClientRect().y;
    height = cube.getBoundingClientRect().height;
    moveCube();
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
  console.log(cube.getBoundingClientRect());
  if (pressedKeys.size == 0 && !isJumping) {
    isMoving = false;
    cancelAnimationFrame(cubeMoveAnimation);
  }
});

function moveCube() {
  if (isMoving) {
    if (pressedKeys.has("a") && pressedKeys.has("w")) {
      jump(135, 225);
      return;
    } else if (pressedKeys.has("a") && pressedKeys.has("s")) {
      moveDiagonaly(225);
    } else if (pressedKeys.has("d") && pressedKeys.has("w")) {
      jump(45, 315);
      return;
    } else if (pressedKeys.has("d") && pressedKeys.has("s")) {
      moveDiagonaly(315);
    } else {
      if (pressedKeys.has("d")) {
        cubeLeft += step;
      } else if (pressedKeys.has("w")) {
        jump(90, 270);
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
function jump(jumpAngle, landAngle) {
  const jumpDuration = 3500;
  const startTime = performance.now();
  isJumping = true;

  function update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - startTime;
    const progress = Math.min(deltaTime / jumpDuration, 1);
    if (progress < 0.4) {
      moveDiagonaly(jumpAngle);
    } else {
      moveDiagonaly(landAngle);
      if (
        cube.getBoundingClientRect().bottom >=
        horizontalLine.getBoundingClientRect().top
      ) {
        console.log(
          "cube.getBoundingClientRect().bottom",
          cube.getBoundingClientRect().bottom
        );
        console.log(
          "horizontalLine.getBoundingClientRect().top",
          horizontalLine.getBoundingClientRect().top
        );
        console.log(
          "cube.getBoundingClientRect().bottom < horizontalLineLowerLeft.getBoundingClientRect().top",
          cube.getBoundingClientRect().bottom <
            horizontalLineLowerLeft.getBoundingClientRect().top
        );
        console.log("Uslo ovde?", cube.getBoundingClientRect().bottom);
        console.log("Uslo ovde?", cube.getBoundingClientRect().bottom);
        isJumping = false;
        isMoving = false;
        cubeBottom = horizontalLine.getBoundingClientRect().top;
        cubeTop =
          horizontalLine.getBoundingClientRect().top -
          cube.getBoundingClientRect().height;
        cube.style.bottom = `${cubeBottom}px`;
        cube.style.top = `${cubeTop}px`;
        cube.style.left = `${cubeLeft}px`;
        cancelAnimationFrame(mainJumpAnimation);
        cancelAnimationFrame(sideJumpAnimation);
        cancelAnimationFrame(cubeMoveAnimation);
        return;
      }
      //   } else if (
      //     cube.getBoundingClientRect().bottom >=
      //       horizontalLineLowerRight.getBoundingClientRect().top &&
      //     cube.getBoundingClientRect().top >
      //       horizontalLineLowerLeft.getBoundingClientRect().top &&
      //     cube.getBoundingClientRect().top <
      //       horizontalLine.getBoundingClientRect().top
      //   ) {
      //     console.log(
      //       "cube.getBoundingClientRect().bottom",
      //       cube.getBoundingClientRect().bottom
      //     );
      //     console.log(
      //       "horizontalLineLowerRight.getBoundingClientRect().top",
      //       horizontalLineLowerRight.getBoundingClientRect().top
      //     );
      //     console.log(
      //       "cube.getBoundingClientRect().bottom <= horizontalLineLowerLeft.getBoundingClientRect().top",
      //       cube.getBoundingClientRect().bottom >=
      //         horizontalLineLowerRight.getBoundingClientRect().top
      //     );
      //     isJumping = false;
      //     isMoving = false;
      //     cubeBottom = horizontalLineLowerRight.getBoundingClientRect().top;
      //     cubeTop =
      //       horizontalLineLowerRight.getBoundingClientRect().top -
      //       cube.getBoundingClientRect().height;
      //     cube.style.bottom = `${cubeBottom}px`;
      //     cube.style.top = `${cubeTop}px`;
      //     cube.style.left = `${cubeLeft}px`;
      //     cancelAnimationFrame(mainJumpAnimation);
      //     cancelAnimationFrame(sideJumpAnimation);
      //     cancelAnimationFrame(cubeMoveAnimation);
      //     return;
      //   } else if (
      //     cube.getBoundingClientRect().bottom >=
      //       horizontalLineLowerLeft.getBoundingClientRect().top &&
      //     cube.getBoundingClientRect().top <
      //       horizontalLineLowerRight.getBoundingClientRect().top &&
      //     cube.getBoundingClientRect().top <
      //       horizontalLine.getBoundingClientRect().top
      //   ) {
      //     console.log(
      //       "cube.getBoundingClientRect().bottom?",
      //       horizontalLine.getBoundingClientRect().top
      //     );
      //     console.log(
      //       "Uslo ovde?",
      //       horizontalLineLowerRight.getBoundingClientRect().top
      //     );
      //     isJumping = false;
      //     isMoving = false;
      //     cubeBottom = horizontalLineLowerLeft.getBoundingClientRect().top;
      //     cubeTop =
      //       horizontalLineLowerLeft.getBoundingClientRect().top -
      //       cube.getBoundingClientRect().height;
      //     cube.style.bottom = `${cubeBottom}px`;
      //     cube.style.top = `${cubeTop}px`;
      //     cube.style.left = `${cubeLeft}px`;
      //     cancelAnimationFrame(mainJumpAnimation);
      //     cancelAnimationFrame(sideJumpAnimation);
      //     cancelAnimationFrame(cubeMoveAnimation);
      //     return;
      //   }
    }

    cube.style.top = `${cubeTop}px`;
    cube.style.left = `${cubeLeft}px`;

    if (parseInt(cube.style.top) < startHeight) {
      mainJumpAnimation = requestAnimationFrame(update);
    } else {
      isJumping = false;
      isMoving = false;
      cube.style.top = `${cubeTop}px`;
      cube.style.left = `${cubeLeft}px`;
      //   cube.style.top = `${Math.max(startHeight, 0)}px`;
      cancelAnimationFrame(mainJumpAnimation);
      cancelAnimationFrame(sideJumpAnimation);
      cancelAnimationFrame(cubeMoveAnimation);
    }
  }

  sideJumpAnimation = requestAnimationFrame(update);
}

startAnimating(90);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}
document.addEventListener("keydown", (event) => {});
fpsInterval = 1000 / 120;
then = Date.now();
startTime = then;
animate();

function animate() {
  // stop
  if (stop) {
    return;
  }

  // request another frame

  requestAnimationFrame(animate);

  // calc elapsed time since last loop

  now = Date.now();
  elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = now - (elapsed % fpsInterval);

    // draw stuff here

    // TESTING...Report #seconds since start and achieved fps.
    var sinceStart = now - startTime;
    var currentFps =
      Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
    $results.textContent =
      "Elapsed time= " +
      Math.round((sinceStart / 1000) * 100) / 100 +
      " secs @ " +
      currentFps +
      " fps.";
  }
}

/**
 * Pokusaj kontrolera za telefon
 */

// const touchpad = document.getElementById("touchpad");
// const indicator = document.getElementById("indicator");

// let isTouching = false;

// touchpad.addEventListener("touchstart", handleTouchStart);
// touchpad.addEventListener("touchmove", handleTouchMove);
// touchpad.addEventListener("touchend", handleTouchEnd);

// function handleTouchStart(event) {
//   isTouching = true;
//   updateIndicatorPosition(event.touches[0]);
// }

// function handleTouchMove(event) {
//   if (isTouching) {
//     updateIndicatorPosition(event.touches[0]);
//   }
// }

// function handleTouchEnd() {
//   isTouching = false;
//   resetIndicatorPosition();
// }

// function updateIndicatorPosition(touch) {
//   const touchpadRect = touchpad.getBoundingClientRect();
//   const x = touch.clientX - touchpadRect.left;
//   const y = touch.clientY - touchpadRect.top;

//   const centerX = touchpadRect.width / 2;
//   const centerY = touchpadRect.height / 2;

//   const deltaX = x - centerX;
//   const deltaY = y - centerY;

//   const angle = Math.atan2(deltaY, deltaX);
//   const distance = Math.min(touchpadRect.width / 2, touchpadRect.height / 2);

//   const newX = centerX + distance * Math.cos(angle);
//   const newY = centerY + distance * Math.sin(angle);

//   indicator.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;

//   // Update the direction based on the angle
//   const direction = getDirection(angle);
//   indicator.textContent = direction;
// }

// function getDirection(angle) {
//   const directions = [
//     "&#x2191;",
//     "&#x2197;",
//     "&#x2192;",
//     "&#x2198;",
//     "&#x2193;",
//     "&#x2199;",
//     "&#x2190;",
//     "&#x2196;",
//   ];
//   const index = Math.round((angle + Math.PI) / (Math.PI / 4)) % 8;
//   return directions[index];
// }

// function resetIndicatorPosition() {
//   indicator.style.transform = "translate(-50%, -50%)";
//   indicator.textContent = "&#x2195;";
// }
