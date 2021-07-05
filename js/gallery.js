import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './upload-photo-modal.js';
import {openModal} from './photo-detail-modal.js';

const photos = generatePhotos();
renderThumbnails(photos);

document.querySelectorAll('.picture')
  .forEach((element, index) => element.addEventListener('click', () => openModal(photos[index])));

const openFormElement = document.querySelector('.img-upload__input');
openForm();
openFormElement.addEventListener('change', openForm);
