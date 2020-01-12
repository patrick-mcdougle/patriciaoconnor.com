import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import './nav';
// import './sliders';
import './carousels';
import './projects';
import './index.scss';

const projectDetails = document.getElementById('project-details');

function unfix(value) {
  projectDetails.style.top = `${value}px`;
  projectDetails.classList.add('unfix');
}

function fix() {
  projectDetails.style.removeProperty('top');
  projectDetails.classList.remove('unfix');
}

function init() {
  const controller = new ScrollMagic.Controller();
  const triggerHeight = projectDetails.offsetTop;
  controller.enabled(window.innerWidth > 1100);

  document.querySelectorAll('.stick-off').forEach((triggerElement) => {
    const scene = new ScrollMagic.Scene({
      triggerElement,
      triggerHook: triggerHeight / window.innerHeight,
    });

    scene.on('enter', () => {
      unfix(triggerElement.offsetTop);
    });

    scene.on('leave', () => {
      fix();
    });

    controller.addScene(scene);
  });

  document.querySelectorAll('.portal').forEach((triggerElement) => {
    const scene = new ScrollMagic.Scene({
      triggerElement,
      triggerHook: triggerHeight / window.innerHeight,
    });

    scene.on('enter', () => {
      unfix(triggerElement.nextElementSibling.offsetTop);
    });

    scene.on('leave', () => {
      unfix(triggerElement.previousElementSibling.offsetTop);
    });

    controller.addScene(scene);
  });

  document.querySelectorAll('.stick-on').forEach((triggerElement) => {
    const scene = new ScrollMagic.Scene({
      triggerElement,
      triggerHook: triggerHeight / window.innerHeight,
    });

    scene.on('enter', () => {
      fix();
    });

    scene.on('leave', () => {
      unfix(triggerElement.offsetTop);
    });

    controller.addScene(scene);
  });

  window.addEventListener('resize', () => {
    controller.enabled(window.innerWidth > 1100);
    controller.update(true);
  });
}

if (projectDetails) {
  init();
}
