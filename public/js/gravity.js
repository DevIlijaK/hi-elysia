function gravityConfig(angle) {
  ugao = angle;
  silaPoX = Math.cos(ugao) * 0.3;
}

function gravityFall() {
  maxHeight = heroTop + heroHeight;

  heroTop += 0.5 * gravity * Math.pow(time, 2);
  if (!isTouchingSides) {
    heroLeft -= silaPoX * time;
    // console.log("Ulazi ovde!");
  }
  time += 3;
  // console.log("Ulazi ovde! ", heroTop + heroHeight);
  // console.log("Nestp: ", maxHeight);
  // console.log("Nestp: ", heroTop + heroHeight <= maxHeight);
  // if (heroTop + heroHeight <= maxHeight) {
  //   maxHeight = heroTop + heroHeight;
  // } else {
  //   isFalling = true;
  //   }
}
