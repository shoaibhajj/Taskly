"use client";

import React from "react";
import WifiOffIcon from "@/app/icons/WifiOffIcon.svg";
import Link from "next/link";

interface ProjectsErrorProps {
  title?: string;
  description?: string;
}

export default function ProjectsError({
  title = "Something went wrong",
  description = "We're having trouble retrieving your projects right now. Please try again in a moment.",
}: ProjectsErrorProps) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center space-y-4 px-6 text-center"
      role="alert"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
        <WifiOffIcon className="text-error h-6 w-6" aria-hidden="true" />
      </div>

      <div className="space-y-1">
        <h3 className="text-slate-dark text-lg font-bold">{title}</h3>
        <p className="text-slate-mid mx-auto max-w-xs text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <Link
        href={"project"}
        className="bg-primary text-body-md leading-btn rounded-card shadow-btn focus-visible:outline-primary px-6 py-3 text-center font-semibold text-white focus-visible:outline-offset-2 disabled:opacity-50"
      >
        Retry Connection
      </Link>
    </div>
  );
}
