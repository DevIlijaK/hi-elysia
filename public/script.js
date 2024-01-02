const cube = document.getElementById("proba123");
console.log("Ulazi ovde", cube.getBoundingClientRect());
console.log("Ulazi ovde", cube.style.left);
let cubeTop = 0;
let cubeLeft = 0;

document.addEventListener("keydown", (event) => {
  const step = 10;

  switch (event.key.toLowerCase()) {
    case "w":
      console.log("w");
      cubeTop -= step;
      break;
    case "a":
      cubeLeft -= step;
      break;
    case "s":
      cubeTop += step;
      break;
    case "d":
      cubeLeft += step;
      break;
  }

  cube.style.top = `${cubeTop}px`;
  cube.style.left = `${cubeLeft}px`;
});
