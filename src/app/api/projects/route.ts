import { NextResponse } from "next/server";
import { projects, addProject } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newProject = addProject(body);
  return NextResponse.json(newProject, { status: 201 });
}
