document.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key.toLowerCase());
  elements = document.querySelectorAll(".ramp");
  if (!isMoving) {
    isMoving = true;
    moveCube();
  }
});

document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
  // if (pressedKeys.size == 0 && !isJumping) {
  //   isMoving = false;
  // }
});

function moveCube() {
  if (isMoving) {
    if (
      (pressedKeys.has("a") && pressedKeys.has("w")) ||
      jumpAnimation.has("aw")
    ) {
      if (!isJumping) {
        obliqueThrowConfig(45, "aw");
      }
      throwAnimation();
    } else if (pressedKeys.has("a") && pressedKeys.has("s")) {
      moveDiagonaly(225);
    } else if (
      (pressedKeys.has("d") && pressedKeys.has("w")) ||
      jumpAnimation.has("dw")
    ) {
      if (!isJumping) {
        obliqueThrowConfig(125, "dw");
      }
      throwAnimation();
    } else if (pressedKeys.has("d") && pressedKeys.has("s")) {
      moveDiagonaly(315);
    } else {
      if (pressedKeys.has("d")) {
        cubeLeft += step;
      } else if (pressedKeys.has("w") || jumpAnimation.has("w")) {
        if (!isJumping) {
          obliqueThrowConfig(90, "w");
        }
        throwAnimation();
      } else if (pressedKeys.has("a")) {
        cubeLeft -= step;
      } else if (pressedKeys.has("s")) {
        cubeTop += step;
      }
    }
    cube.style.top = `${cubeTop}px`;
    cube.style.left = `${cubeLeft}px`;
    requestAnimationFrame(moveCube);
  }
}

function moveDiagonaly(degree) {
  const angle = (degree * Math.PI) / 180;
  const deltaX = step * Math.cos(angle);
  const deltaY = -step * Math.sin(angle);
  cubeLeft += deltaX;
  cubeTop += deltaY;
}
