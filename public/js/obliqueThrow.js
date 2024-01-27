function throwAnimation() {
  gravitationVelocity += 0.5 * gravity * Math.pow(time, 2);

  cubeTop = initialY - initialVelocityY * time + gravitationVelocity;
  if (!isTouchingSides) {
    cubeLeft = Math.round(initialX - initialVelocityX * time);
    // console.log("Ulazi ovde!");
  }
  time += 3;
  // console.log("Ulazi ovde! ", cubeTop + cubeHeight);
  // console.log("Nestp: ", maxHeight);
  // console.log("Nestp: ", cubeTop + cubeHeight <= maxHeight);
  if (cubeTop + cubeHeight <= maxHeight) {
    maxHeight = cubeTop + cubeHeight;
  } else {
    isFalling = true;
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
