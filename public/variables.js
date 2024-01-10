var cube = document.getElementById("proba123");

var cubeLeft = cube.getBoundingClientRect().left;
var cubeTop = cube.getBoundingClientRect().top;
var cubeRight = cube.getBoundingClientRect().right;
var cubeBottom = cube.getBoundingClientRect().bottom;

/**
 * Varijable vezane za pocetnu animaciju
 */
var initialVelocity = 800; // Početna brzina u pikselima po sekundi
var angle = 70; // Ugao kosog hitca u stepenima
var gravity = 9.8; // Gravitaciona konstanta (može se prilagoditi)
var initialY = cube.getBoundingClientRect().y;
var initialX = cube.getBoundingClientRect().x;
var initialTime = performance.now();
var gravitation = 0;


