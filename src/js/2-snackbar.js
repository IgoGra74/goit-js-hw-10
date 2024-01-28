import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  form.reset();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Ok',
        message: `Fulfilled promise in ${delay}ms`,
        titleColor: '#FFF',
        messageColor: '#FFF',
        position: 'topCenter',
        timeout: delay,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        titleColor: '#FFF',
        messageColor: '#FFF',
        position: 'topCenter',
        timeout: delay,
      });
    });
});
