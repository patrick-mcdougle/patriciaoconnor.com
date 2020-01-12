const projects = [];

class ProjectsFilter {
  constructor(container) {
    this.container = container;
    this.categories = [];
    this.navElement = this.container.querySelector('.projects-nav');
    if (this.navElement.children.length < 1) {
      throw new Error('projects-nav must contain at least one category');
    }
    for (let i = 0; i < this.navElement.children.length; i += 1) {
      this.categories.push(this.navElement.children[i].dataset.category);
    }
    this.activeElement = null;
    this.allProjects = this.container.querySelectorAll('.project');
    this.jumpElement = this.container.dataset.jumpElement;
    if (!this.setCategoryBasedOnWindowHash()) {
      this.setCurrentCategory(this.categories[0]);
    }
  }

  setCurrentCategory(category) {
    if (this.activeElement) {
      this.activeElement.classList.remove('active');
    }
    if (!this.categories.includes(category)) {
      throw new Error(`${category} was not found in your projects-nav, did you remember to include the data attributes?`);
    }
    this.activeElement = this.navElement.querySelector(`[data-category=${category}]`);
    this.activeElement.classList.add('active');
    this.currentCategory = category;
    this.renderResults();
  }

  setCategoryBasedOnWindowHash() {
    const hash = window.location.hash.substring(1);
    if (this.categories.includes(hash)) {
      this.setCurrentCategory(hash);
      if (this.jumpElement) {
        document.getElementById(this.jumpElement).scrollIntoView();
      }
      return true;
    }
    return false;
  }

  handleHashChange(e) {
    if (this.setCategoryBasedOnWindowHash()) {
      e.preventDefault();
    }
  }

  renderResults() {
    let selectedProjects;
    if (this.currentCategory === 'All') {
      selectedProjects = this.allProjects;
    } else {
      selectedProjects = this.container.querySelectorAll(`.projects [data-category=${this.currentCategory}]`);
    }

    this.allProjects.forEach((project) => {
      // eslint-disable-next-line no-param-reassign
      project.style.display = 'none';
    });

    selectedProjects.forEach((project) => {
      // eslint-disable-next-line no-param-reassign
      project.style.display = 'block';
    });
  }
}

document.querySelectorAll('.projects-container').forEach((containerElement) => {
  // eslint-disable-next-line no-new
  projects.push(new ProjectsFilter(containerElement));
});

window.addEventListener('hashchange', (e) => {
  projects.forEach((project) => {
    project.handleHashChange(e);
  });
});
