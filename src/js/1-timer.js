import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let userSelectedDate;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate.getTime() <= Date.now()) {
      iziToast.warning({
        position: 'topRight',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        messageColor: 'white',
        icon: '',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate.getTime();
    }
  },
};

flatpickr(inputDate, options);

class Timer {
  constructor(tick) {
    this.intervalId = null;
    this.tick = tick;
  }

  start() {
    this.intervalId = setInterval(() => {
      const diff = userSelectedDate - Date.now();
      this.tick(convertMs(diff));
      startBtn.disabled = true;
      inputDate.disabled = true;
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new Timer(onTick);

startBtn.addEventListener('click', () => {
  timer.start();
});

function onTick({ days, hours, minutes, seconds }) {
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    timer.stop();
  }

  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
