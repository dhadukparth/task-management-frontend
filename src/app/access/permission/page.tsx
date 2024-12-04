'use client';
import CustomButton from '@/components/custom/button';
import CustomAlterDialog from '@/components/custom/dialog/alert-dialog';
import DataTable from '@/components/custom/table/data-table';
import { ActionMenuItem } from '@/components/custom/table/table-action-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { STATUS_LIST, TABLE_FILTER_OPERATIONS } from '@/constant';
import { BREADCRUMB_PERMISSION_ITEMS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { useToast } from '@/hooks/use-toast';
import BACKEND_APIS from '@/service/apis';
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';
import PermissionColumns from './columns';
import PermissionFormModel from './form';

type ActionModelStatusType = {
  show: boolean;
  permissionId: string | undefined;
  calling: boolean;
  action: 'view' | 'edit' | 'create';
  permissionForm: {
    name: string;
    description: string;
  } | null;
};

type ActionDeleteStateType = {
  model: boolean;
  permanently: boolean;
  permissionId: string | undefined;
  permissionName: string | undefined;
};

const PermissionsPage = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_PERMISSION_ITEMS.ROOT);
  }, []);

  const defaultModelStatus: ActionModelStatusType = {
    show: false,
    action: 'view',
    calling: false,
    permissionId: undefined,
    permissionForm: null
  };
  const [modelStatus, setModelStatus] = React.useState<ActionModelStatusType>(defaultModelStatus);

  const defaultDeleteModelState = {
    model: false,
    permissionId: undefined,
    permissionName: undefined,
    permanently: false
  };
  const [deleteModel, setDeleteModel] =
    React.useState<ActionDeleteStateType>(defaultDeleteModelState);

  const handleBtnCreateClick = () => {
    setModelStatus({ ...modelStatus, show: true, action: 'create', calling: true });
  };

  const handleCloseModel = () => {
    setModelStatus(defaultModelStatus);
    setDeleteModel(defaultDeleteModelState);
  };

  // NOTE: calling the all permissions api
  const AllPermissionData = BACKEND_APIS.PERMISSIONS.API_GET_PERMISSIONS();
  if (AllPermissionData.error) return <p>Error loading items</p>;
  const permissionList: any = AllPermissionData.data;
  const permissionDataList = permissionList?.data?.map((item: any, index: any) => ({
    id: index + 1,
    permissionId: item?._id,
    status: STATUS_LIST.find((status) => status.value === item?.is_active),
    name: item?.name,
    created_at: item?.created_at
  }));

  // NOTE: calling the single permission data api
  const SinglePermission = BACKEND_APIS.PERMISSIONS.API_GET_PERMISSION(
    modelStatus?.permissionId,
    modelStatus.calling
  );
  const handleSinglePermission = () => {
    if (SinglePermission.data) {
      const singleData: any = SinglePermission.data.data;
      const formData = {
        name: singleData?.name,
        description: singleData?.description
      };
      setModelStatus({
        ...modelStatus,
        permissionId: singleData?._id,
        permissionForm: formData,
        calling: false
      });
    }
  };

  if (SinglePermission.data && modelStatus?.calling) {
    handleSinglePermission();
  }

  // NOTE: calling the permission status update api
  const ApiUpdateStatusPermission = BACKEND_APIS.PERMISSIONS.API_UPDATE_STATUS_PERMISSION();

  const handleStatusChange = (row: Row<any>, status: boolean) => {
    const updateStatusData = {
      id: row.original?.permissionId,
      status: status
    };
    ApiUpdateStatusPermission.mutate(updateStatusData, {
      onSuccess: (data) => {
        toast({
          title: data.message,
          description: 'Your permission delete successfully'
        });
        AllPermissionData.refetch();
      },
      onError(error) {
        console.error(error);
      }
    });
  };

  const handleActionClick = (row: Row<any>, action: 'view' | 'edit') => {
    const recordId: any = row.original?.permissionId;
    handleSinglePermission();
    setModelStatus({
      ...modelStatus,
      show: true,
      action: action,
      permissionId: recordId,
      calling: true
    });
  };

  // NOTE: calling the delete record permanently adn temporary permission api
  const ApiDeletePermission = BACKEND_APIS.PERMISSIONS.API_DELETE_PERMISSION();
  const APiPermanentDeletePermission = BACKEND_APIS.PERMISSIONS.API_PERMANENT_DELETE_PERMISSIONS();

  const handleDeleteAction = () => {
    if (deleteModel?.permissionId && deleteModel?.permissionName && deleteModel.permanently) {
      const deleteData = {
        id: deleteModel?.permissionId,
        name: deleteModel?.permissionName
      };
      APiPermanentDeletePermission.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your permission permanent delete successfully'
          });
          setDeleteModel(defaultDeleteModelState);
          AllPermissionData.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (deleteModel?.permissionId && deleteModel?.permissionName) {
      const deleteData = {
        id: deleteModel?.permissionId,
        name: deleteModel?.permissionName
      };
      ApiDeletePermission.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your permission delete successfully'
          });
          AllPermissionData.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    }
  };

  const handleOptionMenuAction = (row: Row<any>): ActionMenuItem[] => {
    const statusMenu = STATUS_LIST.find((status) => status.value !== row.original?.status?.value);
    return [
      {
        key: 'view',
        label: 'View',
        sectionLabel: 'Action',
        onClick: () => handleActionClick(row, 'view')
      },
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => handleActionClick(row, 'edit')
      },
      {
        key: 'DIVIDER'
      },
      ...(statusMenu
        ? [
            {
              key: statusMenu.label.toLowerCase(),
              label: statusMenu.label,
              onClick: () => handleStatusChange(row.original?.permissionId, statusMenu.value)
            }
          ]
        : []),
      {
        key: 'delete',
        label: 'Delete',
        className: 'focus:bg-red-500',
        onClick: () =>
          setDeleteModel({
            ...deleteModel,
            model: true,
            permissionId: row.original?.permissionId,
            permissionName: row.original?.name
          })
      }
    ];
  };

  return (
    <div>
      <DataTable
        loading={AllPermissionData.isLoading}
        dataList={permissionDataList ?? []}
        columnsList={PermissionColumns(handleOptionMenuAction)}
        asHeaderChild
        filter={{
          operationList: TABLE_FILTER_OPERATIONS,
          handleSubmit: (value) => {
            console.log(value);
          }
        }}
      >
        <CustomButton icon={<Plus />} onClick={handleBtnCreateClick}>
          Create
        </CustomButton>
      </DataTable>
      {!SinglePermission.isLoading ? (
        <PermissionFormModel
          asAction={modelStatus.action}
          open={modelStatus.show}
          permissionId={modelStatus.permissionId}
          permissionData={modelStatus.permissionForm}
          dialogAction={handleCloseModel}
          loading={SinglePermission.isLoading}
          refresh={AllPermissionData.refetch}
        />
      ) : null}
      <CustomAlterDialog
        open={deleteModel.model}
        actionClick={handleDeleteAction}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will delete your selected item."
        dialogChange={handleCloseModel}
        asChild
      >
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id="permanently_delete"
            checked={deleteModel.permanently}
            onCheckedChange={handleCloseModel}
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

export default PermissionsPage;
