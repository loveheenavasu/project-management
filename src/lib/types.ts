export interface Project {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectManager: string;
  projectDescription?: string;
  isFavorite?: boolean;
}

export type ProjectCreateInput = Omit<Project, "projectId">;
export type ProjectUpdateInput = Partial<ProjectCreateInput>;
