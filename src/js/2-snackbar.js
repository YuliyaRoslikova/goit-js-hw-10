import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayRef = document.querySelector('input[name="delay"]');
const stateRef = document.querySelector('input[name="state"]');
const submitBtnRef = document.querySelector('button[type="submit"]');
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const state = e.target.elements.state.value;
  const delay = e.target.elements.delay.value;

  formRef.reset();

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(`❌ Rejected promise in ${delay}ms`);
      }, delay);
    }
  });

  promise
    .then(message => {
      iziToast.show({
        message,
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        progressBar: false,
      });
    })
    .catch(message => {
      iziToast.error({
        message,
        position: 'topRight',
        backgroundColor: 'light red',
        messageColor: 'white',
        icon: '',
        progressBar: false,
      });
    });
});
