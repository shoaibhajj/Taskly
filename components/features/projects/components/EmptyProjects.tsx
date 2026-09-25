import Image from "next/image";
import Link from "next/link";
import React from "react";

function EmptyProjects() {
  return (
    <section className="bg-background flex h-full w-full flex-col items-center justify-center">
      <Image
        src={"/emptyProjects.png"}
        width={400}
        height={400}
        alt={""}
        className="mt-40"
      />
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-slate-dark leading-headline-lg mt-11 text-4xl font-semibold">
          No Projects
        </h1>
        <p className="text-slate-mid w-108.5 text-center text-lg text-wrap">
          You don’t have any projects yet. Start by defining your first
          architectural workspace to begin tracking tasks and epics.
        </p>
      </div>
      <Link
        href={"project/add"}
        className="bg-primary text-body-md leading-btn rounded-card shadow-btn focus-visible:outline-primary my-2 px-6 py-3 text-center font-semibold text-white focus-visible:outline-offset-2 disabled:opacity-50"
      >
        Create New Project
      </Link>
    </section>
  );
}

export default EmptyProjects;
