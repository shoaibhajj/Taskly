"use client";
import { FormField } from "@/components/ui/FromField";
import { ProjectFormData, projectSchema } from "../schemas/project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProject } from "../hooks/useAddProject";
import Button from "@/components/ui/Button";
import Link from "next/link";
import SuccessIcon from "@/app/icons/SuccessIcon.svg";
import TipIcon from "@/app/icons/TipIcon.svg";
import { ApiError } from "@/lib/api/client";

interface Props extends Partial<ProjectFormData> {
  headerText: string;
  error: ApiError | undefined;
  addProject?: (data: ProjectFormData) => Promise<void>;
  editProject?: (data: ProjectFormData, id: string) => Promise<void>;
  id?: string;
  isSubmittingLabel: string;
  isNotSubmittingLabel: string;
}
export default function ProjectForm({
  name,
  description,
  headerText,
  addProject,
  editProject,
  id,
  error,
  isSubmittingLabel,
  isNotSubmittingLabel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: name ? name : "",
      description: description ? description : "",
    },
  });

  const handleAddEditSubmit = (data: ProjectFormData) => {
    if (editProject && id) {
      editProject(data, id);
    } else if (addProject) {
      addProject(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => handleAddEditSubmit(data))}
      className="h[511px] mx-auto flex w-full flex-col gap-8 p-8 md:max-w-2xl"
    >
      <div className="flex items-center gap-1">
        <div className="bg-surface-highest flex h-11 w-11.5 items-center justify-center rounded-sm p-3">
          <SuccessIcon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-slate-dark text-2xl leading-8 font-semibold">
            {headerText}
          </h2>
          <p className="text-slate-mid text-body-md">
            Define the scope and foundational details of your project.
          </p>
        </div>
      </div>
      <FormField<ProjectFormData>
        id="name"
        type="text"
        register={register}
        errors={errors}
        label="Project TITLE *"
        name="name"
        placeholder="Tasks Management project"
      />
      <div className="relative flex w-full justify-between">
        <FormField<ProjectFormData>
          id="description"
          type="textarea"
          register={register}
          errors={errors}
          label="DESCRIPTION"
          name="description"
          placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
          rows={5}
          className="bg-surface-highest min-h-30 w-full resize-y rounded-md p-3"
        />
        <p className="text-slate-mid absolute top-0 right-0">Optional</p>
        <p className="text-slate-mid absolute top-38 right-0">
          0 / 500 characters
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Link
          href="/project"
          className="px-btn-x text-slate-mid text-body-md bg-white py-4 font-bold"
        >
          Back
        </Link>

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="px-btn-x w-fit py-4"
        >
          {isSubmitting ? isSubmittingLabel : isNotSubmittingLabel}
        </Button>
      </div>

      {error && (
        <p className="text-error w-full text-center text-[12px] font-medium">
          Failed To Add New Project, Try Again Later{" "}
        </p>
      )}

      <div className="bg-surface-low flex w-full gap-3 p-6">
        <TipIcon className="h-5 w-5" />
        <p className="text-slate-mid text-label-sm font-bold">
          <span>Pro Tip</span>: You can invite project members and assign epics
          immediately after the initial creation process.
        </p>
      </div>
    </form>
  );
}
