"use client";

import { ProjectsProvider } from "@/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectsProvider>{children}</ProjectsProvider>;
}
