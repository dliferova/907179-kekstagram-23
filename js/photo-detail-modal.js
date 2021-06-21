import './photo-thumbnails.js';
import {isEscEvent} from './util.js';

const renderData = (rootElement, photo) => {
  rootElement.classList.remove('hidden');
  rootElement.querySelector('.big-picture__img img').src = photo.url;
  rootElement.querySelector('.likes-count').textContent = photo.likes;
  rootElement.querySelector('.comments-count').textContent = photo.comments.length;
  rootElement.querySelector('.social__caption').textContent = photo.description;

  const commentsElement = rootElement.querySelector('.social__comments');

  const commentsListFragment = document.createDocumentFragment();

  const renderComment = (comment) => {
    const commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  };

  photo.comments.forEach(renderComment);

  commentsElement.appendChild(commentsListFragment);
};

const closeModal = (rootElement) => {
  rootElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const initModalClosing = function(rootElement) {
  const modalCloseButton = rootElement.querySelector('.big-picture__cancel');

  modalCloseButton.addEventListener('click', () => {
    closeModal(rootElement);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(rootElement);
    }
  });
};

export const openModal= function(photo) {
  const rootElement = document.querySelector('.big-picture');
  document.querySelector('body').classList.add('modal-open');
  rootElement.querySelector('.social__comment-count').classList.add('hidden');
  rootElement.querySelector('.comments-loader').classList.add('hidden');
  renderData(rootElement, photo);
  initModalClosing(rootElement);
};
