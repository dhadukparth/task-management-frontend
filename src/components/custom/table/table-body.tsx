import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ColumnDef, flexRender, PaginationState, Table as TypeTable } from '@tanstack/react-table';
import React from 'react';

const TableBodySection = ({
  table,
  columns,
  loading,
  pagination
}: {
  table: TypeTable<any>;
  columns: ColumnDef<any>[];
  loading: boolean;
  pagination: PaginationState;
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <React.Fragment>
              {Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns.length }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="w-full h-8" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableBodySection;
