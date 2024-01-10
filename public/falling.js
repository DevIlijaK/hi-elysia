// Pretvaranje ugla u radiane
var angleInRadians = (angle * Math.PI) / 180;

// Početna brzina u x i y smeru
var initialVelocityX = initialVelocity * Math.cos(angleInRadians);
var initialVelocityY = initialVelocity * Math.sin(angleInRadians);

function animate(currentTime) {
  const cubeRect = cube.getBoundingClientRect();

  const time = (initialTime - currentTime) / 1000;
  gravitation += time - 0.5 * gravity * Math.pow(time, 2);

  const topPosition = initialY + initialVelocityY * time - gravitation;

  const leftPosition = initialX - initialVelocityX * time;

  cube.style.top = topPosition + "px";
  cube.style.left = leftPosition + "px";

  if (cubeRect.bottom < window.innerHeight * 0.9) {
    requestAnimationFrame((newTime) => animate(newTime));
  } else {
    cubeLeft = cubeRect.left;
    cubeTop = cubeRect.top;
    cubeRight = cubeRect.right;
    cubeBottom = cubeRect.bottom;
  }
}

requestAnimationFrame((currentTime) => animate(currentTime));
