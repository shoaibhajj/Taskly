"use client";
import EmptyProjects from "@/components/features/projects/components/EmptyProjects";
import ProjectCard from "@/components/features/projects/components/ProjectCard";
import SkeletonCard from "@/components/features/projects/components/SkeletonCard";
import { useListProjects } from "@/components/features/projects/hooks/useListProjects";
import Link from "next/link";
import PlusIcon from "@/app/icons/PlusIcon.svg";
import ProjectsError from "@/components/features/projects/components/ProjectsError";
export default function ProjectsPage() {
  const { projects, isLoading,error } = useListProjects();

  if (!isLoading && projects && projects.length <= 0) return <EmptyProjects />;
    if (error) return <ProjectsError />;
  return (
    <section className="bg-background flex h-full flex-col gap-10 overflow-y-auto p-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h2 className="text-slate-dark text-3xl leading-9 font-semibold">
            Projects
          </h2>
          <p className="text-slate-mid text-lg">
            Manage and curate your projects
          </p>
        </div>
        {isLoading ? (
          <div
            className={`rounded-card h-11.5 w-40 animate-pulse bg-slate-light`}
            role="status"
            aria-label="Loading action button"
          />
        ) : (
          <Link
            href={"project/add"}
            className="bg-primary text-body-md leading-btn rounded-card shadow-btn focus-visible:outline-primary px-6 py-3 text-center font-semibold text-white focus-visible:outline-offset-2 disabled:opacity-50"
          >
            Create New Project
          </Link>
        )}
      </div>
      <div className="rounded-card grid grid-cols-3 gap-6 gap-y-6">
        {isLoading ? (
          <SkeletonCard count={6} />
        ) : (
          projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
        {!isLoading && (
          <Link
            href={"/project/add"}
            className="flex min-h-62 w-full flex-col items-center justify-center space-y-2 bg-white p-6"
          >
            <div className="bg-surface-low flex h-12 w-12 items-center justify-center rounded-xl">
              <PlusIcon className="mx-auto h-5 w-5" />
            </div>
            <p className="text-slate-mid text-body-md text-center font-bold">
              ADD PROJECT
            </p>
          </Link>
        )}
      </div>
    </section>
  );
}
