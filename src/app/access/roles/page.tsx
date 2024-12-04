'use client';
import CustomButton from '@/components/custom/button';
import DataTable from '@/components/custom/table/data-table';
import { STATUS_LIST } from '@/constant';
import { BREADCRUMB_ROLES_ITEMS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { APPLICATION_ROUTERS } from '@/routers';
import BACKEND_APIS from '@/service/apis';
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';
import CustomAlterDialog from '../../../components/custom/dialog/alert-dialog';
import { Checkbox } from '../../../components/ui/checkbox';
import { useToast } from '../../../hooks/use-toast';
import RolesColumns from './columns';

type ActionDeleteStateType = {
  model: boolean;
  permanently: boolean;
  roleId: string | undefined;
  roleName: string | undefined;
};

const RolePage = () => {
  const create_role = `${APPLICATION_ROUTERS.ACCESS.ROLES}/${APPLICATION_ROUTERS.OPERATIONS.CREATE}`;
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_ROLES_ITEMS.ROOT);
  }, []);

  const ApiAllRolesList = BACKEND_APIS.ROLES.API_GET_ALL_ROLES();

  if (ApiAllRolesList.error) return <p>Error loading items</p>;

  const rolesList: any = ApiAllRolesList.data;
  const generatedData = rolesList?.data?.map((role: any, index: any) => ({
    id: index + 1,
    roleId: role?._id,
    name: role?.name,
    status: STATUS_LIST.find((status) => status.value === role?.is_active),
    permission: [''],
    created_at: role?.created_at
  }));

  const defaultDeleteModelState: ActionDeleteStateType = {
    model: false,
    roleId: undefined,
    roleName: undefined,
    permanently: false
  };
  const [deleteModel, setDeleteModel] =
    React.useState<ActionDeleteStateType>(defaultDeleteModelState);

  const ApiTempDeleteRole = BACKEND_APIS.ROLES.API_TEMPORARY_DELETE_ROLES();
  const ApiPermanentlyDeleteRole = BACKEND_APIS.ROLES.API_PERMANENTLY_DELETE_ROLE();

  const handleDeleteAction = () => {
    if (deleteModel?.roleId && deleteModel?.roleName && deleteModel.permanently) {
      const deleteData = {
        roleId: deleteModel?.roleId,
        roleName: deleteModel?.roleName
      };
      ApiPermanentlyDeleteRole.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your role is permanently delete successfully'
          });
          ApiAllRolesList.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (deleteModel?.roleId && deleteModel?.roleName) {
      const deleteData = {
        roleId: deleteModel?.roleId
      };
      ApiTempDeleteRole.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your role delete successfully'
          });
          ApiAllRolesList.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    }
  };

  const handleDeleteMenuAction = (row: Row<any>) => {
    setDeleteModel({
      ...deleteModel,
      model: true,
      roleId: row.original?.roleId,
      roleName: row.original?.name
    });
  };

  return (
    <div>
      <DataTable
        loading={ApiAllRolesList.isLoading}
        dataList={generatedData ?? []}
        columnsList={RolesColumns(ApiAllRolesList.refetch, handleDeleteMenuAction)}
        asHeaderChild
      >
        <CustomButton asLink={{ href: create_role }} icon={<Plus />}>
          Create
        </CustomButton>
      </DataTable>
      <CustomAlterDialog
        open={deleteModel.model}
        actionClick={handleDeleteAction}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will delete your selected item."
        dialogChange={() =>
          setDeleteModel({ ...deleteModel, model: false, roleId: undefined, roleName: undefined })
        }
        asChild
      >
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="permanently_delete"
            checked={deleteModel.permanently}
            onCheckedChange={() =>
              setDeleteModel({ ...deleteModel, permanently: !deleteModel.permanently })
            }
          />
          <label
            htmlFor="permanently_delete"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I understand that this will permanently delete the item
          </label>
        </div>
      </CustomAlterDialog>
    </div>
  );
};

export default RolePage;
