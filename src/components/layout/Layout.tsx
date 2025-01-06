import { FavoriteIcon } from "@/icons";
import { Project } from "@/lib/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
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

  const favoriteProjects = useMemo(
    () => projects.filter((project) => project.isFavorite),
    [projects],
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const FavoritesList = () => (
    <>
      <h2 className="text-lg font-medium mb-4">Favorite Projects</h2>
      {!loading &&
        favoriteProjects.length < 1 &&
        "You have not added any project to favorites."}
      <ul className="list-disc pl-5">
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <li key={index} className="text-gray-400 animate-pulse mb-2">
                <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
              </li>
            ))
          : favoriteProjects.map((project) => (
              <li key={project.projectId} className="mb-2 text-black">
                <Link
                  href={`/projects/${project.projectId}`}
                  className="hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {project.projectName}
                </Link>
              </li>
            ))}
      </ul>
    </>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden p-4 border-b flex w-full justify-end">
        <button
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          <FavoriteIcon />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-4">
          <FavoritesList />
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop/Tablet Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 p-4">
          <FavoritesList />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-0 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
