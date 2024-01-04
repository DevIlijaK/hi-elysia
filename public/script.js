/**
 * Logika za kretanje
 */

// const cube = document.getElementById("proba123");
// let isMoving = false;
// let cubeLeft = cube.getBoundingClientRect().x;
// let cubeTop = cube.getBoundingClientRect().y;
// const pressedKeys = new Set();
// let step = 15;
// let something = null;

// document.addEventListener("keydown", (event) => {
//   pressedKeys.add(event.key.toLowerCase());
//   if (!isMoving) {
//     console.log('Ulazi ovde!')
//     isMoving = true;
//     // moveCube(event.key.toLowerCase());
//     moveCube();
//   }
// });

// document.addEventListener("keyup", (event) => {
//   pressedKeys.delete(event.key.toLowerCase());
//   if (pressedKeys.size == 0) {
//     isMoving = false;
//     cancelAnimationFrame(something);
//   }
// });

// function moveCube() {
//   if (isMoving) {
//     if (pressedKeys.has("a") && pressedKeys.has("w")) {
//       moveDiagonaly(135);
//     } else if (pressedKeys.has("a") && pressedKeys.has("s")) {
//       moveDiagonaly(225);
//     } else if (pressedKeys.has("d") && pressedKeys.has("w")) {
//       moveDiagonaly(45);
//     } else if (pressedKeys.has("d") && pressedKeys.has("s")) {
//       moveDiagonaly(315);
//     } else {
//       if (pressedKeys.has("d")) {
//         cubeLeft += step;
//       } else if (pressedKeys.has("w")) {
//         cubeTop -= step;
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

/**
 * Logika za skakanje
 */
const jumpingElement = document.getElementById("proba123");
let isJumping = false;
let jumpHeight = 30; // Adjust the jump height as needed
let proba = jumpingElement.getBoundingClientRect().y;
let startHeight = jumpingElement.getBoundingClientRect().y;
let height = jumpingElement.getBoundingClientRect().height;

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "w") {
    if (!isJumping) {
      isJumping = true;
      counter = 0;
      console.log(jumpingElement.getBoundingClientRect());
      jump();
    }
  }
});

function jump() {
  const jumpDuration = 500; // Adjust the jump duration as needed
  const startTime = performance.now();

  function update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - startTime;
    const progress = Math.min(deltaTime / jumpDuration, 1);
    counter++;
    if (progress < 0.4) {
      proba -= jumpHeight;
    } else {
    //   if (parseInt(jumpingElement.style.top) > startHeight + height) {
    //     console.log("Ulazi ovde!");
    //     jumpingElement.style.top = `${Math.max(startHeight, 0)}px`;
    //     isJumping = false;
    //     return;
    //   } else {
        proba += jumpHeight;
    //   }
    }

    jumpingElement.style.top = `${Math.max(proba, 0)}px`;

    if (parseInt(jumpingElement.style.top) < startHeight ){
      requestAnimationFrame(update);
    } else {
      isJumping = false;
      jumpingElement.style.top = `${Math.max(startHeight, 0)}px`;
      //   console.log(counter);
      //   console.log("Start height je: ", startHeight);
      //   console.log("End height: ", proba);
      //   console.log("End height: ", jumpingElement.style.top);
      //   console.log(jumpingElement.getBoundingClientRect());
      //   jumpingElement.style.top = `${Math.max(pocetak, 0)}px`;
    }
  }

  requestAnimationFrame(update);
}
