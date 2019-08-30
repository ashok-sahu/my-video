//global vars
let height = 0;
let width = 500;
filter = 'none';
streaming = false;


//DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const filterButton = document.getElementById('photo-filter');


//get Media stream
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function(stream) {
        //link to the video source
        video.srcObject = stream;
        video.play();
    }).catch(function(err) {
        console.log(`error : ${err}`)
    })
    //play when ready
video.addEventListener('canplay', function(e) {
    if (!streaming) {
        //set video /canvas height
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
    }
    streaming = true;
}, false);


photoButton.addEventListener('click', function(e) {
    takePicture()
    e.preventDefault();
}, false);

//filter event
filterButton.addEventListener('change', function(e) {
    //set filter to select option
    filter = e.target.value;
    //set filter to video
    video.style.filter = filter;
    e.preventDefault();
});

//clear event
clearButton.addEventListener('click', function(e) {
    //clear photos
    photos.innerHTML = '';
    //change filter back to normal
    filter = 'none';
    //set video filter
    video.style.filter = filter;
    //reset select list
    filterButton.selectedIndex = 0;
})



//take picture from canvas
function takePicture() {
    //create canvas props
    const context = canvas.getContext('2d');
    if (width && height) {
        //set canvas props
        canvas.height = height;
        canvas.width = width;
        //draw an image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);
        //create image from the canvas
        const imgUrl = canvas.toDataURL("image / png");
        console.log(imgUrl);
        //create image element
        const img = document.createElement('img');
        //set image src
        img.setAttribute('src', imgUrl);
        //set image filter
        img.style.filter = filter;
        //add image to photos
        photos.appendChild(img);
    }
}