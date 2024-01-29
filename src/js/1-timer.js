import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDataTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const day = document.querySelector('.value[ data-days]');
const hour = document.querySelector('.value[ data-hours]');
const minute = document.querySelector('.value[ data-minutes]');
const second = document.querySelector('.value[ data-seconds]');
startButton.disabled = true;

let userSelectedDate;
let difference;
let setIntervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    userSelectedDate = selectedDates[0];

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        titleSize: '16px',
        titleLineHeight: '1.5',
        titleColor: '#FFF',
        messageColor: '#FFF',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    } else {
      startButton.disabled = false;
      startButton.style.backgroundColor = '#4E75FF';
      startButton.style.color = '#FFF';
    }
  },
};

flatpickr(inputDataTimePicker, options);

startButton.addEventListener('click', e => {
  startButton.disabled = true;

  difference = userSelectedDate - Date.now();

  updateTimer(convertMs(difference));

  clearInterval(setIntervalId);
  setIntervalId = setInterval(() => {
    difference -= 1000;
    updateTimer(convertMs(difference));
    stopTimer(difference);
  }, 1000);
});

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

function updateTimer({ days, hours, minutes, seconds }) {
  day.textContent = `${addLeadingZero(days)}`;
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
}

function stopTimer(difference) {
  if (difference <= 1000) {
    clearInterval(setIntervalId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
