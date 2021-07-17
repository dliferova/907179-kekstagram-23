import './photo-thumbnails.js';
import {isEscEvent} from './util.js';

const MAX_NUMBER_PREVIEW_COMMENTS = 5;
const SHOW_MORE_COMMENTS_STEP = 5;

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

  const commentsLoaderButton = document.querySelector('.social__comments-loader');
  const visibleCommentsCountElement = document.querySelector('.visible-comments-count');
  let visibleCommentsCount;
  const totalCommentsCount = photo.comments.length;

  const showComments = (from, to) => {
    const commentsToShow = photo.comments.slice(from, to);
    commentsToShow.forEach(renderComment);

    commentsElement.appendChild(commentsListFragment);

    if (photo.comments.length < to) {
      visibleCommentsCount = photo.comments.length;
    } else {
      visibleCommentsCount = to;
    }

    visibleCommentsCountElement.textContent = visibleCommentsCount;
  };

  const showCommentsLoader = () => {
    commentsLoaderButton.classList.remove('hidden');
  };

  const hideCommentsLoader = () => {
    commentsLoaderButton.classList.add('hidden');
  };

  const showCommentsCount = () => {
    rootElement.querySelector('.social__comment-count').classList.remove('hidden');
  };

  showComments(0, MAX_NUMBER_PREVIEW_COMMENTS);

  showCommentsCount();

  if (totalCommentsCount > MAX_NUMBER_PREVIEW_COMMENTS) {
    showCommentsLoader();
  }

  const onLoadCommentsButtonClick = () => {
    let counter = visibleCommentsCount + SHOW_MORE_COMMENTS_STEP;

    if (totalCommentsCount < counter) {
      counter = totalCommentsCount;
    }

    showComments(visibleCommentsCount, counter);

    if (visibleCommentsCount === totalCommentsCount) {
      hideCommentsLoader();
    }
  };

  commentsLoaderButton.addEventListener('click', onLoadCommentsButtonClick);

  const modalCloseButton = rootElement.querySelector('.big-picture__cancel');

  let onCloseButtonCLick = null;
  let onEscClick = null;

  const closeModal = () => {
    rootElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    rootElement.querySelector('.social__comments').innerHTML = null;
    commentsLoaderButton.removeEventListener('click', onLoadCommentsButtonClick);
    modalCloseButton.removeEventListener('click', onCloseButtonCLick);
    document.removeEventListener('keydown', onEscClick);
  };

  onCloseButtonCLick = () => {
    closeModal(rootElement);
  };

  modalCloseButton.addEventListener('click', onCloseButtonCLick);

  onEscClick = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal(rootElement);
    }
  };
  document.addEventListener('keydown', onEscClick);
};

export const openModal = function (photo) {
  const rootElement = document.querySelector('.big-picture');
  document.querySelector('body').classList.add('modal-open');
  rootElement.querySelector('.social__comment-count').classList.add('hidden');
  rootElement.querySelector('.social__comments-loader').classList.add('hidden');
  renderData(rootElement, photo);
};
