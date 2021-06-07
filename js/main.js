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


const generate = function() {
  const objects = [];

  const createComment = function(id) {
    const possibleMessages = [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    const possibleNames = [
      'Иван',
      'Виктор',
      'Николай',
      'Илья',
      'Яна',
      'Дарья'
    ]

    const authorId = getRandomFromRange(1, 6);

    return {
      id: id,
      avatar: 'img/avatar-' + authorId + '.svg',
      message: possibleMessages[getRandomFromRange(0, possibleMessages.length - 1)],
      name: possibleNames[authorId - 1]
    };
  }

  for (let i = 0; i < 25; i++) {
    const id = i + 1;

    objects[i] = {
      id: id,
      url: 'photos/' + id + '.jpg',
      description: 'Моя новая фотография.',
      likes: getRandomFromRange(15, 200),
      comments: [
        createComment(135)
      ]
    }
  }

  return objects;
};

console.log(generate());
