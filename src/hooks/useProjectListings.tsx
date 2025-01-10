import { useRouter } from "next/navigation";
import { useProjects } from "./useProjects";
import { ColumnsType } from "antd/es/table";
import { Project } from "@/lib/types";
import { TABLE_COLUMNS } from "@/fixtures";
import { Button } from "antd";
import { BookmarkIcon } from "@/icons";

export function useProjectListings() {
  const router = useRouter();
  const { loading, projects, refetchProjects } = useProjects();

  const updateProject = async (values: Project) => {
    try {
      const response = await fetch(`/api/projects/${values.projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          isFavorite: !values.isFavorite,
        }),
      });

      if (response.ok) {
        refetchProjects();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns: ColumnsType<Project> = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
      render: (projectId) => (
        <button
          onClick={() => {
            router.push(`/projects/${projectId}`);
          }}
        >
          {projectId}
        </button>
      ),
      onCellClick: (ele) => {
        router.push(`/projects/${ele?.projectId}`);
      },
    },
    ...TABLE_COLUMNS,
    {
      title: "",
      key: "action",
      render: (project: Project) => (
        <div className="flex gap-4 items-center">
          <BookmarkIcon
            color={project.isFavorite ? "#FF5B61" : "transparent"}
            stroke={project.isFavorite ? "#FF5B61" : "currentColor"}
            cursor="pointer"
            onClick={() => {
              updateProject(project);
            }}
          />

          <Button
            onClick={() => {
              router.push(`/projects/${project?.projectId}/edit`);
            }}
            type="primary"
            size="middle"
            className="bg-blue-500"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return {
    columns,
    loading,
    projects,
  };
}
