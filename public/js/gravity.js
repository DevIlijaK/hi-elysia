function gravityConfig(angle) {
  ugao = angle;
  silaPoX = Math.cos(ugao) * 0.3;
}

function gravityFall() {
  maxHeight = cubeTop + cubeHeight;

  cubeTop += 0.5 * gravity * Math.pow(time, 2);
  if (!isTouchingSides) {
    cubeLeft -= silaPoX * time;
    // console.log("Ulazi ovde!");
  }
  time += 3;
  // console.log("Ulazi ovde! ", cubeTop + cubeHeight);
  // console.log("Nestp: ", maxHeight);
  // console.log("Nestp: ", cubeTop + cubeHeight <= maxHeight);
  // if (cubeTop + cubeHeight <= maxHeight) {
  //   maxHeight = cubeTop + cubeHeight;
  // } else {
  //   isFalling = true;
  //   }
}
