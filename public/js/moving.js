var standingImageUrl = hero.src;
var runRightImageUrl = null
var runLeftImageUrl = null
var jumpLeftImageUrl = null
var jumpRightImageUrl = null


var runRightPath = '/images/runRight';
var runLeftPath = '/images/runLeft';
var jumpLeftPath = '/images/jumpLeft';
var jumpRightPath = '/images/jumpRight';

// Izvršavanje HTTP zahteva
fetch(runRightPath)
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        console.log('BLOB JE: ', blob)
        let s = URL.createObjectURL(blob);
        console.log('URL JE: ', s)
        runRightImageUrl = s
    })
    .catch(error => console.error('Greška pri dohvatanju slike:', error));

fetch(runLeftPath)
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        runLeftImageUrl = URL.createObjectURL(blob);
    })
    .catch(error => console.error('Greška pri dohvatanju slike:', error));

fetch(jumpLeftPath)
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        jumpLeftImageUrl = URL.createObjectURL(blob);
    })
    .catch(error => console.error('Greška pri dohvatanju slike:', error));

fetch(jumpRightPath)
    .then(response => {
        return response.blob()
    })
    .then(blob => {
        jumpRightImageUrl = URL.createObjectURL(blob);
    })
    .catch(error => console.error('Greška pri dohvatanju slike:', error));


function changeWalkingPicture() {
    if (!isDynamicPictureActive) {

        // if (pressedKeys.has("d")) {
        //
        // } else if (pressedKeys.has("a")) {
        //
        // } else if (
        //     (pressedKeys.has("a") && pressedKeys.has("w")) ||
        //     jumpAnimation.has("aw")
        // ) {
        //
        // } else if (
        //     (pressedKeys.has("d") && pressedKeys.has("w")) ||
        //     jumpAnimation.has("dw")
        // ) {
        //
        // }
    if (
        (pressedKeys.has("a") && pressedKeys.has("w")) ||
        jumpAnimation.has("aw")
    ) {
        hero.src = jumpLeftImageUrl;
        isDynamicPictureActive = true
    } else if (
        (pressedKeys.has("d") && pressedKeys.has("w")) ||
        jumpAnimation.has("dw")
    ) {
        hero.src = jumpRightImageUrl;
        isDynamicPictureActive = true
    } else {
        // if (!isFalling) {
        if ((!isJumping && pressedKeys.has("w")) || jumpAnimation.has("w")) {
            if (!isJumping) {
                obliqueThrowConfig(90, "w");
            }
            throwAnimation();
        } else {
            if (pressedKeys.has("d")) {
                hero.src = runLeftImageUrl;
                isDynamicPictureActive = true
            } else if (pressedKeys.has("a")) {
                hero.src = runRightImageUrl;
                isDynamicPictureActive = true
            } else {
                hero.src = standingImageUrl;
            }
        }
        // }
    }

    }

}
