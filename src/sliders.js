// TODO: Consider the mobile breakpoint transition.

import { lory } from 'lory.js';

const sliders = [];
let interval;

function advanceSliders() {
  sliders.forEach((instance) => {
    instance.next();
  });
}

function enableAutoAdvace() {
  if (!interval) {
    interval = window.setInterval(advanceSliders, 5000);
  }
}

function disableAutoAdvance() {
  window.clearInterval(interval);
  interval = undefined;
}

document.querySelectorAll('.slider').forEach((element) => {
  enableAutoAdvace();
  sliders.push(lory(element, {
    slideSpeed: 500,
    infinite: 1,
  }));
});
