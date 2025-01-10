"use client";
import { use } from "react";
import { Button, Spin, Typography } from "antd";
import { useManageProject } from "@/hooks";
import { useRouter } from "next/navigation";
import { BookmarkIcon } from "@/icons";

const { Text } = Typography;

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { project, loading } = useManageProject(id);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex w-full min-w-full justify-between">
        <h1 className="text-2xl text-black font-semibold mb-12">
          Project Detail Page
        </h1>
        {project?.isFavorite && (
          <BookmarkIcon color="#FF5B61" stroke="#FF5B61" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-16 gap-y-6  items-center w-fit">
        <Text className="justify-self-end">Project ID</Text>
        <div className="flex w-full min-w-full justify-between">
          <Text>{project?.projectId}</Text>
        </div>

        <Text className="justify-self-end">Project Name</Text>
        <Text>{project?.projectName}</Text>

        <Text className="justify-self-end">Description</Text>
        <Text className="max-w-xl">{project?.projectDescription ?? "-"}</Text>

        <Text className="justify-self-end">Start Date</Text>
        <Text>{project?.startDate}</Text>

        <Text className="justify-self-end">End Date</Text>
        <Text>{project?.endDate}</Text>

        <Text className="justify-self-end">Project Manager</Text>
        <Text>{project?.projectManager}</Text>
      </div>

      <div className="flex gap-16 mt-16">
        <Button
          type="primary"
          size="large"
          style={{
            paddingInline: "2rem",
          }}
          onClick={() => router.back()}
          className="bg-blue-500"
        >
          Back
        </Button>

        <Button
          type="primary"
          style={{
            paddingInline: "2rem",
          }}
          size="large"
          onClick={() => router.push(`/projects/${project?.projectId}/edit`)}
          className="bg-blue-500"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
