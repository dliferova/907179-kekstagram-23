// Функция возвращающая случайное число

const getRandomFromRange = function(startNumber, endNumber) {
  if(startNumber < 0) {
    return undefined;
  }
  if (endNumber <= startNumber) {
    return undefined;
  }
  // источник https://schoolsw3.com/js/js_random.php
  return Math.floor(Math.random() * (endNumber - startNumber + 1) ) + startNumber;
};

getRandomFromRange(5, 50);

// Функция для проверки максимальной длины строки

const checkStringLength = function(string, maxLength) {
  return string.length <= maxLength;
};

checkStringLength('Это мое домашнее задание', 50);
