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
