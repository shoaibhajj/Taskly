"use client";
import ProjectForm from "@/components/features/projects/components/ProjectForm";
import { useEditProject } from "@/components/features/projects/hooks/useEditProject";
import { useGetProject } from "@/components/features/projects/hooks/useGetProject";
import { useParams } from "next/navigation";

function EditProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const { editProject, error } = useEditProject();
  const { project, isLoading } = useGetProject(projectId);

  console.log(project);

  return (
    <div className="flex w-full flex-col px-8 py-6">
      <h1 className="text-slate-dark leading-headline-lg text-4xl font-semibold">
        Edit Project
      </h1>
      <div className="mx-auto flex w-full flex-col">
        {!isLoading && (
          <ProjectForm
            name={project?.name}
            description={project?.description}
            error={error}
            editProject={editProject}
            id={projectId}
            headerText="Edit Project"
            isSubmittingLabel="Saving..."
            isNotSubmittingLabel="Save Changes"
          />
        )}
      </div>
    </div>
  );
}

export default EditProject;
