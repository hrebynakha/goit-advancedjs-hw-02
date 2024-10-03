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
  setTimeout(() => {
    const promise = createNewPromise(state, delay);
    promise
      .then(value => displaySuccess(value))
      .catch(err => displayError(err));
  }, Number(delay));
  form.reset();
}

function createNewPromise(state, delay) {
  return state === 'fulfilled' ? Promise.resolve(delay) : Promise.reject(delay);
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
