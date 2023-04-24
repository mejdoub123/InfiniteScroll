const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
//Unsplash API
let count = 5;
const apiKey = "YLdVtI9wh3EnQPqB9jXzKMU2uB03YiJEFCe6jTznIOM";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}
&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 20;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}
&count=${count}`;
  }
};

//Set Attributes Function
const setAttributes = (element, attributes) => {
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
};

//Display Photos
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create a Item
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create img Item
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listenner, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//Get photos form Unsplash API
const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
};

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//On Load
getPhotos();
