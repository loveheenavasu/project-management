"use client";

import { Spin, Table } from "antd";
import { Layout } from "@/components";
import { useProjectListings } from "@/hooks";

export default function Home() {
  const { loading, columns, projects } = useProjectListings();

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
