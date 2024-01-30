function throwAnimation() {
  gravitationVelocity += 0.5 * gravity * Math.pow(time, 2);

  heroTop = initialY - initialVelocityY * time + gravitationVelocity;
  if (!isTouchingSides) {
    heroLeft = Math.round(initialX - initialVelocityX * time);
    // console.log("Ulazi ovde!");
  }
  time += 1.5;
  // console.log("Ulazi ovde! ", heroTop + heroHeight);
  // console.log("Nestp: ", maxHeight);
  // console.log("Nestp: ", heroTop + heroHeight <= maxHeight);
  if (heroTop + heroHeight <= maxHeight) {
    maxHeight = heroTop + heroHeight;
  } else {
    isFalling = true;
  }
}

function obliqueThrowConfig(angle, key) {
  isJumping = true;
  initialY = heroTop;
  initialX = heroLeft;
  obliqueAngle = angle;
  angleInRadians = (obliqueAngle * Math.PI) / 180;

  initialVelocityX = jumpVelocity * Math.cos(angleInRadians);
  initialVelocityY = jumpVelocity * Math.sin(angleInRadians);
  gravitationVelocity = 0;
  jumpAnimation.add(key);
}
