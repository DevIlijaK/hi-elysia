function throwAnimation() {
  console.log("Ulazi ovde!", isMoving);
  gravitationVelocity += 0.5 * gravity * Math.pow(time, 2);

  cubeTop = initialY - initialVelocityY * time + gravitationVelocity;

  cubeLeft = Math.round(initialX - initialVelocityX * time);
  time++;

  if (cubeTop + cubeHeight < maxHeight) {
    maxHeight = cubeTop + cubeHeight;
  } else {
    for (let i = 0; i < elements.length; i++) {
      let rect = elements[i].getBoundingClientRect();
      if (cubeTop + cubeHeight > rect.top && maxHeight < rect.top) {
        cubeTop = rect.top - cubeHeight;
        jumpAnimation.clear();
        isJumping = false;
        maxHeight = Number.MAX_SAFE_INTEGER;
        time = 0;
      }
    }
  }

  if (cubeTop + cubeHeight > footerTop) {
    cubeTop = footerTop - cubeHeight;
    jumpAnimation.clear();
    isJumping = false;
    maxHeight = Number.MAX_SAFE_INTEGER;
    time = 0;
  }
}

function obliqueThrowConfig(angle, key) {
  isJumping = true;
  initialY = cubeTop;
  initialX = cubeLeft;
  obliqueAngle = angle;
  angleInRadians = (obliqueAngle * Math.PI) / 180;

  initialVelocityX = jumpVelocity * Math.cos(angleInRadians);
  initialVelocityY = jumpVelocity * Math.sin(angleInRadians);
  gravitationVelocity = 0;
  jumpAnimation.add(key);
}
