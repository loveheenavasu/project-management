"use client";
import { use } from "react";

import { Form, Input, Button, Spin, DatePicker, Switch } from "antd";

import { Layout } from "@/components";
import { useManageProject } from "@/hooks";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { project, loading, form, onFinish } = useManageProject(id);

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
