nesto();

document.addEventListener("keydown", (event) => {
  pressedKeys.add(event.key.toLowerCase());

  if (!isMoving) {
    isMoving = true;
    moveHero();
  }
});
jumpButton = document.getElementById("jumpButton");
leftButton = document.getElementById("leftButton");
rightButton = document.getElementById("rightButton");

jumpButton.addEventListener("touchstart", () => {
  console.log("Radi", event);
  pressedKeys.add("w");

  //  calculateRampHeight(elements);
  //  calculateInitialJumpVelocity();
  //  calculateInitialGravity();
  if (!isMoving) {
    isMoving = true;
    moveHero();
  }
});
jumpButton.addEventListener("touchend", () => {
  pressedKeys.delete("w");
});
leftButton.addEventListener("touchstart", () => {
  pressedKeys.add("a");

  //  calculateRampHeight(elements);
  //  calculateInitialJumpVelocity();
  //  calculateInitialGravity();
  if (!isMoving) {
    isMoving = true;
    moveHero();
  }
});
leftButton.addEventListener("touchend", () => {
  pressedKeys.delete("a");
});

rightButton.addEventListener("touchstart", () => {
  pressedKeys.add("d");

  //  calculateRampHeight(elements);
  //  calculateInitialJumpVelocity();
  //  calculateInitialGravity();
  if (!isMoving) {
    isMoving = true;
    moveHero();
  }
});
rightButton.addEventListener("touchend", () => {
  pressedKeys.delete("d");
});
// htmx.addClass(hero, "hidden");

