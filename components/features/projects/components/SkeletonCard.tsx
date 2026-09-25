import React from "react";

interface SkeletonCardProps {
  count?: number;
  className?: string;
}

const SkeletonCardItem: React.FC = () => {
  return (
    <div
      className="flex min-h-62 w-full animate-pulse flex-col space-y-3 bg-white p-6"
      role="status"
      aria-label="Loading project card"
    >
      <div className="bg-slate-light h-32 w-full rounded-xl" />

      <div className="bg-slate-light h-4 w-3/4 rounded" />

      <div className="bg-slate-light h-3 w-1/2 rounded" />
    </div>
  );
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  count = 6,
  className = "",
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCardItem key={index} />
      ))}
    </>
  );
};

export default SkeletonCard;
