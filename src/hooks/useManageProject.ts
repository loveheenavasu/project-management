import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Form } from "antd";
import dayjs from "dayjs";
import { ProjectUpdateInput } from "@/lib/types";
import { useProjects } from "./useProjects";

export const useManageProject = (id: string) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const { projects, loading } = useProjects();

  const project = projects.find((ele) => ele.projectId === id);

  useEffect(() => {
    const setFormData = async () => {
      if (project) {
        form.setFieldsValue({
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          startDate: project.startDate ? dayjs(project.startDate) : null,
          endDate: project.endDate ? dayjs(project.endDate) : null,
          projectManager: project.projectManager,
          isFavorite: project?.isFavorite,
        });
      }
    };

    setFormData();
  }, [project, form]);

  const onFinish = async (values: ProjectUpdateInput) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startDate: values.startDate
            ? dayjs(values.startDate).format("YYYY-MM-DD")
            : null,
          endDate: values.endDate
            ? dayjs(values.endDate).format("YYYY-MM-DD")
            : null,
        }),
      });

      if (response.ok) {
        message.success("Project updated successfully");
        router.push("/");
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      message.error(
        (error as { message: string }).message || "Error updating project",
      );
    }
  };

  return {
    project,
    loading,
    form,
    onFinish,
  };
};