document.addEventListener("click", (event) => {
  // var music = new Howl({
  //   src: ["/blog/file123"],
  //   autoplay: false,
  //   loop: true,
  //   duration: 3000,
  //   format: "mp3"
  // });
  // console.log('Ulazi ovde: ', music)
  // var bodyElement = document.body;
  // bodyElement.requestFullscreen();
  // //isMoving = false;
  // music.play();
});
document.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
  // if (pressedKeys.size == 0 && !isJumping) {
  //   isMoving = false;
  // }
});
// document.addEventListener("click", (event) => {
//   pressedKeys.delete(event.key.toLowerCase());
//   // if (pressedKeys.size == 0 && !isJumping) {
//   //   isMoving = false;
//   // }
// });
function moveHero() {
  if (isMoving) {
    if (
      (pressedKeys.has("a") && pressedKeys.has("w")) ||
      jumpAnimation.has("aw")
    ) {
      if (!isJumping) {
        obliqueThrowConfig(45, "aw");
      }
      throwAnimation();
    }
    // else if (pressedKeys.has("a") && pressedKeys.has("s")) {
    //   moveDiagonaly(225);
    // }
    else if (
      (pressedKeys.has("d") && pressedKeys.has("w")) ||
      jumpAnimation.has("dw")
    ) {
      if (!isJumping) {
        obliqueThrowConfig(125, "dw");
      }
      throwAnimation();
    }
    //  else if (pressedKeys.has("d") && pressedKeys.has("s")) {
    //   moveDiagonaly(315);
    // }
    else {
      if (!isFalling) {
        // console.log("Falling", !isJumping && pressedKeys.has("w"))
        // console.log("jumpAnimation.has(w)", jumpAnimation.has("w"))
        if ((!isJumping && pressedKeys.has("w")) || jumpAnimation.has("w")) {
          if (!isJumping) {
            obliqueThrowConfig(90, "w");
          }
          throwAnimation();
        } else {
          if (pressedKeys.has("d")) {
            heroLeft += step;
          } else if (pressedKeys.has("a")) {
            heroLeft -= step;
          }
          //  else if (pressedKeys.has("s")) {
          // heroTop += step;
          // }
        }
      }
    }
    if (isFalling) {
      if (!isJumping) {
        gravityFall();
      }

      for (let i = 0; i < platforms.length; i++) {
        let rect = null;
        if (platforms[i].querySelector(".ramp")) {
          rect = platforms[i].querySelector(".ramp").getBoundingClientRect();
        } else {
          rect = platforms[i].getBoundingClientRect();
        }
        // if (elements[i].id == "footer") {
        // console.log(
        //   "heroTop + heroHeight > rect.top",
        //   heroTop + heroHeight > rect.top
        // );
        // console.log("maxHeight <= rect.top", maxHeight <= rect.top);
        // console.log(
        //   "rect.left <= heroLeft + heroWidth ",
        //   rect.left <= heroLeft + heroWidth
        // );
        // console.log(
        //   "rect.left + rect.width >= heroLeft",
        //   rect.left + rect.width >= heroLeft
        // );
        // console.log("heroTop", heroTop);
        // console.log("rect top: ", rect.top);

        // console.log("heroTop < rect.top", heroTop < rect.top);
        // }

        // console.log(
        //   "1 heroTop + heroHeight > rect.top",
        //   heroTop + heroHeight > rect.top
        // );
        // console.log("maxHeight <= rect.top", maxHeight <= rect.top);
        // console.log(
        //   "rect.left <= heroLeft + heroWidth ",
        //   rect.left <= heroLeft + heroWidth
        // );
        // console.log(
        //   "rect.left + rect.width >= heroLeft",
        //   rect.left + rect.width >= heroLeft
        // );
        if (
          heroTop + heroHeight > rect.top &&
          heroTop < rect.top &&
          maxHeight <= rect.top &&
          rect.left <= heroLeft + heroWidth &&
          rect.left + rect.width >= heroLeft
        ) {
          heroTop = rect.top - heroHeight;
          jumpAnimation.clear();
          isJumping = false;
          maxHeight = rect.top;
          time = 1;
          isFalling = false;
          gravitationVelocity = 0;
          standingElement = { dimension: rect, platform: platforms[i] };
        } else {
          isFalling = true;
        }
      }
    } else {
      if (pressedKeys.has("d")) {
        gravityConfig(3.14159);
      } else if (pressedKeys.has("a")) {
        gravityConfig(0);
      }
    }
    if (standingElement) {
      if (
        standingElement.dimension.left <= heroLeft + heroWidth &&
        standingElement.dimension.left + standingElement.dimension.width >=
          heroLeft
      ) {
        if (pressedKeys.has("k")) {
          enterBlog(standingElement);
          isMoving = false;
        }
        isFalling = false;
      } else {
        isFalling = true;
      }
    } else {
      isFalling = true;
    }
    if (heroLeft <= 0 || heroLeft + heroWidth >= window.innerWidth) {
      heroLeft <= 0
        ? (heroLeft = 0)
        : (heroLeft = window.innerWidth - heroWidth);
      isTouchingSides = true;
    } else {
      isTouchingSides = false;
    }
    if (pressedKeys.has("j")) {
      blogContainer.remove();
      const content = document.getElementById("content");
      content.append(grid);
      gameWrapper.style.backgroundImage = gitBackgroundImageValue;
      isMoving = false;
    }
    // console.log(isTouchingSides);
    hero.style.top = `${heroTop}px`;
    hero.style.left = `${heroLeft}px`;
    requestAnimationFrame(moveHero);
  }
}

function moveDiagonaly(degree) {
  const angle = (degree * Math.PI) / 180;
  const deltaX = step * Math.cos(angle);
  const deltaY = -step * Math.sin(angle);
  heroLeft += deltaX;
  heroTop += deltaY;
}

function enterBlog(element) {
  const url = element.platform
    .querySelector(".blogCart")
    .getAttribute("hx-get");
  htmx
    .ajax("GET", url, {
      target: "#content",
      swap: "innerHTML",
    })
    .then(() => enterReadingBlogPage());
  console.log(
    "Element je: ",
    element.platform.querySelector(".blogCart").getAttribute("hx-get")
  );
}
function enterReadingBlogPage() {
  standingElement = null;
  blogContainer = document.querySelector(".blogTextContainer");
  console.log("Element je: ", blogContainer);
  blogContainer.style.maxHeight = `${windowHeight * 0.8}px`;
  console.log("Ulazi ovde ");
  gameWrapper.style.backgroundImage = staticBackgroundImageValue;
  // document.getElementById("content").append(grid);
}
