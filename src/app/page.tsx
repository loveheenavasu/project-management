"use client";

import { Button, Spin, Table } from "antd";
import { Layout } from "@/components";
import { useProjectListings } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loading, columns, projects } = useProjectListings();

  const router = useRouter();

  return (
    <Layout>
      {loading ? (
        <Spin />
      ) : (
        <div className="bg-white min-h-screen">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-black mb-6">
              Project List Page
            </h1>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/projects/add")}
              className="bg-blue-500"
            >
              Create Project
            </Button>
          </div>
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
