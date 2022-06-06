const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  toggleAtrDisabled(true, false);
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  toggleAtrDisabled(false, true);
});

function toggleAtrDisabled(boolean1, boolean2) {
  startBtn.disabled = boolean1;
  stopBtn.disabled = boolean2;
}
