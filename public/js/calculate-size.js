function handleResize() {
  console.log("Nova širina prozora: " + sirinaProzora + " piksela");
  console.log("Nova visina prozora: " + visinaProzora + " piksela");
}
var sirinaProzora = window.innerWidth;
var visinaProzora = window.innerHeight;
// Dodavanje event listenera za promene dimenzija prozora

function calculateRampHeight(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    console.log(' elements[i].id !== "footer"', elements[i].id !== "footer");
    if (
      elements[i + 1].getBoundingClientRect().top >
        elements[i].getBoundingClientRect().top &&
      elements[i].id !== "footer" &&
      elements[i + 1].id !== "footer"
    ) {
      let difference =
        elements[i + 1].getBoundingClientRect().top -
        elements[i].getBoundingClientRect().top;
      if (minRampHeight > difference) {
        minRampHeight = difference;
      }
    }
  }
}
var jumpVelocity = null;
function calculateInitialJumpVelocity() {
  jumpVelocity = minRampHeight * 0.045;
  console.log(jumpVelocity);
}
var gravity = 0.01;
function calculateInitialGravity() {
  gravity = minRampHeight * 0.00009;
  console.log(gravity);
}
var grid = document.getElementById("blogGrid");
htmx.on(grid, "htmx:afterOnLoad", (event) => {
  elements = document.querySelectorAll(".blogWrapper");
  window.addEventListener("resize", handleResize);
  console.log(event);
  for (let i = 0; i < elements.length - 1; i++) {
    elements[i].style.width = sirinaProzora * 0.25;
  }
});
