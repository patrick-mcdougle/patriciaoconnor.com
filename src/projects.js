// TODO: Consider the mobile breakpoint transition.

class ProjectsFilter {
  constructor(container, category = 'all') {
    // TODO: Handle the min-height on first render.
    this.container = container;
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.navElement = this.container.querySelector('.projects-nav');
    this.activeElement = null;
    this.allProjects = this.container.querySelectorAll('.project');
    this.setCurrentCategory(category);
  }

  setCurrentCategory(category) {
    if (this.activeElement) {
      this.activeElement.classList.remove('active');
    }
    this.activeElement = this.navElement.querySelector(`[data-category=${category}]`);
    if (this.activeElement === null) {
      throw new Error(`${category} was not found in your projects-nav, did you remember to include the data attributes?`);
    }
    this.activeElement.classList.add('active');
    this.currentCategory = category;
    this.renderResults();
  }

  handleClick(e) {
    const { target } = e;
    if (target.parentElement === this.navElement) {
      this.setCurrentCategory(target.dataset.category);
      e.preventDefault();
    }
  }

  renderResults() {
    this.allProjects.forEach((project) => {
      // eslint-disable-next-line no-param-reassign
      project.style.opacity = '0';
    });

    let selectedProjects;
    if (this.currentCategory === 'all') {
      selectedProjects = this.allProjects;
    } else {
      selectedProjects = this.container.querySelectorAll(`.projects [data-category=${this.currentCategory}]`);
    }

    window.setTimeout(() => {
      this.allProjects.forEach((project) => {
        // eslint-disable-next-line no-param-reassign
        project.style.display = 'none';
      });

      selectedProjects.forEach((project) => {
        // eslint-disable-next-line no-param-reassign
        project.style.display = 'block';
      });

      window.setTimeout(() => {
        selectedProjects.forEach((project) => {
          // eslint-disable-next-line no-param-reassign
          project.style.opacity = '1';
        });
      }, 25);
    }, 300);
  }
}

document.querySelectorAll('.projects-container').forEach((containerElement) => {
  // eslint-disable-next-line no-new
  window.debug = new ProjectsFilter(containerElement);
});
