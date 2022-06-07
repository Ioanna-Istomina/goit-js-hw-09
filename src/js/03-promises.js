import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', createPromise);

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

const getPromiseData = (delay, position) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function createPromise(ev) {
  ev.preventDefault();
  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i += 1) {
    getPromiseData(delay, i + 1)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    ev.currentTarget.reset();
    delay += step;
  }
}
