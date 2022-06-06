import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

//Початкове значення вибраного часу
let selectedTime = null;

//Посилання на HTML елементи
const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('.button'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

//Опції для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.button.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.intervalId = null;
    refs.button.disabled = true; //Кнопка не активна поки не вибрана дата
    this.isActive = false;
  }
  //Якщо відлік вже почався, то новий відлік не почнеться
  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    //Формула для початку відліку
    this.intervalId = setInterval(() => {
      const startTime = new Date();
      const deltaTime = selectedTime - startTime;
      const componentsTimer = convertMs(deltaTime);

      if (deltaTime <= 0) {
        return this.stopTimer();
      }
      this.updateClockface(componentsTimer);
    }, 1000);
  }

  //Перенесення данних в HTML (на екран)
  updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}

const timer = new Timer();
flatpickr(refs.input, options);

//Повертає різницю між кінцевою та поточною датою
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

refs.button.addEventListener('click', timer.startTimer.bind(timer));
