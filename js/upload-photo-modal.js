import {isEscEvent, checkStringLength, removeAllClassesByRegexp} from './util.js';

const REG_HASTAG = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const uploadText = uploadForm.querySelector('.img-upload__text');
const textHashtags = uploadText.querySelector('.text__hashtags');
const commentField = uploadText.querySelector('.text__description');
const scaleUp = uploadForm.querySelector('.scale__control--bigger');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const scaleDown = uploadForm.querySelector('.scale__control--smaller');
const previewImg = uploadForm.querySelector('.img-upload__preview');

let scaleValue;

const renderScaleValue = () => {
  scaleInput.value = `${scaleValue}%`;
};

const changeScale = (value) => {
  previewImg.style.transform = `scale(${value / 100})`;
};

const onScaleUpClick = () => {
  if (scaleValue < MAX_SCALE_VALUE) {
    scaleValue = scaleValue + SCALE_STEP;
    renderScaleValue();
    changeScale(scaleValue);
  }
};

scaleUp.addEventListener('click', onScaleUpClick);

const onScaleDownClick = () => {
  if (scaleValue > MIN_SCALE_VALUE) {
    scaleValue = scaleValue - SCALE_STEP;
    renderScaleValue();
    changeScale(scaleValue);
  }
};

scaleDown.addEventListener('click', onScaleDownClick);

const initializeForm = () => {
  scaleValue = 100;
  renderScaleValue();
  changeScale(scaleValue);
};

export const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initializeForm();
};

const onHashtagsInput = () => {

  const value = textHashtags.value.toLowerCase();
  const hashtags = value.split(' ');
  const hasInvalidHashtag = hashtags.some((hashtag) => !REG_HASTAG.test(hashtag));

  if (hasInvalidHashtag) {
    textHashtags.setCustomValidity('Используйте после # буквы и числа без пробелов, спецсимволы (#, @, $ и т. п.) и символы пунктуации');
  } else if (hashtags.length !== new Set(hashtags).size) {
    textHashtags.setCustomValidity('Хештег уже используется');
  } else if (hashtags.length > MAX_HASTAGS_COUNT) {
    textHashtags.setCustomValidity('Вы не можете использовать более 5 хештегов');
  } else {
    textHashtags.setCustomValidity('');
  }

  textHashtags.reportValidity();
};

textHashtags.addEventListener('input', onHashtagsInput);

const onCommentInput = () => {

  if (!checkStringLength(commentField.value, MAX_COMMENT_LENGTH)) {
    commentField.setCustomValidity(`Длина вашего комментария не может быть больше ${MAX_COMMENT_LENGTH} символов`);
  } else {
    commentField.setCustomValidity('');
  }

  commentField.reportValidity();
};

commentField.addEventListener('input', onCommentInput);

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

uploadCancel.addEventListener('click', closeForm);

const onKeyPress = (evt) => {
  if (isEscEvent(evt) && textHashtags !== document.activeElement) {
    evt.preventDefault();
    closeForm();
  }
};

document.addEventListener('keydown', onKeyPress);

const effectsList = document.querySelector('.effects__list');

const applyEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effectValue = evt.target.value;
    removeAllClassesByRegexp(previewImg, /effects__preview--.*/);
    previewImg.classList.add(`effects__preview--${effectValue}`);
  }
};

effectsList.addEventListener('change', applyEffect);
