let images = [];
let counter = 0;
const carouselEl = document.querySelector('.carousel');

// fetch images
const getImages = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(imgs => {
            images = [...imgs];

            createImageEl(images[counter]);
            console.log(images)
        })
};

const createImageEl = (image, direction) => {
    const currentActiveImages = document.querySelectorAll('.img_wrapper');
    let imgClass = 'image_active';
    let oppositeImgClass;

    if (direction === 1) imgClass = 'image_right';
    if (direction === -1) imgClass = 'image_left';
    (imgClass === 'image_right') ? oppositeImgClass = 'image_left' : oppositeImgClass = 'image_right';

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img_wrapper', imgClass);

    const img = document.createElement('img');
    img.setAttribute('src', image.urls.regular);

    imgWrapper.appendChild(img);
    carouselEl.appendChild(imgWrapper);

    setTimeout(() => {
        currentActiveImages && addSlideEffect(currentActiveImages, imgClass, oppositeImgClass);
        imgWrapper.classList.add('image_active');
    }, 100);

    setTimeout(() => {
        imgWrapper.classList.remove(imgClass);
        currentActiveImages && removePrevImages(currentActiveImages)
    }, 1000);

};

const addSlideEffect = (currentActiveImages, imgClass, oppositeImgClass) => {
    [].forEach.call(currentActiveImages, (image) => {
        image.classList.remove('image_active', imgClass);
        image.classList.add(oppositeImgClass);

    })
};

const removePrevImages = (removePrevImages) => {
  [].forEach.call(removePrevImages, (image) => image.remove());
};

const clickHandler = (moveTo) => {
    if(moveTo === 1) {
        (images.length - 1 > counter) ? counter += 1 : counter = 0
    } else {
        (counter > 0) ? counter -= 1 : counter = images.length - 1
    }

    createImageEl(images[counter], moveTo)
};

carouselEl.addEventListener('click', (event) => {
    (event.target.classList.contains('btn_left')) && clickHandler(-1);
    (event.target.classList.contains('btn_right')) && clickHandler(1);
});
getImages(URL);
