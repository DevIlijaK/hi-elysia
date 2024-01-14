function gravityFall() {
  gravitationVelocity += 0.5 * gravity * Math.pow(time, 2);

  cubeTop += gravitationVelocity;

  //   cubeLeft = cubeLeft * time;
  time++;
  //   console.log("Ulazi ovde! ", cubeTop + cubeHeight);
  //   console.log("Nestp: ", maxHeight);
  //   console.log("Nestp: ", cubeTop + cubeHeight <= maxHeight);
  //   if (cubeTop + cubeHeight <= maxHeight) {
  //     maxHeight = cubeTop + cubeHeight;
  //   } else {
  //     isFalling = true;
  //   }
}

// function gravityFallConfig() {
//   initialY = cubeTop;
//   initialX = cubeLeft;
//   obliqueAngle = 90;
//   angleInRadians = (obliqueAngle * Math.PI) / 180;
//   gravitationVelocity = 0;
// }
