import { describe, expect, it, beforeEach } from "@jest/globals";
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/projects/route";
import { GET as getProject, PUT } from "@/app/api/projects/[id]/route";
import { projects } from "@/lib/mockData";

describe("Projects API", () => {
  const originalProjects = [...projects];

  beforeEach(() => {
    projects.length = 0;
    projects.push(...originalProjects);
  });

  it("GET /api/projects returns all projects", async () => {
    const response = await GET();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(6);
    expect(data[0].projectName).toBe("Project A");
  });

  it("GET /api/projects/[id] returns a single project", async () => {
    const url = "http://localhost:3000/api/projects/project_a";
    const init = { method: "GET" };
    const request = new NextRequest(url, init);

    const response = await getProject(request, {
      params: new Promise((resolve) => resolve({ id: "project_a" })),
    });
    const data = await response.json();
    expect(data.projectId).toBe("project_a");
    expect(data.projectName).toBe("Project A");
  });

  it("PUT /api/projects/[id] updates a project", async () => {
    const updatedProject = {
      projectName: "Updated Project",
      projectManager: "Jane Doe",
    };

    const url = "http://localhost:3000/api/projects/project_a";
    const init = {
      method: "PUT",
      body: JSON.stringify(updatedProject),
    };
    const request = new NextRequest(url, init);

    const response = await PUT(request, {
      params: new Promise((resolve) => resolve({ id: "project_a" })),
    });
    const data = await response.json();

    expect(data.projectName).toBe("Updated Project");
    expect(data.projectManager).toBe("Jane Doe");
    expect(data.projectId).toBe("project_a");
    expect(data.startDate).toBe("2025-01-01");
    expect(data.endDate).toBe("2025-12-31");
  });

  it("POST /api/projects creates a new project", async () => {
    const newProject = {
      projectName: "New Project",
      startDate: "2025-07-01",
      endDate: "2025-12-31",
      projectManager: "Alice Smith",
    };

    const url = "http://localhost:3000/api/projects";
    const init = {
      method: "POST",
      body: JSON.stringify(newProject),
    };
    const request = new NextRequest(url, init);

    const response = await POST(request);
    const data = await response.json();

    expect(data.projectName).toBe("New Project");
    expect(data.projectManager).toBe("Alice Smith");
    expect(data.projectId).toBeDefined();
    expect(projects).toHaveLength(7);
  });
});
