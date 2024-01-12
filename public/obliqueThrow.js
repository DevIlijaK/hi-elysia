function obliqueThrow(angle) {
  isJumping = true;
  initialY = cube.getBoundingClientRect().y;
  initialX = cube.getBoundingClientRect().x;
  initialTime = performance.now();
  // Pretvaranje ugla u radiane
  angleInRadians = (angle * Math.PI) / 180;

  // Početna brzina u x i y smeru
  initialVelocityX = jumpVelocity * Math.cos(angleInRadians);
  initialVelocityY = jumpVelocity * Math.sin(angleInRadians);
  gravitationVelocity = 0;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  function throwAnimation(currentTime) {
    const cubeRect = cube.getBoundingClientRect();

    const time = ((initialTime - currentTime) / 1000).toFixed(3);;
    gravitationVelocity += time - 0.5 * gravity * Math.pow(time, 2);

    const topPosition =
      initialY + initialVelocityY * time - gravitationVelocity;

    const leftPosition = initialX - initialVelocityX * time;

    console.log("topPosition", topPosition);

    cube.style.top = Math.round(topPosition) + "px";
    cube.style.left = leftPosition + "px";
    if (topPosition + cubeRect.height < maxHeight) {
      maxHeight = topPosition + cubeRect.height;
    } else {
      for (let i = 0; i < elements.length; i++) {
        let rect = elements[i].getBoundingClientRect();
        console.log("Bottom ej: " + cubeRect.bottom);
        console.log("rect.top: " + rect.top);
        if (cubeRect.bottom > rect.top && maxHeight < rect.top) {
          isJumping = false;
          isMoving = false;
          cube.style.top = rect.top - cubeRect.height + "px";
          cubeLeft = cubeRect.left;
          cubeTop = rect.top - cubeRect.height;
          cubeRight = cubeRect.right;
          cubeBottom = rect.top;
          cancelAnimationFrame(mainJumpAnimation);
          cancelAnimationFrame(sideJumpAnimation);
          cancelAnimationFrame(cubeMoveAnimation);
          return;
        }
      }
    }
    if (cubeRect.bottom <= footerTop) {
      mainJumpAnimation = requestAnimationFrame((newTime) =>
        throwAnimation(newTime)
      );
    } else {
      console.log("Uslo ovde");
      isJumping = false;
      isMoving = false;
      cube.style.top = footerTop - cubeRect.height + "px";
      cubeLeft = cubeRect.left;
      cubeTop = footerTop - cubeRect.height;
      cubeRight = cubeRect.right;
      cubeBottom = footerTop;
      cancelAnimationFrame(mainJumpAnimation);
      cancelAnimationFrame(sideJumpAnimation);
      cancelAnimationFrame(cubeMoveAnimation);
    }
  }
  requestAnimationFrame((currentTime) => throwAnimation(currentTime));
}
