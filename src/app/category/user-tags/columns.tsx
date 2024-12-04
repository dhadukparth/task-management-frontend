import CustomBadge from '@/components/custom/badge';
import TableActionButton, { ActionMenuItem } from '@/components/custom/table/table-action-menu';
import { Checkbox } from '@/components/ui/checkbox';
import DateTimeUtils from '@/lib/moment';
import { ColumnDef } from '@tanstack/react-table';

const UserTagsColumns = (actionMenus: (rows: any) => ActionMenuItem[]): ColumnDef<any>[] => {
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
      enableSorting: true,
      cell: ({ row }) => <div>{row.getValue('id')}</div>
    },
    {
      accessorKey: 'name',
      header: () => <div>Name</div>,
      cell: ({ row }) => <div>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'status',
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const statusData: any = row.getValue('status');
        return <CustomBadge variant={statusData?.status}>{statusData?.label}</CustomBadge>;
      }
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
      enableSorting: false,
      enableHiding: false,
      header: () => <div>Action</div>,
      cell: ({ row }) => <TableActionButton menuList={actionMenus(row)} />
    }
  ];
};

export default UserTagsColumns