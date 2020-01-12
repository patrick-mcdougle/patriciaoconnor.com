const navContainer = document.getElementById('nav-container');
const primaryNav = document.getElementById('primary-nav');
const subnavContainer = document.getElementById('subnav-container');

// Pixels per frame
const openSpeed = 25;
const closeSpeed = 20;
const animatingNavs = [];
let navOpen = false;

// TODO: Remove all the unneeded foreach loops

function rafFrame() {
  animatingNavs.reduceRight((acc, config, index, array) => {
    const animationConfig = config;
    if (animationConfig.value - animationConfig.targetValue > closeSpeed) {
      animationConfig.value -= closeSpeed;
    } else if (animationConfig.targetValue - animationConfig.value > openSpeed) {
      animationConfig.value += openSpeed;
    } else {
      animationConfig.value = animationConfig.targetValue;
      array.splice(index, 1);
      animationConfig.resolve();
    }

    animationConfig.element.style.height = `${animationConfig.value}px`;

    return acc;
  }, 0);

  if (animatingNavs.length) {
    window.requestAnimationFrame(rafFrame);
  }
}

function smoothlySlideElement(newElement, value = newElement.scrollHeight) {
  let shouldReturn = false;
  animatingNavs.forEach((animationConfig) => {
    const config = animationConfig;
    if (config.element === newElement) {
      config.targetValue = value;
      shouldReturn = config.promise;
    }
  });

  if (shouldReturn) {
    return shouldReturn;
  }

  // start the raf loop if we're adding the first element.
  if (!animatingNavs.length) {
    window.requestAnimationFrame(rafFrame);
  }

  let resolve;

  const promise = new Promise((res) => {
    resolve = res;
  });

  const animationConfig = {
    element: newElement,
    value: newElement.getBoundingClientRect().height,
    targetValue: value,
    resolve,
    promise,
  };

  animatingNavs.push(animationConfig);
  return promise;
}

function expandOrContractSubnav(index) {
  for (let i = 0; i < subnavContainer.children.length; i += 1) {
    subnavContainer.children[i].classList.remove('active', 'animated');
    navOpen = false;
  }
  if (index) {
    subnavContainer.children[index].classList.add('active');
    smoothlySlideElement(
      subnavContainer, subnavContainer.children[index].scrollHeight,
    ).then(() => {
      subnavContainer.children[index].classList.add('animated');
      navOpen = true;
    });
  } else {
    smoothlySlideElement(subnavContainer, 0);
  }
}

primaryNav.addEventListener('mouseover', (event) => {
  if (event.target === primaryNav || window.innerWidth <= 1100) { return; }
  expandOrContractSubnav(event.target.dataset.subnav);
});

navContainer.addEventListener('mouseleave', expandOrContractSubnav.bind(navContainer, undefined));

document.addEventListener('click', () => {
  if (!navOpen || window.innerWidth > 1100) { return; }
  navContainer.classList.remove('open');
  expandOrContractSubnav();
});

primaryNav.addEventListener('click', (event) => {
  if (event.target === primaryNav
    || event.target.dataset.disableMobile
    || !event.target.dataset.subnav
    || window.innerWidth > 1100
    || navOpen
  ) { return; }
  navContainer.classList.add('open');
  expandOrContractSubnav(event.target.dataset.subnav);
  event.stopPropagation();
  event.preventDefault();
});
