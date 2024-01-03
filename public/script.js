// const cube = document.getElementById("proba123");
// console.log("Ulazi ovde", cube.getBoundingClientRect());
// console.log("Ulazi ovde", cube.style.left);
// let cubeTop = cube.getBoundingClientRect().y;
// let cubeLeft = cube.getBoundingClientRect().x;
// let isTransitioning = false;
// const pressedKeys = new Set();

// document.addEventListener("keydown", async (event) => {
//   if (isTransitioning) {
//     return;
//   }
//   const step = 100;
//   pressedKeys.add(event.key.toLowerCase());
//   if (pressedKeys.has("a") && pressedKeys.has("w")) {
//     console.log("Both 'a' and 'w' keys are pressed simultaneously.");

//     // Calculate the new position based on a 120-degree angle
//     const step = 20;
//     const angle = (120 * Math.PI) / 180; // Convert degrees to radians
//     const deltaX = step * Math.cos(angle);
//     const deltaY = -step * Math.sin(angle); // Negative because the Y-axis is inverted on the screen

//     cubeLeft += deltaX;
//     cubeTop += deltaY;

//     isTransitioning = true;
//     cube.style.top = `${cubeTop}px`;
//     cube.style.left = `${cubeLeft}px`;

//     // Wait for the transition to finish
//     await new Promise((resolve) => setTimeout(resolve, 400)); // Use the actual duration of your transition

//     isTransitioning = false;
//   } else {
//     switch (event.key.toLowerCase()) {
//       case "w":
//         cubeTop -= step;
//         cube.style.top = `${cubeTop}px`;
//         break;
//       case "a":
//         cubeLeft -= step;
//         break;
//       case "s":
//         cubeTop += step;
//         cube.style.top = `${cubeTop}px`;
//         break;
//       case "d":
//         cubeLeft += step;
//         break;
//     }
//     isTransitioning = true;
//     cube.style.top = `${cubeTop}px`;
//     cube.style.left = `${cubeLeft}px`;

//     // Wait for the transition to finish
//     await new Promise((resolve) => setTimeout(resolve, 400)); // Use the actual duration of your transition

//     isTransitioning = false;
//   }
// });
// document.addEventListener("keyup", (event) => {
//   pressedKeys.delete(event.key.toLowerCase());
// });

// function moveCube() {
//   if (isMoving) {
//     const step = 5; // Adjust the step size as needed
//     cubeLeft += step;
//     cube.style.left = `${cubeLeft}px`;

//     // Continue moving as long as the key is held down
//     requestAnimationFrame(moveCube);
//   }
// }

const cube = document.getElementById("proba123");
let isMoving = false;
let cubeLeft = cube.getBoundingClientRect().x;

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "d" && !isMoving) {
    isMoving = true;
    lastFrameTime = performance.now();
    moveCube();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key.toLowerCase() === "d") {
    isMoving = false;
  }
});

function moveCube() {
  if (isMoving) {
      console.log("Ulazi ovde!");
      const step = 10; 
      
      cubeLeft += step;
      cube.style.left = `${cubeLeft}px`;
    requestAnimationFrame(moveCube);
  }
}
