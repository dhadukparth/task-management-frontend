import { Column, ColumnDef, PaginationState, Table } from '@tanstack/react-table';

export type TableFilterOperationType = {
  label: string;
  value: string;
};

type TableFilterBaseType = {
  operationList: TableFilterOperationType[];
  handleSubmit: (values: any) => void;
};

type TableHeaderBase = {
  table: Table<any>;
  asChild?: boolean;
  filter?: TableFilterBaseType | null;
  leftSideSection?: React.ReactNode;
};

export type TableHeaderSectionProps =
  | (TableHeaderBase & { asChild: true; children: React.ReactNode })
  | (TableHeaderBase & { asChild?: false; children?: never });

interface DataTablePropsBase<T> {
  dataList: T[];
  loading: boolean;
  columnsList: ColumnDef<T>[];
  filter?: TableFilterBaseType | null;
}

interface DataTableWithHeaderChild<T> extends DataTablePropsBase<T> {
  asHeaderChild: true;
  children: React.ReactNode;
  leftSideSection?: React.ReactNode;
}

interface DataTableWithoutHeaderChild<T> extends DataTablePropsBase<T> {
  asHeaderChild?: false;
  children?: never;
  leftSideSection?: React.ReactNode;
}

export type DataTableProps<T> = DataTableWithHeaderChild<T> | DataTableWithoutHeaderChild<T>;

export interface TableFooterSectionProps {
  table: Table<any>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export interface FilterFormProps {
  columnsList: Column<any>[];
  filter: TableFilterBaseType | null;
}
