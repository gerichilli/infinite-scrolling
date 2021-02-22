const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArr = [];

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;

// Unsplash API

const count = 5;
const apiKey = 'MYJtTPp3_FlaTP23mMbgGVZqeBCGed-12LteSxJ8DNU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded

function photoLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImage) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Helper funcion to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Creat element for links & photos, add to dom
function displayPhoto() {
    photoArr.forEach((photo) => {
        imagesLoaded = 0;
        totalImage = photoArr.length;
        console.log('total img', totalImage);

        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', photoLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Getphoto from unsplash API

async function getPhoto() {
    try {
        const response = await fetch(apiUrl);
        photoArr = await response.json();
        displayPhoto();
    } catch (error) {

    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', function(){
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhoto();
    }
})

getPhoto();

