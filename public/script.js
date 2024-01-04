// /**
//  * Logika za kretanje
//  */

// const cube = document.getElementById("proba123");
// const image = document.getElementById("image123");
// let isMoving = false;
// let cubeLeft = cube.getBoundingClientRect().x;
// let cubeTop = cube.getBoundingClientRect().y;
// const pressedKeys = new Set();
// let step = 5;
// let something = null;

// // var jumpHeight = 800; // Adjust the jump height as needed
// var proba = cube.getBoundingClientRect().y;
// var startHeight = cube.getBoundingClientRect().y;
// var height = cube.getBoundingClientRect().height;
// var isJumping = false;

// /**
//  * Varijable za fps
//  */
// var stop = false;
// var frameCount = 0;
// var $results = document.getElementById("results");
// var fps, fpsInterval, startTime, now, then, elapsed;

// document.addEventListener("keydown", (event) => {
//   pressedKeys.add(event.key.toLowerCase());
//   if (!isMoving) {
//     isMoving = true;

//     proba = cube.getBoundingClientRect().y;
//     startHeight = cube.getBoundingClientRect().y;
//     height = cube.getBoundingClientRect().height;
//     moveCube();
//   }
// });

// document.addEventListener("keyup", (event) => {
//   pressedKeys.delete(event.key.toLowerCase());
//   if (pressedKeys.size == 0 && !isJumping) {
//     isMoving = false;
//     cancelAnimationFrame(something);
//   }
// });

// function moveCube() {
//   if (isMoving) {
//     if (pressedKeys.has("a") && pressedKeys.has("w")) {
//       jump(135, 225);
//       return;
//       //   moveDiagonaly(135);
//     } else if (pressedKeys.has("a") && pressedKeys.has("s")) {
//       moveDiagonaly(225);
//     } else if (pressedKeys.has("d") && pressedKeys.has("w")) {
//       jump(45, 315);
//       return;
//     } else if (pressedKeys.has("d") && pressedKeys.has("s")) {
//       moveDiagonaly(315);
//     } else {
//       if (pressedKeys.has("d")) {
//         cubeLeft += step;
//       } else if (pressedKeys.has("w")) {
//         jump(90, 270);
//         return;
//       } else if (pressedKeys.has("a")) {
//         cubeLeft -= step;
//       } else if (pressedKeys.has("s")) {
//         cubeTop += step;
//       }
//     }
//     cube.style.top = `${cubeTop}px`;
//     cube.style.left = `${cubeLeft}px`;
//     something = requestAnimationFrame(moveCube);
//   }
// }

// function moveDiagonaly(degree) {
//   const angle = (degree * Math.PI) / 180;
//   const deltaX = step * Math.cos(angle);
//   const deltaY = -step * Math.sin(angle);
//   cubeLeft += deltaX;
//   cubeTop += deltaY;
// }
// function jump(jumpAngle, landAngle) {
//   const jumpDuration = 3500;
//   const startTime = performance.now();
//   isJumping = true;

//   function update() {
//     console.log(cube.getBoundingClientRect().y);
//     const currentTime = performance.now();
//     const deltaTime = currentTime - startTime;
//     const progress = Math.min(deltaTime / jumpDuration, 1);
//     if (progress < 0.4) {
//       moveDiagonaly(jumpAngle);
//     } else {
//       moveDiagonaly(landAngle);
//       if (
//         parseInt(cube.style.top) >
//         430 - cube.getBoundingClientRect().height
//       ) {
//         console.log(parseInt(cube.style.top));
//         isJumping = false;
//         isMoving = false;
//         cube.style.top = `${cubeTop}px`;
//         cube.style.left = `${cubeLeft}px`;
//         //   cube.style.top = `${Math.max(startHeight, 0)}px`;
//         cancelAnimationFrame(jump2);
//         cancelAnimationFrame(jump1);
//         cancelAnimationFrame(something);
//         return;
//       }
//     }

