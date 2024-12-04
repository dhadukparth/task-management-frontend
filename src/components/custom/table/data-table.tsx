import { Show } from '@/lib/condition-check';
import { DataTableProps } from '@/types/custom-table';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import React from 'react';
import TableBodySection from './table-body';
import TableFooterSection from './table-footer';
import TableHeaderSection from './table-header';

const DataTable = <T,>({
  dataList,
  columnsList,
  loading,
  asHeaderChild = false,
  children,
  filter,
  leftSideSection
}: DataTableProps<T>): JSX.Element => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable<T>({
    data: dataList,
    columns: columnsList,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  });

  return (
    <div>
      <Show>
        <Show.When isTrue={asHeaderChild}>
          <TableHeaderSection table={table} leftSideSection={leftSideSection} filter={filter} asChild>
            {children}
          </TableHeaderSection>
        </Show.When>
        <Show.Else>
          <TableHeaderSection table={table} leftSideSection={leftSideSection} filter={filter} />
        </Show.Else>
      </Show>
      <TableBodySection
        table={table}
        columns={columnsList}
        loading={loading}
        pagination={pagination}
      />
      <TableFooterSection table={table} pagination={pagination} setPagination={setPagination} />
    </div>
  );
};

export default DataTable;