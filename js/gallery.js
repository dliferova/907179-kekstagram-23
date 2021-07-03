import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './form.js';
import {openModal} from './photo-detail-modal.js';

const photos = generatePhotos();
renderThumbnails(photos);

document.querySelectorAll('.picture')
  .forEach((element, index) => element.addEventListener('click', () => openModal(photos[index])));

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', openForm);
