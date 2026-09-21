import ProjectForm from "@/components/features/projects/components/ProjectForm";
import React from "react";

function AddProject() {
  return (
    <div className="flex w-full flex-col px-8 py-6">
      <h1 className="text-slate-dark leading-headline-lg text-4xl font-semibold">
        Add New Project
      </h1>
      <div className="mx-auto flex w-full flex-col">
        <ProjectForm
          headerText="Initialize New Project "
          headerBody="Define the scope and foundational details of your project."
        />
      </div>
    </div>
  );
}

export default AddProject;
