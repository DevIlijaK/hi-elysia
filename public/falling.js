// Pretvaranje ugla u radiane
var angleInRadians = (angle * Math.PI) / 180;

// Početna brzina u x i y smeru
var initialVelocityX = initialVelocity * Math.cos(angleInRadians);
var initialVelocityY = initialVelocity * Math.sin(angleInRadians);
var gravitationVelocity = 0;

function animate(currentTime) {
  const time = (initialTime - currentTime) / 1000;
  gravitationVelocity += time - 0.5 * gravity * Math.pow(time, 2);

  const topPosition = initialY + initialVelocityY * time - gravitationVelocity;

  const leftPosition = initialX - initialVelocityX * time;

  cube.style.top = topPosition + "px";
  cube.style.left = leftPosition + "px";
  const cubeRect = cube.getBoundingClientRect();
  if (cubeRect.bottom < footerTop) {
    requestAnimationFrame((newTime) => animate(newTime));
  } else {
    cube.style.top = footerTop - cubeRect.height + "px";
    cubeLeft = cubeRect.left;
    cubeTop = footerTop - cubeRect.height;
    cubeRight = cubeRect.right;
    cubeBottom = footerTop;
  }
}

requestAnimationFrame((currentTime) => animate(currentTime));
