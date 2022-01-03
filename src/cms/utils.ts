import fs from 'fs';
import path from 'path';

export interface Project {
  category: string[];
  displayCategory: string;
  thumbnail: string;
  title: string;
  url: string;
}

export async function getProjectData(): Promise<Project[]> {
  return fs.promises.readdir(path.resolve('src/cms/projects'))
    .then((fileNames) => fileNames.filter((fileName) => fileName.endsWith('.json')).sort())
    .then((fileNames) => Promise.all(fileNames.map(async (fileName) => ({
      fileName: fileName.split('.')[0],
      contents: await fs.promises.readFile(`src/cms/projects/${fileName}`),
    }))))
    .then((fileContents) => fileContents.map((fileMeta) => ({ ...JSON.parse(fileMeta.contents.toString()), url: `/${fileMeta.fileName}` })));
}

export function getProjectCategoriesFromProjects(projects): string[] {
  const projectCategories: Set<string> = new Set();
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
