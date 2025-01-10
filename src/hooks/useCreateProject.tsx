import { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Form } from "antd";
import dayjs from "dayjs";
import { ProjectCreateInput } from "@/lib/types";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: ProjectCreateInput) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          startDate: values.startDate
            ? dayjs(values.startDate).format("YYYY-MM-DD")
            : null,
          endDate: values.endDate
            ? dayjs(values.endDate).format("YYYY-MM-DD")
            : null,
          isFavorite: false,
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirect to the list page or home
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      message.error(
        (error as { message: string }).message || "Error creating project",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    form,
    onFinish,
  };
};
