import CustomBadge from '@/components/custom/badge';
import TableActionButton from '@/components/custom/table/table-action-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import DateTimeUtils from '@/lib/moment';
import { ColumnDef } from '@tanstack/react-table';
import BACKEND_APIS from '../../../service/apis';

const DeleteRolesColumns = (refresh: any): ColumnDef<any>[] => {
  const { toast } = useToast();
  const APiRestoreRole = BACKEND_APIS.ROLES.API_RESTORE_ROLES();
  const APiPermanentDeleteRole = BACKEND_APIS.ROLES.API_PERMANENTLY_DELETE_ROLE();

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
      cell: ({ row }) => {
        const inputData = {
          roleId: row.original.roleId,
          roleName: row.original.name
        };
        return (
          <TableActionButton
            menuList={[
              {
                key: 'restore',
                label: 'Restore',
                onClick: () => {
                  APiRestoreRole.mutate(inputData, {
                    onSuccess: (data:any) => {
                      toast({
                        title: data.message,
                        description: 'Your role restore successfully'
                      });
                      refresh();
                    },
                    onError(error) {
                      console.error(error);
                    }
                  });
                }
              },
              {
                key: 'delete',
                label: 'Delete',
                onClick: () => {
                  const inputData = {
                    roleId: row.original.roleId,
                    roleName: row.original.name
                  };
                  APiPermanentDeleteRole.mutate(inputData, {
                    onSuccess: (data) => {
                      toast({
                        title: data.message,
                        description: 'Your role permanent delete successfully'
                      });
                      refresh();
                    },
                    onError(error) {
                      console.error(error);
                    }
                  });
                }
              }
            ]}
          />
        );
      }
    }
  ];
};
export default DeleteRolesColumns;
