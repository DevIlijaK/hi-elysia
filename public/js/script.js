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
    // console.log('Ulazi ovde keyup: ', isDynamicPictureActive)
    if (pressedKeys.size === 0 && !isJumping) {

        // console.log('Ulazi ovde keyup: ', isDynamicPictureActive)
        isDynamicPictureActive = false
        // changeHeroPicture(standingImageUrl);
    }
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
                hero.src = jumpLeftImageUrl;
                isDynamicPictureActive = true
                console.log('Ulazi ovde')
            }
            throwAnimation();
        } else if (
            (pressedKeys.has("d") && pressedKeys.has("w")) ||
            jumpAnimation.has("dw")
        ) {
            if (!isJumping) {
                obliqueThrowConfig(125, "dw");

                hero.src = jumpRightImageUrl;
                isDynamicPictureActive = true

            }
            throwAnimation();
        } else {
            if (!isFalling) {
                if ((!isJumping && pressedKeys.has("w")) || jumpAnimation.has("w")) {
                    if (!isJumping) {
                        obliqueThrowConfig(90, "w");
                        changeHeroPicture(standingImageUrl);
                    }
                    throwAnimation();
                } else {
                    if (pressedKeys.has("d")) {
                        heroLeft += step;
                        changeHeroPicture(runRightImageUrl);
                    } else if (pressedKeys.has("a")) {
                        heroLeft -= step;
                        changeHeroPicture(runLeftImageUrl);
                    }
                    else if (pressedKeys.size === 0) {
                        // changeHeroPicture(standingImageUrl);
                        hero.src = standingImageUrl;
                        isDynamicPictureActive = false
                    }
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
                    standingElement = {dimension: rect, platform: platforms[i]};
                    changeHeroPicture(standingImageUrl);
                    isDynamicPictureActive = false;
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
        checkStandingElements();
        checkSides();
        if (pressedKeys.has("j")) {
            blogContainer.remove();
            const content = document.getElementById("content");
            content.append(blogGrid);
            gameWrapper.style.backgroundImage = gifBackgroundImageValue;
            isMoving = false;
        }
        // changeWalkingPicture()
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

function checkSides() {

    if (heroLeft <= 0 || heroLeft + heroWidth >= window.innerWidth) {
        heroLeft <= 0
            ? (heroLeft = 0)
            : (heroLeft = window.innerWidth - heroWidth);
        isTouchingSides = true;
    } else {
        isTouchingSides = false;
    }
}

function checkStandingElements() {

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
}