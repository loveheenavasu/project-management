import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Form } from "antd";
import dayjs from "dayjs";
import { Project, ProjectUpdateInput } from "@/lib/types";

export const useManageProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        const data = await response.json();
        setProject(data);
        form.setFieldsValue({
          projectName: data.projectName,
          projectDescription: data.projectDescription,
          startDate: data.startDate ? dayjs(data.startDate) : null,
          endDate: data.endDate ? dayjs(data.endDate) : null,
          projectManager: data.projectManager,
          isFavorite: data?.isFavorite,
        });
      } catch (error) {
        message.error(
          (error as { message: string }).message ||
            "Failed to fetch project details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, form]);

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
