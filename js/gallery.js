import {renderThumbnails} from './photo-thumbnails.js';
import {openForm} from './upload-photo-modal.js';
import {getPhotos} from './api.js';
import {openModal} from './photo-detail-modal.js';
import {removeAllClassesByRegexp, shuffleArray} from './util.js';
import {debounce} from './utils/debounce.js';

const MAX_RANDOM_PHOTO_NUMBER = 10;
const filterBlock = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const defaultFilterButton = filtersForm.querySelector('#filter-default');
const randomFilterButton = filtersForm.querySelector('#filter-random');
const discussedFilterButton = filtersForm.querySelector('#filter-discussed');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

const RERENDER_DELAY = 500;

const showErrorMessage = () => {
  const errorMessageFragment = document.createDocumentFragment();
  const errorMessageTemplate = document.querySelector('#load-error')
    .content
    .querySelector('.load-error');
  const errorElement = errorMessageTemplate.cloneNode(true);
  errorMessageFragment.appendChild(errorElement);
  document.querySelector('body').appendChild(errorMessageFragment);
};

const changeActiveStyleButton = () => {
  filterButtons.forEach((element) => removeAllClassesByRegexp(element, /img-filters__button--active/));
};

const showFilters = () => {
  filterBlock.classList.remove('img-filters--inactive');
};

const showThumbnails = debounce(
  (photos) => {
    renderThumbnails(photos);
    document.querySelectorAll('.picture')
      .forEach((element, index) => element.addEventListener('click', () => openModal(photos[index])));
  },
  RERENDER_DELAY,
);

let userPhotos = [];

getPhotos()
  .then((loadedPhotos) => {
    userPhotos = loadedPhotos.slice();
    showThumbnails(userPhotos);
    showFilters();
  })
  .catch(() => showErrorMessage());

defaultFilterButton.addEventListener('click', () => {
  changeActiveStyleButton();
  defaultFilterButton.classList.add('img-filters__button--active');

  const newPhotos = userPhotos.slice();
  showThumbnails(newPhotos);
});

randomFilterButton.addEventListener('click', () => {
  changeActiveStyleButton();
  randomFilterButton.classList.add('img-filters__button--active');

  const newPhotos = shuffleArray(userPhotos.slice())
    .slice(0, MAX_RANDOM_PHOTO_NUMBER);
  showThumbnails(newPhotos);
});

discussedFilterButton.addEventListener('click', () => {
  changeActiveStyleButton();
  discussedFilterButton.classList.add('img-filters__button--active');

  const newPhotos = userPhotos
    .slice()
    .sort((min, max) => max.comments.length - min.comments.length);
  showThumbnails(newPhotos);
});

const openFormElement = document.querySelector('.img-upload__input');
openFormElement.addEventListener('change', openForm);
