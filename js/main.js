/**
 * Возвращает случайное число.
 * @param startNumber - Начальное значение диапазона.
 * @param endNumber - Конечное значение диапазона.
 * @returns {number} - Случайное число из диапазона.
 */
const getRandomFromRange = function(startNumber = 0, endNumber = 0) {
  if (startNumber < 0) {
    startNumber = 0;
  }

  if (endNumber < 0) {
    endNumber = 0;
  }

  if (endNumber < startNumber) {
    const tmp = startNumber;
    startNumber = endNumber;
    endNumber = tmp;
  }

  return Math.floor(Math.random() * (startNumber - endNumber + 1) ) + endNumber;
};

getRandomFromRange(7, 50);

/**
 * Проверяет максимальную длину строки.
 * @param string - Проверяемая строка.
 * @param maxLength - Максимально возможная длина строки.
 * @returns {boolean} - Результат проверки.
 */
const checkStringLength = function(string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('Это мое домашнее задание', 50);

const TOTAL_PHOTOS_NUMBER = 25;
const LIKES_MIN_NUMBER = 15;
const LIKES_MAX_NUMBER = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS_NUMBER = 2;
const MAX_COMMENTS_NUMBER = 7;
const POSSIBLE_COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const POSSIBLE_COMMENT_NAMES = [
  'Иван',
  'Виктор',
  'Николай',
  'Илья',
  'Яна',
  'Дарья',
];
const POSSIBLE_PHOTO_DESCRIPTION = 'Это новое фото.';

const getRandomArrayElement = (elements) => elements[getRandomFromRange(0, elements.length - 1)];

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomFromRange(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(POSSIBLE_COMMENT_MESSAGES),
  name: getRandomArrayElement(POSSIBLE_COMMENT_NAMES),
});

const generateComments = () => new Array(getRandomFromRange(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER))
  .fill(null)
  .map((element, index) => createComment(index + 1));

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: POSSIBLE_PHOTO_DESCRIPTION,
  likes: getRandomFromRange(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
  comments: generateComments(),
});

const generatePhotos = () => new Array(TOTAL_PHOTOS_NUMBER)
  .fill(null)
  .map((element, index) => createPhoto(index + 1));

generatePhotos();
