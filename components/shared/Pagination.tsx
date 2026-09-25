import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const baseButtonClass =
    "flex items-center justify-center w-10 h-10 border rounded text-base font-semibold transition-colors duration-200";

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonClass} text-slate-mid border-gray-200 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        &lt;
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="text-slate-mid flex h-10 w-10 items-center justify-center text-base font-semibold"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`${baseButtonClass} ${
              isActive
                ? "border-primary bg-primary text-white"
                : "text-slate-mid border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseButtonClass} text-slate-mid border-gray-200 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50`}
      >
        &gt;
      </button>
    </div>
  );
};
