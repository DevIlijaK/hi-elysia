function gravityConfig(angle) {
  ugao = angle;
  silaPoX = 1.5 * Math.cos(ugao);
}

function gravityFall() {
  maxHeight = cubeTop + cubeHeight;

  cubeTop += 0.5 * gravity * Math.pow(time, 2);
  if (!isTouchingSides) {
    cubeLeft -= silaPoX * time;
    // console.log("Ulazi ovde!");
  }
  time++;
  // console.log("Ulazi ovde! ", cubeTop + cubeHeight);
  // console.log("Nestp: ", maxHeight);
  // console.log("Nestp: ", cubeTop + cubeHeight <= maxHeight);
  // if (cubeTop + cubeHeight <= maxHeight) {
  //   maxHeight = cubeTop + cubeHeight;
  // } else {
  //   isFalling = true;
  //   }
}
