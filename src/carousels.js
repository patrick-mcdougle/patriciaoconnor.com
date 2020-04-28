import * as imagesloaded from 'imagesloaded';

const carousels = [];
let interval;

function advanceCarousels() {
  carousels.forEach((instance) => {
    instance.next();
  });
}

function resizeCarousels() {
  carousels.forEach((instance) => {
    instance.resizeContainer();
  });
}

function enableAutoAdvace() {
  if (!interval) {
    interval = window.setInterval(advanceCarousels, 5000);
  }
}

class Carousel {
  constructor(containerElement) {
    this.element = containerElement;
    this.index = 0;
    this.imageWatcher = imagesloaded(containerElement);
    this.imageWatcher.once('always', () => {
      this.imageWatcher.allOff();
      delete this.imageWatcher;
      this.resizeContainer();
    });
    this.imageWatcher.on('progress', () => this.resizeContainer());
    this.resizeContainer();
  }

  resizeContainer() {
    const slides = this.element.children;
    let maxHeight = 0;
    for (let i = 0; i < slides.length; i += 1) {
      maxHeight = Math.max(maxHeight, slides[i].scrollHeight);
    }
    this.element.style.height = `${maxHeight}px`;
  }

  next() {
    this.element.children[this.index].classList.remove('active');
    this.index = this.index + 1;
    if (this.index === this.element.children.length) {
      this.index = 0;
    }
    this.element.children[this.index].classList.add('active');
  }
}

document.querySelectorAll('.carousel').forEach((element) => {
  carousels.push(new Carousel(element.querySelector('.slides')));
});

window.addEventListener('resize', resizeCarousels);

enableAutoAdvace();
