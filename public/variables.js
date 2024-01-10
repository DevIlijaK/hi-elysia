var cube = document.getElementById("proba123");
var footer = document.getElementById("footer");

var cubeLeft = cube.getBoundingClientRect().left;
var cubeTop = cube.getBoundingClientRect().top;
var cubeRight = cube.getBoundingClientRect().right;
var cubeBottom = cube.getBoundingClientRect().bottom;

var footerTop = footer.getBoundingClientRect().top;

var jumpVelocity = 450; // Početna brzina u pikselima po sekundi
/**
 * Varijable vezane za pocetnu animaciju
 */
var initialVelocity = 800; // Početna brzina u pikselima po sekundi

var gravity = 9.8; // Gravitaciona konstanta (može se prilagoditi)

