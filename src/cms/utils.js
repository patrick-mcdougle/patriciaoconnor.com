import fs from 'fs';
import path from 'path';

export async function getProjectData() {
  return fs.promises.readdir(path.resolve('src/cms/projects'))
    .then((fileNames) => fileNames.filter((fileName) => fileName.endsWith('.json')).sort())
    .then((fileNames) => Promise.all(fileNames.map(async (fileName) => ({
      fileName: fileName.split('.')[0],
      contents: await fs.promises.readFile(`src/cms/projects/${fileName}`),
    }))))
    .then((fileContents) => fileContents.map((fileMeta) => ({ ...JSON.parse(fileMeta.contents), url: `/${fileMeta.fileName}` })));
}

export function getProjectCategoriesFromProjects(projects) {
  const projectCategories = new Set();
  projects.forEach((project) => {
    project.category.forEach((category) => {
      projectCategories.add(category);
    });
  });
  return ['All Projects', ...Array.from(projectCategories.values()).sort()];
}

export async function getProjectCategories() {
  return getProjectCategoriesFromProjects(await getProjectData());
}
