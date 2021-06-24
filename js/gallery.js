import {generatePhotos} from './data.js';
import {renderThumbnails} from './photo-thumbnails.js';
import {openForm, validateCommentInForm, validateHashtags} from './form.js';

const photos = generatePhotos();
renderThumbnails(photos);
// openModal(photos[photoNumber]);

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', () => {
  openForm();
});

validateHashtags();
validateCommentInForm();
