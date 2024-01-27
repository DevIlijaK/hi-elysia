var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
// Dodavanje event listenera za promene dimenzija prozora

var startGameButton = document.getElementById("startGame");
startGameButton.onclick = () => {
  document.body.requestFullscreen();
  cube.style.display = "";
  loadElements();
  startGameButton.style.display = "none";
};

var jumpVelocity = null;

var gravity = 0.01;

// window.addEventListener("load");

function loadElements() {
  sirinaProzora = window.innerWidth;
  visinaProzora = window.innerHeight;
  grid = document.getElementById("blogGrid");
  var numberOfColumns = 1;
  if (windowWidth >= 1024) {
    numberOfColumns = 3;
  } else if (windowWidth >= 768) {
    numberOfColumns = 2;
  }
  htmx
    .ajax(
      "POST",
      "/blog/posts",

      {
        target: "#blogGrid",
        swap: "innerHTML",
        values: {
          page: 0,
          offset: 3 * numberOfColumns,
        },
      }
    )
    .then(() => {
      setElementSize();
    });
}

var grid = document.getElementById("blogGrid");

// window.addEventListener("resize", setElementSize);
function setElementSize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  setHeaderFooterHeight();
  wrappers = document.querySelectorAll(".blogWrapper");
  elements = document.querySelectorAll(".ramp");
  buttons = document.querySelectorAll(".button");

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
  grid.style.gridTemplateColumns = `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  grid.style.columnGap = `${windowWidth * columnGapPercentage}px`;
  grid.style.rowGap = `${windowHeight * rowGapPercentage}px`;
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
    blogCartTextTitle.style.height = `${totalHeightInformationDiv * 0.2}px`;
    blogCartTextShortDescription.style.height = `${
      totalHeightInformationDiv * 0.5
    }px`;
    // var visinaParagrafa = totalHeightInformationDiv * 0.4;

    blogCartTextShortDescription.style.fontSize = shortDescriptionFontSize;
    // blogCartTextShortDescription.style.fontSize =
    //   shortDescriptionFontSize + "px";
    // blogCartTextShortDescription.style.lineHeight =
    //   shortDescriptionLineHeight + "px";
    blogCartTextDate.style.height = `${totalHeightInformationDiv * 0.3}px`;
    // blogCartTextDate.style.fontSize = newSize;

    /**
     * Varijable za skok
     */
    minRampHeight = windowHeight * 0.25;
    jumpVelocity = minRampHeight * 0.04;
    gravity = minRampHeight * 0.00009;
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.width = `${windowWidth * 0.33}px`;
    buttons[i].style.height = `${windowHeight * 0.1}px`;
  }
}

function setHeaderFooterHeight() {
  header = document.getElementById("header");
  footer = document.getElementById("footer");
  header.style.height = `${windowHeight * 0.1}px`;
  footer.style.height = `${windowHeight * 0.1}px`;
}