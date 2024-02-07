/**
 * HTML Elements
 */

var buttons = document.querySelectorAll(".button");
var header = document.getElementById("header");
var footer = document.getElementById("footer");
var blogGrid = document.getElementById("blogGrid");
var startGameButton = document.getElementById("startGame");
/**
 * Na ovom elementu se manja pozadinska slika
 */
var gameWrapper = document.getElementById("gameWrapper");
/**
 * Ovaj element se koristi samo da drzi pozadinsku static sliku
 */
var staticImageElement = document.getElementById("staticImage");
var staticBackgroundImageValue = window
  .getComputedStyle(staticImageElement)
  .getPropertyValue("background-image");
var gifBackgroundImageValue = window
  .getComputedStyle(gameWrapper)
  .getPropertyValue("background-image");

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var blogContainer = null;
var platforms = [footer];
var heroLeft = null;
var heroTop = null;
var heroHeight = null;
var heroWidth = null;
var footerTop = null;
var step = null;
/**
 * Ovo mora da se refakotrise
 */
var cartPlatformArray = [];
var maxHeight = null;
/**
 * Postavlja veličinu dugmića
 */

setControllsButtonSize(buttons);
setHeaderFooterHeight();

startGameButton.onclick = () => {
  document.body.requestFullscreen();

  windowWidth = window.screen.width;
  windowHeight = window.screen.height;
  loadElements();
  startGameButton.style.display = "none";
};

var jumpVelocity = null;

var gravity = 0.01;

// window.addEventListener("load");

function loadElements() {
  var numberOfColumns = 1;
  if (windowWidth >= 1024) {
    numberOfColumns = 3;
  } else if (windowWidth >= 768) {
    numberOfColumns = 2;
  }
  htmx
    .ajax("POST", "/blog/posts", {
      target: "#blogGrid",
      swap: "innerHTML",
      values: {
        page: 0,
        offset: 3 * numberOfColumns,
      },
    })
    .then(() => {
      setElementSize();
    });
}

window.addEventListener("resize", () => setElementSize());
function setElementSize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  wrappers = document.querySelectorAll(".blogWrapper");
  // elements = wrappers.querySelectorAll(".ramp");
  platforms = [...platforms, ...wrappers];
  let widthPercentage = 0.7;
  let heightPercentage = 0.2;
  let columnGapPercentage = 0.1;
  let rowGapPercentage = 0.05;
  let numberOfColumns = 1;
  let shortDescriptionFontSize = 8;
  let shortDescriptionLineHeight = 8;
  if (windowWidth >= 1280) {
    widthPercentage = 0.2;
    // heightPercentage = 0.2;
    numberOfColumns = 3;
    shortDescriptionFontSize = 10;
    shortDescriptionLineHeight = 10;
  } else if (windowWidth >= 1024) {
    widthPercentage = 0.2;
    numberOfColumns = 3;
    shortDescriptionFontSize = 10;
    shortDescriptionLineHeight = 10;
    // shortDescriptionFontSize=
  } else if (windowWidth >= 768) {
    widthPercentage = 0.3;
    numberOfColumns = 2;
  }
  blogGrid.style.gridTemplateColumns = `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  blogGrid.style.columnGap = `${windowWidth * columnGapPercentage}px`;
  blogGrid.style.rowGap = `${windowHeight * rowGapPercentage}px`;
  setBlogCartDymensions(
    widthPercentage,
    heightPercentage,
    shortDescriptionFontSize,
    shortDescriptionLineHeight
  );
  setHeaderFooterHeight();
  setControllsButtonSize(buttons);
  setHeroDymension();
  /**
   * Varijable za skok
   */
  minRampHeight = windowHeight * 0.25;
  jumpVelocity = minRampHeight * 0.04;
  gravity = minRampHeight * 0.00005;

  step = windowWidth * 0.002;
}

function setHeaderFooterHeight() {
  header.style.height = `${windowHeight * 0.1}px`;
  footer.style.height = `${windowHeight * 0.1}px`;
}
function setHeroDymension() {
  heroHeight = windowHeight * 0.1;
  heroWidth = windowWidth * 0.05;
  hero.style.height = `${heroHeight}px`;
  hero.style.width = `${heroWidth}px`;
  heroLeft = hero.getBoundingClientRect().left;
  heroTop = hero.getBoundingClientRect().top;
  maxHeight = heroTop + heroHeight;
  hero.style.display = "";
}
function setBlogCartDymensions(
  widthPercentage,
  heightPercentage,
  shortDescriptionFontSize
) {
  for (let i = 0; i < wrappers.length; i++) {
    let rampWidth = windowWidth * widthPercentage;
    let rampHeight = windowHeight * heightPercentage;
    wrappers[i].style.width = `${rampWidth}px`;
    wrappers[i].style.height = `${rampHeight}px`;

    var blogCartInformation = wrappers[i].querySelector(".blogCart");
    var blogCartPlatform = wrappers[i].querySelector(".ramp");

    blogCartInformation.style.height = `${rampHeight * 0.8}px`;
    blogCartPlatform.style.height = `${rampHeight * 0.2}px`;

    var arrayPictureText = blogCartInformation.getElementsByTagName("div");
    var blogCartPicture = arrayPictureText[0];
    var blogCartText = arrayPictureText[1];

    blogCartPicture.style.height = `${rampHeight * 0.8}px`;
    blogCartPicture.style.width = `${rampWidth * 0.4}px`;
    blogCartText.style.height = `${rampHeight * 0.8}px`;
    blogCartText.style.width = `${rampWidth * 0.6}px`;
    var blogCartTextElements = blogCartText.getElementsByTagName("*");

    var blogCartTextTitle = blogCartTextElements[0];
    var blogCartTextShortDescription = blogCartTextElements[1];
    var blogCartTextDate = blogCartTextElements[2];
    var totalHeightInformationDiv = rampHeight * 0.8;
    var totalWidthInformationDiv = rampWidth * 0.6;
    blogCartTextTitle.style.height = `${totalHeightInformationDiv * 0.3}px`;
    blogCartTextTitle.style.width = `${totalWidthInformationDiv}px`;
    blogCartTextTitle.style.fontSize = `${
      totalHeightInformationDiv * 0.3 * 0.25
    }px`;
    blogCartTextTitle.style.wordWrap = `break-word`;
    blogCartTextShortDescription.style.height = `${
      totalHeightInformationDiv * 0.5
    }px`;
    // var visinaParagrafa = totalHeightInformationDiv * 0.4;

    blogCartTextShortDescription.style.fontSize = shortDescriptionFontSize;

    blogCartTextDate.style.height = `${totalHeightInformationDiv * 0.2}px`;
    blogCartTextDate.style.fontSize = `${
      totalHeightInformationDiv * 0.3 * 0.15
    }px`;
    // blogCartTextDate.style.fontSize = newSize;
  }
}
function setControllsButtonSize(buttons) {
  // Dodavanje event listenera za promene dimenzija prozora
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.width = `${windowWidth * 0.33}px`;
    buttons[i].style.height = `${windowHeight * 0.1}px`;
  }
}
