export const renderThumbnails = (photos) => {
  const picturesFromUsersContainer =  document.querySelector('.pictures');

  const photosListFragment = document.createDocumentFragment();

  const renderPhoto = (photo) => {
    const randomUserPictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    const pictureElement = randomUserPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__img').src = photo.url;
    photosListFragment.appendChild(pictureElement);
  };

  photos.forEach(renderPhoto);

  picturesFromUsersContainer.appendChild(photosListFragment);
};
