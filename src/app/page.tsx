"use client";

import { useEffect, useState } from "react";
import { Button, Spin, Table } from "antd";

import { Project } from "@/lib/types";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { Layout } from "@/components";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const columns: ColumnsType<Project> = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Project Manager",
      dataIndex: "projectManager",
      key: "projectManager",
    },
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spin />
      ) : (
        <div className="bg-white min-h-screen">
          <h1 className="text-2xl font-semibold text-black mb-6">
            Project List Page
          </h1>
          <div className="flex gap-6 overflow-auto ">
            <div className="flex-1">
              <Table
                columns={columns}
                dataSource={projects}
                pagination={false}
                className="bg-white rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
