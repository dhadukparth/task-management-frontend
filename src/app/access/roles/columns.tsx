import CustomBadge from '@/components/custom/badge';
import TableActionButton, { ActionMenuItem } from '@/components/custom/table/table-action-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import DateTimeUtils from '@/lib/moment';
import { APPLICATION_ROUTERS } from '@/routers';
import { ColumnDef, Row } from '@tanstack/react-table';
import { STATUS_LIST } from '../../../constant';
import BACKEND_APIS from '../../../service/apis';

const RolesColumns = (refresh: any, handleDeleteMenuAction: (row: Row<any>)=>void): ColumnDef<any>[] => {
  const { toast } = useToast();

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
      header: () => <div>Action</div>,
      cell: ({ row }) => {
        const statusMenu = STATUS_LIST.find(
          (status) => status.value !== row.original?.status?.value
        );

        const ApiRoleUpdateStatus = BACKEND_APIS.ROLES.API_UPDATE_STATUS_ROLES();

        const menuList: ActionMenuItem[] = [
          {
            key: 'view',
            label: 'View',
            sectionLabel: 'Action',
            asLink: true,
            href: `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.READ}?no=${row.original?.roleId}&role=${row.original?.name}`
          },
          {
            key: 'edit',
            label: 'Edit',
            asLink: true,
            href: `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.UPDATE}?no=${row.original?.roleId}&role=${row.original?.name}`
          },
          {
            key: 'DIVIDER'
          },
          ...(statusMenu
            ? [
                {
                  key: statusMenu.label.toLowerCase(),
                  label: statusMenu.label,
                  onClick: () => {
                    const updateStatusData = {
                      id: row.original?.roleId,
                      status: statusMenu.value
                    };
                    ApiRoleUpdateStatus.mutate(updateStatusData, {
                      onSuccess: (data) => {
                        toast({
                          title: data.message,
                          description: 'Your roles status change successfully'
                        });
                        refresh();
                      },
                      onError(error) {
                        console.error(error);
                      }
                    });
                  }
                }
              ]
            : []),
          {
            key: 'delete',
            label: 'Delete',
            className: 'focus:bg-red-500',
            onClick: () => handleDeleteMenuAction(row)
          }
        ];

        return <TableActionButton menuList={menuList} />;
      }
    }
  ];
};

export default RolesColumns;
