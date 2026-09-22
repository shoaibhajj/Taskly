"use client";
import EpicsIcon from "@/app/icons/EpicsIcon.svg";
import TasksIcon from "@/app/icons/TasksIcon.svg";
import MembersIcon from "@/app/icons/MembersIcon.svg";
import DetailsIcon from "@/app/icons/DetailsIcon.svg";
import ProjectsIcon from "@/app/icons/Projects.svg";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCurrentProjectId } from "../hooks/useCurrentProjectId";

function BottomNavBar() {
  const pathname = usePathname();
  const { id: projectId, isInsideProject } = useCurrentProjectId();
  const subLinks = [
    { id: "projects", label: "Projects", Icon: ProjectsIcon, href: "" },
    { id: "epics", label: "Epics", Icon: EpicsIcon, href: "epics" },
    { id: "tasks", label: "Tasks", Icon: TasksIcon, href: "tasks" },
    { id: "members", label: "Members", Icon: MembersIcon, href: "members" },
    { id: "details", label: "Details", Icon: DetailsIcon, href: "edit" },
  ];

  return (
    <div className="bg-surface-low fixed bottom-0 flex h-16 w-full items-center px-7 md:hidden">
      {subLinks.map(({ id, label, Icon, href }) => {
        const isActive =
          href === ""
            ? pathname.endsWith(`/project`)
            : pathname.endsWith(`/${href}`);
        const fullLink =
          href === "" ? `/project` : `/project/${projectId}/${href}`;

        return (
          <Item
            key={id}
            label={label}
            link={fullLink}
            isActive={isActive}
            isInsideProject={isInsideProject}
          >
            <Icon
              className={`h-5 w-5 ${
                isActive
                  ? "bg-surface-low text-primary fill-primary font-semibold"
                  : "text-slate-mid hover:bg-surface-low/50 hover:text-slate-dark fill-slate-dark"
              }`}
            />
          </Item>
        );
      })}
    </div>
  );
}

const Item = ({
  children,
  label,
  link,
  isActive,
  isInsideProject,
}: {
  children: ReactNode;
  label: string;
  link: string;
  isActive: boolean;
  isInsideProject: boolean;
}) => {
  const isDisabled = !isInsideProject && label !== "Projects";
  return (
    <Link
      href={link}
      tabIndex={isDisabled ? -1 : undefined}
      className={`flex flex-1 flex-col items-center justify-center space-y-0.5 transition-all ${
        isDisabled
          ? "pointer-events-none cursor-not-allowed"
          : isActive
            ? "bg-surface-low text-primary font-semibold"
            : "text-slate-mid hover:bg-surface-low/50 hover:text-slate-dark"
      }`}
    >
      {children}
      <p className="text-label-xs font-semibold">{label}</p>
    </Link>
  );
};
export default BottomNavBar;
