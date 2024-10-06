import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btnSubmit: document.querySelector('.form button'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', hadleFromSnackSubmit);

function hadleFromSnackSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const state = form.state.value;
  const delay = form.delay.value;
  const promise = createNewPromise(state, delay);
  promise.then(value => displaySuccess(value)).catch(err => displayError(err));
  form.reset();
}

function createNewPromise(state, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  return promise;
}

function displaySuccess(delay) {
  iziToast.success({
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function displayError(delay) {
  iziToast.error({
    message: `Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}
