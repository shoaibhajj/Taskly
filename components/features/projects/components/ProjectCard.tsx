import { Project } from "../types";
import EpicsIcon from "@/app/icons/EpicsIcon.svg";
import TasksIcon from "@/app/icons/TasksIcon.svg";
import MembersIcon from "@/app/icons/MembersIcon.svg";
import Link from "next/link";
interface Props {
  project: Project;
}
function ProjectCard({
  project: { id: projectId, description, name, created_at },
}: Props) {
  const subLinks = [
    { id: "epics", label: "Epics", Icon: EpicsIcon, href: "epics" },
    { id: "tasks", label: "Tasks", Icon: TasksIcon, href: "tasks" },
    { id: "members", label: "Members", Icon: MembersIcon, href: "members" },
  ];

  return (
    <div className="h-62 w-full space-y-2 bg-white p-6">
      <h2 className="text-slate-dark text-title-md line-clamp-1 max-w-sm leading-7 font-medium">
        {name}
      </h2>
      <p className="text-slate-mid text-body-md line-clamp-2 max-w-sm">
        {description}
      </p>

      <div className="flex justify-between">
        {subLinks.map(({ id, label, Icon, href }) => {
          return (
            <Link
              key={id}
              href={`/project/${projectId}/${href}`}
              className="text-body-md text-primary flex w-full items-center gap-1 rounded-4xl pt-4 text-left font-semibold"
            >
              <Icon className={`"text-primary" h-4.5 w-5 shrink-0`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex h-9.25 w-full items-end justify-between">
        <p className="text-surface-medium text-label-sm font-bold">
          CREATED AT
        </p>
        <p className="text-body-md font-medium text-[#434654]">
          {new Date(created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
