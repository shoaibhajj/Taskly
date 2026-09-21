"use client"
import ProjectForm from "@/components/features/projects/components/ProjectForm";
import { useAddProject } from "@/components/features/projects/hooks/useAddProject";
import React from "react";

function AddProject() {

  const { addProject, error } = useAddProject();
  return (
    <div className="flex w-full flex-col px-8 py-6">
      <h1 className="text-slate-dark leading-headline-lg text-4xl font-semibold">
        Add New Project
      </h1>
      <div className="mx-auto flex w-full flex-col">
        <ProjectForm
          error={error}
          addProject={addProject}
          editProject={addProject}
          headerText="Initialize New Project "
          isSubmittingLabel="Creating..."
          isNotSubmittingLabel="Create Project"
        />
      </div>
    </div>
  );
}

export default AddProject;
