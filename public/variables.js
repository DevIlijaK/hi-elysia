/**
 * HTML element variables
 */
var cube = document.getElementById("proba123");
var footer = document.getElementById("footer");
var elements = document.querySelectorAll(".ramp");
/**
 * State variables
 */
var isJumping = false;
var isMoving = false;

/**
 * Pressed key variables
 */
var pressedKeys = new Set();
var jumpAnimation = new Set();
/**
 * Koordinate elemenata
 */
var cubeLeft = cube.getBoundingClientRect().left;
var cubeTop = cube.getBoundingClientRect().top;
var cubeHeight = cube.getBoundingClientRect().height;
var footerTop = footer.getBoundingClientRect().top;
/**
 * Varijable vezane za ponasanje sistema
 */
var jumpVelocity = 25;
// var initialVelocity = 800;
var gravity = 0.1;
var maxHeight = Number.MAX_SAFE_INTEGER;
var obliqueAngle = 0;
var step = 10;

var time = 0;
