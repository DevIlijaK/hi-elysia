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
    if (isFalling) {
      cubeTop += step;
    }
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
    if (isFalling) {
      for (let i = 0; i < elements.length; i++) {
        let rect = elements[i].getBoundingClientRect();
        console.log(
          "cubeTop + cubeHeight > rect.top",
          cubeTop + cubeHeight > rect.top
        );
        console.log(
          "rect.left <= cubeLeft + cubeWidth ",
          rect.left <= cubeLeft + cubeWidth
        );
        console.log("maxHeight <= rect.top", maxHeight <= rect.top);
        console.log(
          "rect.left + rect.width >= cubeLeft",
          rect.left + rect.width >= cubeLeft
        );
        if (
          cubeTop + cubeHeight > rect.top &&
          maxHeight <= rect.top &&
          rect.left <= cubeLeft + cubeWidth &&
          rect.left + rect.width >= cubeLeft
        ) {
          cubeTop = rect.top - cubeHeight;
          jumpAnimation.clear();
          isJumping = false;
          maxHeight = rect.top;
          time = 0;
          isFalling = false;
          standingElement = rect;
        } else {
          isFalling = true;
        }
      }

      if (cubeTop + cubeHeight > footerTop) {
        cubeTop = footerTop - cubeHeight;
        jumpAnimation.clear();
        isJumping = false;
        maxHeight = footerTop;
        time = 0;
        isFalling = false;
        standingElement = footer.getBoundingClientRect();
      }
    }
    if (standingElement) {
      if (
        standingElement.left <= cubeLeft + cubeWidth &&
        standingElement.left + standingElement.width >= cubeLeft
      ) {
        // cubeTop = rect.top - cubeHeight;
        // jumpAnimation.clear();
        // isJumping = false;
        // maxHeight = rect.top;
        // time = 0;
        isFalling = false;
      } else {
        isFalling = true;
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
