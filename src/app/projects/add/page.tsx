"use client";

import { Form, Input, Button, Spin, DatePicker } from "antd";
import { useCreateProject, useProjects } from "@/hooks";

export default function AddProject() {
  const { form, onFinish, loading } = useCreateProject();

  const { projects } = useProjects();

  if (loading) {
    return <Spin />;
  }

  return (
    <div className="bg-white min-h-screen flex">
      <div className="flex-1 bg-white min-h-screen">
        <h1 className="text-2xl text-black font-semibold mb-6">Add Project</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="projectId"
            label="Project ID"
            rules={[
              { required: true, message: "Project ID is required" },
              {
                validator: async (_, value) => {
                  const projectExists = projects.some(
                    (project) => project.projectId === value.trim(),
                  );
                  if (projectExists) {
                    return Promise.reject(
                      new Error("Project ID already exists"),
                    );
                  }
                },
              },
            ]}
          >
            <Input placeholder="Enter project ID" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="projectName"
              label="Project Name"
              rules={[{ required: true, message: "Project name is required" }]}
            >
              <Input placeholder="Enter project name" />
            </Form.Item>
            <Form.Item
              name="projectManager"
              label="Project Manager"
              rules={[
                { required: true, message: "Project manager name is required" },
              ]}
            >
              <Input placeholder="Enter project manager name" />
            </Form.Item>
          </div>

          <Form.Item name="projectDescription" label="Description">
            <Input.TextArea rows={4} placeholder="Enter project description" />
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

          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
}
