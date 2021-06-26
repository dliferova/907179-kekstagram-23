import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './form.js';

const photos = generatePhotos();
renderThumbnails(photos);

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', openForm);
