import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";

interface PaginationControlProps {
  currentPage: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  maxPageButtons?: number; // 显示多少个页码按钮
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  total,
  pageSize,
  pageSizeOptions = [50, 100, 500, 1000],
  onPageChange,
  onPageSizeChange,
  maxPageButtons = 5,
}) => {
  const pageCount = Math.ceil(total / pageSize) || 1;
  const showEllipsis = pageCount > maxPageButtons;

  // 计算页码区间
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-2 mt-4">
      <div className="text-sm text-muted-foreground">
        共 <span className="font-semibold">{total}</span> 条
      </div>
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <select
            className="border rounded px-2 py-1 text-sm focus:outline-none"
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
                style={{ pointerEvents: currentPage === 1 ? 'none' : undefined, opacity: currentPage === 1 ? 0.5 : 1 }}
              />
            </PaginationItem>
            {startPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
              </PaginationItem>
            )}
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {pageNumbers.map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            {endPage < pageCount - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {endPage < pageCount && (
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(pageCount)}>{pageCount}</PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
                aria-disabled={currentPage === pageCount}
                tabIndex={currentPage === pageCount ? -1 : 0}
                style={{ pointerEvents: currentPage === pageCount ? 'none' : undefined, opacity: currentPage === pageCount ? 0.5 : 1 }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
