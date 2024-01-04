// /**
//  * Logika za kretanje
//  */

const cube = document.getElementById("proba123");
const image = document.getElementById("image123");
let isMoving = false;
let cubeLeft = cube.getBoundingClientRect().x;
let cubeTop = cube.getBoundingClientRect().y;
const pressedKeys = new Set();
let step = 5;
let something = null;

// var jumpHeight = 800; // Adjust the jump height as needed
var proba = cube.getBoundingClientRect().y;
var startHeight = cube.getBoundingClientRect().y;
var height = cube.getBoundingClientRect().height;
var isJumping = false;

/**
 * Varijable za fps
 */
var stop = false;
var frameCount = 0;
var $results = document.getElementById("results");
var fps, fpsInterval, startTime, now, then, elapsed;

document.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key.toLowerCase());
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
  if (pressedKeys.size == 0 && !isJumping) {
    isMoving = false;
    cancelAnimationFrame(something);
  }
});

function moveCube() {
  if (isMoving) {
    if (pressedKeys.has("a") && pressedKeys.has("w")) {
      jump(135, 225);
      return;
      //   moveDiagonaly(135);
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
    something = requestAnimationFrame(moveCube);
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
    console.log(cube.getBoundingClientRect().y);
    const currentTime = performance.now();
    const deltaTime = currentTime - startTime;
    const progress = Math.min(deltaTime / jumpDuration, 1);
    if (progress < 0.4) {
      moveDiagonaly(jumpAngle);
    } else {
      moveDiagonaly(landAngle);
      if (
        parseInt(cube.style.top) >
        430 - cube.getBoundingClientRect().height
      ) {
        console.log(parseInt(cube.style.top));
        isJumping = false;
        isMoving = false;
        cube.style.top = `${cubeTop}px`;
        cube.style.left = `${cubeLeft}px`;
        //   cube.style.top = `${Math.max(startHeight, 0)}px`;
        cancelAnimationFrame(jump2);
        cancelAnimationFrame(jump1);
        cancelAnimationFrame(something);
        return;
      }
    }

    cube.style.top = `${cubeTop}px`;
    cube.style.left = `${cubeLeft}px`;
    var jump2 = null;
    if (parseInt(cube.style.top) < startHeight) {
      jump2 = requestAnimationFrame(update);
    } else {
      isJumping = false;
      isMoving = false;
      cube.style.top = `${cubeTop}px`;
      cube.style.left = `${cubeLeft}px`;
      //   cube.style.top = `${Math.max(startHeight, 0)}px`;
      cancelAnimationFrame(jump2);
      cancelAnimationFrame(jump1);
      cancelAnimationFrame(something);
    }
  }

  var jump1 = requestAnimationFrame(update);
}

startAnimating(90);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  console.log(startTime);
  animate();
}
document.addEventListener("keydown", (event) => {});
fpsInterval = 1000 / 120;
then = Date.now();
startTime = then;
console.log(startTime);
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
