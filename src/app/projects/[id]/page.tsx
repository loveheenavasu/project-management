"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message, Spin, DatePicker, Switch } from "antd";
import dayjs from "dayjs";

import { Project, ProjectUpdateInput } from "@/lib/types";
import { Layout } from "@/components";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [form] = Form.useForm();
  const { id } = use(params);

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
    console.log(values, "asdfasdfasdfasd");
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

  if (loading) {
    return (
      <Layout>
        <Spin />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen flex">
        <div className="flex-1 bg-white min-h-screen">
          <h1 className="text-2xl text-black font-semibold mb-6">
            Project Detail Page
          </h1>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <p className="mb-6 flex gap-2 items-center">
              Project ID:{" "}
              <span className="font-bold">{project?.projectId}</span>
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="projectName"
                label="Project Name"
                rules={[
                  { required: true, message: "Project name is required" },
                ]}
              >
                <Input placeholder="Enter project name" />
              </Form.Item>
              <Form.Item
                name="projectManager"
                label="Project Manager"
                rules={[
                  {
                    required: true,
                    message: "Project manager name is required",
                  },
                ]}
              >
                <Input placeholder="Enter project manager name" />
              </Form.Item>
            </div>

            <Form.Item name="projectDescription" label="Description">
              <Input.TextArea
                rows={4}
                placeholder="Enter project description"
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Start date is required" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[
                  { required: true, message: "End date is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value.isAfter(getFieldValue("startDate"))) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("End date must be after start date"),
                      );
                    },
                  }),
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>

            <Form.Item
              label="Mark as Favorite?"
              name="isFavorite"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Update
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
