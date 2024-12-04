import TableActionButton, { ActionMenuItem } from '@/components/custom/table/table-action-menu';
import { Checkbox } from '@/components/ui/checkbox';
import DateTimeUtils from '@/lib/moment';
import { ColumnDef } from '@tanstack/react-table';

type ActionModelStatusType = {
  view: boolean;
  edit: boolean;
  action: 'view' | 'edit' | 'create';
  featureId: string | undefined;
  featureData: any;
  calling: boolean;
};

const FeaturesColumns = (actionMenusList: (rows: any) => ActionMenuItem[]): ColumnDef<any>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'id',
      header: () => <div>No</div>,
      cell: ({ row }) => <div>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: () => <div>Name</div>,
      cell: ({ row }) => <div>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'description',
      header: () => <div>Description</div>,
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue('description')}</div>
    },
    {
      accessorKey: 'created_at',
      header: () => <div>Created At</div>,
      cell: ({ row }) => {
        const created_at: any = parseInt(row.getValue('created_at'));
        const created_at_formatted = DateTimeUtils.convertUTCTime(
          created_at,
          'DateTime',
          'YYYY-MM-DD'
        );
        return <div>{created_at_formatted}</div>;
      }
    },
    {
      id: 'action',
      header: () => <div>Action</div>,
      cell: ({ row }) => <TableActionButton menuList={actionMenusList(row)} />
    }
  ];
};

export default FeaturesColumns;
