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
    }
    // else if (pressedKeys.has("a") && pressedKeys.has("s")) {
    //   moveDiagonaly(225);
    // }
    else if (
      (pressedKeys.has("d") && pressedKeys.has("w")) ||
      jumpAnimation.has("dw")
    ) {
      if (!isJumping) {
        obliqueThrowConfig(125, "dw");
      }
      throwAnimation();
    }
    //  else if (pressedKeys.has("d") && pressedKeys.has("s")) {
    //   moveDiagonaly(315);
    // }
    else {
      if (!isFalling) {
        if ((!isJumping && pressedKeys.has("w")) || jumpAnimation.has("w")) {
          if (!isJumping) {
            obliqueThrowConfig(90, "w");
          }
          throwAnimation();
        } else {
          if (pressedKeys.has("d")) {
            cubeLeft += step;
          } else if (pressedKeys.has("a")) {
            cubeLeft -= step;
          }
          //  else if (pressedKeys.has("s")) {
          // cubeTop += step;
          // }
        }
      }
    }
    if (isFalling) {
      if (!isJumping) {
        gravityFall();
      }

      for (let i = 0; i < elements.length; i++) {
        let rect = elements[i].getBoundingClientRect();
        if (elements[i].id == "footer") {
          console.log("1");
          console.log("cubeLeft", cubeLeft);
          console.log("rect.left + rect.width", rect.left + rect.width);
          console.log(
            "rect.left + rect.width >= cubeLeft",
            rect.left + rect.width >= cubeLeft
          );
        }
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
          gravitationVelocity = 0;
          standingElement = rect;
        } else {
          isFalling = true;
        }
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
    } else {
      isFalling = true;
    }
    if (cubeLeft <= 0 || cubeLeft + cubeWidth >= window.innerWidth) {
      cubeLeft <= 0
        ? (cubeLeft = 0)
        : (cubeLeft = window.innerWidth - cubeWidth);
      isTouchingSides = true;
    } else {
      isTouchingSides = false;
    }

    // console.log(isTouchingSides);
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