//     cube.style.top = `${cubeTop}px`;
//     cube.style.left = `${cubeLeft}px`;
//     var jump2 = null;
//     if (parseInt(cube.style.top) < startHeight) {
//       jump2 = requestAnimationFrame(update);
//     } else {
//       isJumping = false;
//       isMoving = false;
//       cube.style.top = `${cubeTop}px`;
//       cube.style.left = `${cubeLeft}px`;
//       //   cube.style.top = `${Math.max(startHeight, 0)}px`;
//       cancelAnimationFrame(jump2);
//       cancelAnimationFrame(jump1);
//       cancelAnimationFrame(something);
//     }
//   }

//   var jump1 = requestAnimationFrame(update);
// }

// startAnimating(90);

// function startAnimating(fps) {
//   fpsInterval = 1000 / fps;
//   then = Date.now();
//   startTime = then;
//   console.log(startTime);
//   animate();
// }
// document.addEventListener("keydown", (event) => {});
// fpsInterval = 1000 / 120;
// then = Date.now();
// startTime = then;
// console.log(startTime);
// animate();

// function animate() {
//   // stop
//   if (stop) {
//     return;
//   }

//   // request another frame

//   requestAnimationFrame(animate);

//   // calc elapsed time since last loop

//   now = Date.now();
//   elapsed = now - then;

//   // if enough time has elapsed, draw the next frame

//   if (elapsed > fpsInterval) {
//     // Get ready for next frame by setting then=now, but...
//     // Also, adjust for fpsInterval not being multiple of 16.67
//     then = now - (elapsed % fpsInterval);

//     // draw stuff here

//     // TESTING...Report #seconds since start and achieved fps.
//     var sinceStart = now - startTime;
//     var currentFps =
//       Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
//     $results.textContent =
//       "Elapsed time= " +
//       Math.round((sinceStart / 1000) * 100) / 100 +
//       " secs @ " +
//       currentFps +
//       " fps.";
//   }
// }

const touchpad = document.getElementById("touchpad");
const indicator = document.getElementById("indicator");

let isTouching = false;

touchpad.addEventListener("touchstart", handleTouchStart);
touchpad.addEventListener("touchmove", handleTouchMove);
touchpad.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  isTouching = true;
  updateIndicatorPosition(event.touches[0]);
}

function handleTouchMove(event) {
  if (isTouching) {
    updateIndicatorPosition(event.touches[0]);
  }
}

function handleTouchEnd() {
  isTouching = false;
  resetIndicatorPosition();
}

function updateIndicatorPosition(touch) {
  const touchpadRect = touchpad.getBoundingClientRect();
  const x = touch.clientX - touchpadRect.left;
  const y = touch.clientY - touchpadRect.top;

  const centerX = touchpadRect.width / 2;
  const centerY = touchpadRect.height / 2;

  const deltaX = x - centerX;
  const deltaY = y - centerY;

  const angle = Math.atan2(deltaY, deltaX);
  const distance = Math.min(touchpadRect.width / 2, touchpadRect.height / 2);

  const newX = centerX + distance * Math.cos(angle);
  const newY = centerY + distance * Math.sin(angle);

  indicator.style.transform = `translate(-50%, -50%) translate(${newX}px, ${newY}px)`;

  // Update the direction based on the angle
  const direction = getDirection(angle);
  indicator.textContent = direction;
}

function getDirection(angle) {
  const directions = [
    "&#x2191;",
    "&#x2197;",
    "&#x2192;",
    "&#x2198;",
    "&#x2193;",
    "&#x2199;",
    "&#x2190;",
    "&#x2196;",
  ];
  const index = Math.round((angle + Math.PI) / (Math.PI / 4)) % 8;
  return directions[index];
}

function resetIndicatorPosition() {
  indicator.style.transform = "translate(-50%, -50%)";
  indicator.textContent = "&#x2195;";
}
