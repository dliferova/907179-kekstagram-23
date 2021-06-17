import {generatePhotos} from './data.js';

const picturesFromUsersContainer =  document.querySelector('.pictures');

const randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const generatedPhotosArray = generatePhotos();

const photosListFragment = document.createDocumentFragment();

generatedPhotosArray.forEach((photo) => {
  const pictureElement = randomUserPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__img').src = photo.url;
  picturesFromUsersContainer.appendChild(pictureElement);
});

picturesFromUsersContainer.appendChild(photosListFragment);
