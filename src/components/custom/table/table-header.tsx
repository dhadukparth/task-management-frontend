import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableHeaderSectionProps } from '@/types/custom-table';
import { Columns2, GripHorizontal, ListFilter, Search, X } from 'lucide-react';
import React from 'react';
import FormikWrapper from '../formik/formik-wrapper';
import FilterForm from './filter-form';

const TableHeaderSection: React.FC<TableHeaderSectionProps> = ({
  table,
  asChild,
  children,
  filter = null,
  leftSideSection
}) => {
  const columnsList = table.getAllColumns();

  const handleCombinedFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    table.getColumn('email')?.setFilterValue(filterValue);
  };

  const clearSearch = () => {
    table.getColumn('email')?.setFilterValue('');
  };

  return (
    <div className="grid grid-cols-2 gap-x-4 py-4">
      <div className="flex justify-start items-center">{leftSideSection}</div>
      {/* Dropdown Menu for controlling column visibility */}
      <div className="flex items-center justify-end gap-x-4">
        {/*  SearchBox for the searching data */}
        <div className="relative w-fit border rounded px-2 shadow flex justify-start items-center">
          <div className="">
            <Search />
          </div>
          <Input
            placeholder="Search..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={handleCombinedFilterChange}
            className="border-0 focus-visible:border-0 focus-visible:ring-0"
          />
          {(table.getColumn('email')?.getFilterValue() as string) ? (
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={clearSearch}
            >
              <X />
            </button>
          ) : null}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns2 className="size-4" /> Columns
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {columnsList
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    <div className="flex justify-between items-center w-full gap-x-6">
                      {column.id?.toString()?.replace(/\//g, '_').replace(/_/g, ' ').toLowerCase()}
                      <GripHorizontal className="size-5" />
                    </div>
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {filter ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListFilter className="size-4" /> Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[800px]">
              <FormikWrapper
                initialValues={{ filters: [{}] }}
                validationSchema={null}
                onSubmit={filter?.handleSubmit}
              >
                <FilterForm columnsList={columnsList} filter={filter} />
              </FormikWrapper>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {asChild === true && children}
      </div>
    </div>
  );
};

export default TableHeaderSection;
