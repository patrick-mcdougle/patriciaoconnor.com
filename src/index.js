import ScrollMagic from 'scrollmagic/scrollmagic/minified/ScrollMagic.min';
import './nav';
// import './sliders';
import './carousels';
import './projects';
import './index.scss';

const globalNavHeight = Number.parseInt(window.getComputedStyle(document.body).paddingTop, 10);
const projectDetails = document.getElementById('project-details');
const controller = new ScrollMagic.Controller();
controller.enabled(window.innerWidth > 1100);

function unfix(value) {
  projectDetails.style.top = `${value + globalNavHeight}px`;
  projectDetails.classList.add('unfix');
}

function fix() {
  projectDetails.style.removeProperty('top');
  projectDetails.classList.remove('unfix');
}

document.querySelectorAll('.scroll-gallery > :last-child').forEach((triggerElement) => {
  const scene = new ScrollMagic.Scene({
    duration: () => (triggerElement.getBoundingClientRect().height),
    triggerElement,
    triggerHook: globalNavHeight / window.innerHeight,
  });

  scene.on('enter leave', (event) => {
    if (event.type === 'enter' && event.scrollDirection === 'FORWARD') {
      unfix(window.scrollY);
    } else if (event.type === 'leave' && event.scrollDirection === 'REVERSE') {
      fix();
    } else if (event.type === 'enter' && event.scrollDirection === 'REVERSE') {
      unfix(window.scrollY - triggerElement.getBoundingClientRect().height);
    }
  });

  controller.addScene(scene);
});

document.querySelectorAll('.scroll-gallery').forEach((triggerElement) => {
  const sceneUnfix = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: 'onEnter',
  });

  sceneUnfix.on('enter leave', (event) => {
    if (event.type === 'enter' && event.scrollDirection === 'FORWARD') {
      unfix(window.scrollY + window.innerHeight - globalNavHeight);
    }
  });

  const sceneFix = new ScrollMagic.Scene({
    triggerElement,
    triggerHook: globalNavHeight / window.innerHeight,
  });

  sceneFix.on('enter leave', (event) => {
    if (event.type === 'enter' && event.scrollDirection === 'FORWARD') {
      fix();
    } else if (event.type === 'leave' && event.scrollDirection === 'REVERSE') {
      unfix(window.scrollY);
    }
  });

  controller.addScene([sceneUnfix, sceneFix]);
});

window.addEventListener('resize', () => {
  controller.enabled(window.innerWidth > 1100);
  controller.update(true);
});
