import { createContext, useEffect, useState, ReactNode, useMemo } from "react";
import { Project } from "@/lib/types";

export interface ProjectsContextType {
  loading: boolean;
  projects: Project[];
  favoriteProjects: Project[];
  fetchProjects: () => void;
  refetchProjects: () => void;
}

export const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const refetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const favoriteProjects = useMemo(
    () => projects.filter((project) => project.isFavorite),
    [projects],
  );

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        projects,
        favoriteProjects,
        fetchProjects,
        refetchProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
