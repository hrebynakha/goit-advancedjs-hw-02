import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePickElement = document.querySelector('#datetime-picker');
const timeContainer = document.querySelector('.timer');
const refs = {
  main: document.querySelector('body'),
  startBtn: document.querySelector('button'),
  days: timeContainer.children[0].children[0],
  hours: timeContainer.children[1].children[0],
  minutes: timeContainer.children[2].children[0],
  seconds: timeContainer.children[3].children[0],
};
let pickedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: pickedDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();
    if (pickedDate - Date.now() <= 0) {
      displayError();
      return;
    }
    refs.startBtn.dataset.start = pickedDate;
  },
};
refs.startBtn.addEventListener('click', handleTimerStart);
flatpickr(datePickElement, options);

function handleTimerStart() {
  if (!refs.startBtn.dataset.start) {
    displayWarning();
    return;
  }
  refs.startBtn.disabled = true;
  refs.main.classList.add('timer-active');
  const intervalId = setInterval(() => {
    const diff = refs.startBtn.dataset.start - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      refs.startBtn.disabled = false;
      refs.main.classList.remove('timer-active');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    setTimerText(days, hours, minutes, seconds);
  }, 1000);
}

function padify(text) {
  return String(text).toString().padStart(2, '0');
}

function setTimerText(days, hours, minutes, seconds) {
  refs.days.textContent = padify(days);
  refs.hours.textContent = padify(hours);
  refs.minutes.textContent = padify(minutes);
  refs.seconds.textContent = padify(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function displayError() {
  iziToast.error({
    message: 'Please choose a date in the future',
    position: 'topRight',
  });
}

function displayWarning() {
  iziToast.warning({
    message: 'Date not set or somesthing going wrong',
    position: 'topRight',
  });
}
