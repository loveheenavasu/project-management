import { Project } from "./types";

export let projects: Project[] = [
  {
    projectId: "project_a",
    projectName: "Project A",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true,
  },
  {
    projectId: "project_b",
    projectName: "Project B",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
    isFavorite: true,
  },
  {
    projectId: "project_c",
    projectName: "Project C",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_e",
    projectName: "Project E",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_f",
    projectName: "Project F",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
  {
    projectId: "project_g",
    projectName: "Project G",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    projectManager: "John Doe",
  },
];

export const updateProject = (
  projectId: string,
  updatedData: Partial<Project>,
) => {
  const index = projects.findIndex((p) => p.projectId === projectId);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedData };
    return projects[index];
  }
  return null;
};

export const addProject = (project: Omit<Project, "projectId">) => {
  const newProject: Project = {
    ...project,
    projectId: Date.now().toString(),
  };
  projects.push(newProject);
  return newProject;
};

export const deleteProject = (projectId: string) => {
  const index = projects.findIndex((p) => p.projectId === projectId);
  if (index !== -1) {
    projects = projects.filter((p) => p.projectId !== projectId);
    return true;
  }
  return false;
};

export const getProject = (projectId: string) => {
  return projects.find((p) => p.projectId === projectId) || null;
};
