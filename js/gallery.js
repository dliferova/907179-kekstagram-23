import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './upload-photo-modal.js';
import {getPhotos} from './api.js';
import {openModal} from './photo-detail-modal.js';


const showErrorMessage = () => {
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageTemplate = document.querySelector('#load-error')
    .content
    .querySelector('.load-error');
  const errorElement = errorMessageTemplate.cloneNode(true);
  errorMessageFragment.appendChild(errorElement);
  document.querySelector('body').appendChild(errorMessageFragment);
};

getPhotos()
  .then((userPhotos) => {
    renderThumbnails(userPhotos);
    document.querySelectorAll('.picture')
      .forEach((element, index) => element.addEventListener('click', () => openModal(userPhotos[index])));
  })
  .catch(() => showErrorMessage());

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', openForm);
