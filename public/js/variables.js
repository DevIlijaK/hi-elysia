/**
 * HTML element variables
 */
var hero = document.getElementById("hero");
// var footer = document.getElementById("footer");
var elements = document.querySelectorAll(".ramp");

var minRampHeight = Number.MAX_SAFE_INTEGER;

/**
 * State variables
 */
var isJumping = false;
var isMoving = false;
var isFalling = false;
var isTouchingSides = false;
var isInitialAnimation = true;

/**
 * Pressed key variables
 */
var pressedKeys = new Set();
var jumpAnimation = new Set();
/**
 * Koordinate elemenata
 */
// var heroLeft = hero.getBoundingClientRect().left;
// var heroTop = hero.getBoundingClientRect().top;
// var heroHeight = hero.getBoundingClientRect().height;
// var heroWidth = hero.getBoundingClientRect().width;
// var footerTop = footer.getBoundingClientRect().top;
/**
 * Varijable vezane za ponasanje sistema
 */

// var initialVelocity = 800;

// var maxHeight = heroTop + heroWidth;
var obliqueAngle = 0;
var step = 10;

var time = 1;
var standingElement = null;

initialY = null;
initialX = null;
gravitationVelocity = 0;
