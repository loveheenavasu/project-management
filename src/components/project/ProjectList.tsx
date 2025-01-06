import React from "react";
import Link from "next/link";
import { List, Card, Skeleton } from "antd";
import { Project } from "@/lib/types";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
}) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
      dataSource={projects}
      loading={loading}
      renderItem={(project) => (
        <List.Item>
          <Link href={`/project/${project.projectId}`}>
            <Card hoverable title={project.projectName} className="h-full">
              <Skeleton loading={loading} active>
                <p>Manager: {project.projectManager}</p>
                <p>
                  Start Date: {new Date(project.startDate).toLocaleDateString()}
                </p>
                <p>
                  End Date: {new Date(project.endDate).toLocaleDateString()}
                </p>
              </Skeleton>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default ProjectList;
