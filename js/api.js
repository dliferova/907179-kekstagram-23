const API_HOST = 'https://23.javascript.pages.academy';

export const getPhotos = () => fetch(`${API_HOST}/kekstagram/data`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error();
    }
  });

export const sendForm = (formData) => fetch(
  `${API_HOST}/kekstagram`,
  {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (!response.ok) {
      throw Error();
    }
  });
