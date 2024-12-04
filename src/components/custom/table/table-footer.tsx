import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { TableFooterSectionProps } from '@/types/custom-table';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown
} from 'lucide-react';
import React from 'react';

const TableFooterSection: React.FC<TableFooterSectionProps> = ({
  table,
  pagination,
  setPagination
}) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const totalData = table.getFilteredRowModel().rows.length;
  const totalSelectionData = table.getFilteredSelectedRowModel().rows.length;
  const tableGroupList = [10, 30, 50, 75, 100];

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize
    }));
    table.setPageSize(newPageSize);
  };

  const handleFirstPage = () => setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  const handlePreviousPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }));
  const handleNextPage = () =>
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(prev.pageIndex + 1, table.getPageCount() - 1)
    }));
  const handleLastPage = () =>
    setPagination((prev) => ({ ...prev, pageIndex: table.getPageCount() - 1 }));

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {totalSelectionData} of {totalData} row(s) selected.
      </div>
      <div className="flex items-center gap-x-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-center items-center gap-x-3">
              Rows per page
              <Button variant="outline">
                {pagination.pageSize}
                <ChevronsUpDown className="ml-auto" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="top">
            {tableGroupList.map((option, index) => (
              <DropdownMenuItem key={index} onClick={() => handlePageSizeChange(option)}>
                {option} {pagination.pageSize === option && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <h2>
          Page {currentPage} of {totalPages}
        </h2>

        <div className="flex justify-between items-center gap-x-3">
          <Button
            variant="outline"
            onClick={handleFirstPage}
            disabled={!table.getCanPreviousPage()}
            className="px-3"
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
            className="px-3"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
            className="px-3"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            onClick={handleLastPage}
            disabled={!table.getCanNextPage()}
            className="px-3"
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableFooterSection;
