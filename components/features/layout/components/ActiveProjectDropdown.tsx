"use client";
import { useState } from "react";

import FolderIcon from "@/app/icons/FolderIcon.svg";
import ArrowIcon from "@/app/icons/ArrowIcon.svg";
import EpicsIcon from "@/app/icons/EpicsIcon.svg";
import TasksIcon from "@/app/icons/TasksIcon.svg";
import MembersIcon from "@/app/icons/MembersIcon.svg";
import DetailsIcon from "@/app/icons/DetailsIcon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveProjectDropdown({
  isCollapsed,
  projectId,
}: {
  isCollapsed: boolean;
  projectId: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const subLinks = [
    { id: "epics", label: "Epics", Icon: EpicsIcon, href: "epics" },
    { id: "tasks", label: "Tasks", Icon: TasksIcon, href: "tasks" },
    { id: "members", label: "Members", Icon: MembersIcon, href: "members" },
    { id: "details", label: "Details", Icon: DetailsIcon, href: "edit" },
  ];

  const shouldShowSublinks = isCollapsed ? isHovered : isOpen;

  return (
    <div
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      className={`w-full transition-all md:max-w-60 ${
        isCollapsed ? "relative px-0" : "px-2"
      } `}
    >
      <button
        onClick={() => !isCollapsed && setIsOpen((prev) => !prev)}
        className={`rounded-card text-primary my-4 flex w-full items-center py-4 transition-colors ${
          isCollapsed ? "justify-center p-3" : "justify-between px-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <FolderIcon className="h-5 w-5 shrink-0 fill-none stroke-2" />
          {!isCollapsed && (
            <span className="text-body-md max-w-35 truncate font-semibold">
              Active Project Na...
            </span>
          )}
        </div>

        {!isCollapsed && (
          <ArrowIcon
            className={`text-primary/70 fill-primary/70 h-4 w-4 transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        )}
      </button>

      <div
        className={`z-50 transition-all duration-300 ease-in-out ${
          isCollapsed
            ? `${shouldShowSublinks ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} rounded-card border-slate-light/50 bg-surface-low invisible visible absolute top-0 left-full ml-2 w-52 border p-2 shadow-lg transition-opacity`
            : `${shouldShowSublinks ? "mt-1 grid-rows-[1fr]" : "grid-rows-[0fr] opacity-0"} grid opacity-100`
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`flex flex-col gap-1 ${
              isCollapsed ? "" : "bg-background p-2 shadow-sm"
            }`}
          >
            {subLinks.map(({ id, label, Icon, href }) => {
              const isActive = pathname.endsWith(`/${href}`);

              return (
                <Link
                  key={id}
                  href={`/project/${projectId}/${href}`}
                  className={`text-body-md flex w-full items-center gap-4 rounded-4xl px-4 py-3 text-left font-medium transition-all ${
                    isActive
                      ? "bg-surface-low text-primary font-semibold"
                      : "text-slate-mid hover:bg-surface-low/50 hover:text-slate-dark"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive ? "text-primary" : "text-slate-dark"
                    }`}
                  />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
