var standingImageUrl = hero.src;
var walkingRightImageUrl = null


var imagePath = '/blog/hodanje';
// Izvršavanje HTTP zahteva
fetch(imagePath)
    .then(response => {
        console.log(response);
        return response.blob()
    })
    .then(blob => {
        // Kreiranje objekta URL za binarne podatke
        // var blob = new Blob([blob], { type: 'desired/mime-type' });
        // blob = new Blob([blob], { type: "image/gif" });
        console.log(blob)
        // var reader = new FileReader();
        // var imageUrl = null
        // reader.onload = function (event) {
        //     imageUrl = event.target.result;
        //     console.log('Base64 String:', imageUrl);
        //     document.getElementById('hero').src =  imageUrl;
        //     // You can use the base64String as needed
        // };
        //
        // reader.readAsDataURL(blob);
        walkingRightImageUrl = URL.createObjectURL(blob);

    })
    .catch(error => console.error('Greška pri dohvatanju slike:', error));

function changeWalkingPicture() {
    if(!isDynamicPictureActive){

        if (pressedKeys.has("d")) {
            hero.src = walkingRightImageUrl;
            isDynamicPictureActive = true
        } else {
            hero.src = standingImageUrl;
        }
    }

}