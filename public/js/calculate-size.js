var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
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
window.addEventListener("load", () => {
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
});
var grid = document.getElementById("blogGrid");

window.addEventListener("resize", setElementSize);
function setElementSize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  setHeaderFooterHeight();
  wrappers = document.querySelectorAll(".blogWrapper");
  elements = document.querySelectorAll(".ramp");
  buttons = document.querySelectorAll(".button");

  let widthPercentage = 0.7;
  let heightPercentage = 0.15;
  let numberOfColumns = 1;
  if (windowWidth >= 1280) {
    widthPercentage = 0.2;
    numberOfColumns = 3;
  } else if (windowWidth >= 1024) {
    widthPercentage = 0.2;
    numberOfColumns = 3;
  } else if (windowWidth >= 768) {
    widthPercentage = 0.3;
    numberOfColumns = 2;
  }
  grid.style.gridTemplateColumns = `repeat(${numberOfColumns}, minmax(0, 1fr))`;
  for (let i = 0; i < wrappers.length; i++) {
    let rampWidth = windowWidth * widthPercentage;
    let rampHeight = windowHeight * heightPercentage;
    wrappers[i].style.width = `${rampWidth}px`;
    wrappers[i].style.height = `${rampHeight}px`;

    // console.log("Nesto: ", wrappers[i].style.gridTemplateColumns);

    var arrayPlatformInformation = wrappers[i].getElementsByTagName("div");
    var arrayPictureText =
      arrayPlatformInformation[0].getElementsByTagName("div");
    // Dohvatanje drugog div-a (indeks 1 jer indeksi kreću od 0)
    var blogCartInformation = arrayPlatformInformation[0];
    var platformCart = arrayPlatformInformation[1];
    blogCartInformation.style.height = `${rampHeight * 0.8}px`;
    platformCart.style.height = `${rampHeight * 0.2}px`;

    var blogCartPicture = arrayPictureText[0];
    var blogCartText = arrayPictureText[1];
    blogCartPicture.style.height = `${rampHeight * 0.8}px`;
    blogCartPicture.style.width = `${rampWidth * 0.4}px`;
    blogCartText.style.height = `${rampHeight * 0.8}px`;
    blogCartText.style.width = `${rampWidth * 0.6}px`;
    var blogCartTextElements = blogCartText.getElementsByTagName("*");
    // for (var j = 0; j < blogCartTextElements.length; j++) {
    //   blogCartTextElements[j].style.color = "red"; // Primer: postavi boju teksta na crveno
    // }
    var blogCartTextTitle = blogCartTextElements[0];
    var blogCartTextShortDescription = blogCartTextElements[1];
    var blogCartTextDate = blogCartTextElements[2];

    var totalHeightInformationDiv = rampHeight * 0.8;
    console.log("Nesto je; ", totalHeightInformationDiv);
    blogCartTextTitle.style.height = `${totalHeightInformationDiv * 0.2}px`;
    blogCartTextShortDescription.style.height = `${
      totalHeightInformationDiv * 0.5
    }px`;
    var visinaParagrafa = totalHeightInformationDiv * 0.4;

    var newSize = visinaParagrafa / 4 + "px";
    console.log("Nesto Bla", newSize);
    blogCartTextShortDescription.style.fontSize = newSize;
    blogCartTextShortDescription.style.lineHeight = newSize;
    blogCartTextDate.style.height = `${totalHeightInformationDiv * 0.3}px`;
    blogCartTextDate.style.fontSize = newSize;
    console.log("Nakon je: ", blogCartTextDate);
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
