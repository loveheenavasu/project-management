import { useRouter } from "next/navigation";
import { useProjects } from "./useProjects";
import { ColumnsType } from "antd/es/table";
import { Project } from "@/lib/types";
import { TABLE_COLUMNS } from "@/fixtures";
import { Button } from "antd";

export function useProjectListings() {
  const router = useRouter();
  const { loading, projects } = useProjects();

  const columns: ColumnsType<Project> = [
    ...TABLE_COLUMNS,
    {
      title: "",
      key: "action",
      render: (ele: Project) => (
        <Button
          onClick={() => {
            router.push(`/projects/${ele.projectId}`);
          }}
          type="primary"
          className="bg-blue-500"
        >
          Edit
        </Button>
      ),
    },
  ];

  return {
    columns,
    loading,
    projects,
  };
}
