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

/**
 * Проверяет максимальную длину строки.
 * @param string - Проверяемая строка.
 * @param maxLength - Максимально возможная длина строки.
 * @returns {boolean} - Результат проверки.
 */
const checkStringLength = function(string, maxLength) {
  return string.length <= maxLength;
};

const getRandomArrayElement = (elements) => elements[getRandomFromRange(0, elements.length - 1)];

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const removeAllClassesByRegexp = (element, regexp) => {
  const classNames = [].slice.apply(element.classList);
  const classNamesToDelete = classNames.filter((className) => regexp.test(className));

  classNamesToDelete.forEach((className) => element.classList.remove(className));
};

export {getRandomFromRange, checkStringLength, getRandomArrayElement, isEscEvent, removeAllClassesByRegexp};
