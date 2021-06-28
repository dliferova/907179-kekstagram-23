import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './form.js';
import {openModal} from './photo-detail-modal.js';

const photos = generatePhotos();
renderThumbnails(photos);

document.querySelectorAll('.picture')
  .forEach((element) => element.addEventListener('click', () => openModal(photos[0])));

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', openForm);
