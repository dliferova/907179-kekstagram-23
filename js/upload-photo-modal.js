import {isEscEvent, checkStringLength, removeAllClassesByRegexp} from './util.js';

const REG_HASTAG = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const SCALE_START_VALUE = 100;

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
const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderFieldset = document.querySelector('.effect-level');
const sliderValueElement = document.querySelector('.effect-level__value');

let scaleValue;
let appliedEffect;

const effects = {
  ORIGINAL: {
    id: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  CHROME: {
    id: 'chrome',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  SEPIA: {
    id: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  MARVIN: {
    id: 'marvin',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  PHOBOS: {
    id: 'phobos',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  HEAT: {
    id: 'heat',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

const sliderOptions = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
};

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
  scaleValue = SCALE_START_VALUE;
  renderScaleValue();
  changeScale(scaleValue);
  sliderFieldset.classList.add('hidden');
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

const updateSliderOptions = (options) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: options.min,
      max: options.max,
    },
    start: options.start,
    step: options.step,
  });
};

const showOrHideSlider = (effectId) => {
  if (effectId === 'none') {
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
  }
};

const applyNewEffectToSlider = (effectId) => {
  switch (effectId) {
    case effects.CHROME.id:
      updateSliderOptions(effects.CHROME);
      break;
    case effects.SEPIA.id:
      updateSliderOptions(effects.SEPIA);
      break;
    case effects.MARVIN.id:
      updateSliderOptions(effects.MARVIN);
      break;
    case effects.PHOBOS.id:
      updateSliderOptions(effects.PHOBOS);
      break;
    case effects.HEAT.id:
      updateSliderOptions(effects.HEAT);
      break;
    default:
      updateSliderOptions(effects.ORIGINAL);
  }
};

const applyEffectToImage = (effectId) => {
  removeAllClassesByRegexp(previewImg, /effects__preview--.*/);
  previewImg.classList.add(`effects__preview--${effectId}`);
};

const applyEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    appliedEffect = evt.target.value;
    showOrHideSlider(appliedEffect);
    applyNewEffectToSlider(appliedEffect);
    applyEffectToImage(appliedEffect);
  }
};

effectsList.addEventListener('change', applyEffect);

sliderValueElement.value = SCALE_START_VALUE;

noUiSlider.create(sliderElement, sliderOptions);

const applyFilterSettings = (values, handle, unecoded) => {
  sliderValueElement.value = unecoded[handle];
  if (appliedEffect === 'none') {
    previewImg.style.removeProperty('filter');
  } else if (appliedEffect === 'chrome') {
    previewImg.style.filter = `grayscale(${sliderValueElement.value})`;
  } else if (appliedEffect === 'sepia') {
    previewImg.style.filter = `sepia(${sliderValueElement.value})`;
  } else if (appliedEffect === 'marvin') {
    previewImg.style.filter = `invert(${sliderValueElement.value}%)`;
  } else if (appliedEffect === 'phobos') {
    previewImg.style.filter = `blur(${sliderValueElement.value}px)`;
  } else if (appliedEffect === 'heat') {
    previewImg.style.filter = `brightness(${sliderValueElement.value})`;
  }
};

sliderElement.noUiSlider.on('update', applyFilterSettings);
