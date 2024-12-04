'use client';
import { BREADCRUMB_CATEGORY_DEPARTMENT } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import BACKEND_APIS from '@/service/apis';
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';
import CustomButton from '../../../components/custom/button';
import CustomAlterDialog from '../../../components/custom/dialog/alert-dialog';
import DataTable from '../../../components/custom/table/data-table';
import { ActionMenuItem } from '../../../components/custom/table/table-action-menu';
import { STATUS_LIST } from '../../../constant';
import { useToast } from '../../../hooks/use-toast';
import DepartmentColumns from './columns';
import DepartmentFormModel from './form';

type ActionModelStatusType = {
  show: boolean;
  departmentId: string | undefined;
  calling: boolean;
  action: 'view' | 'edit' | 'create';
  departmentForm: {
    name: string;
    description: string;
  } | null;
};

type ActionDeleteStateType = {
  model: boolean;
  departmentId: string | undefined;
  departmentName: string | undefined;
};

const Page = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_CATEGORY_DEPARTMENT);
  }, []);

  const defaultModelStatus: ActionModelStatusType = {
    show: false,
    action: 'view',
    calling: false,
    departmentId: undefined,
    departmentForm: null
  };
  const [modelStatus, setModelStatus] = React.useState<ActionModelStatusType>(defaultModelStatus);

  const defaultDeleteModelState = {
    model: false,
    departmentId: undefined,
    departmentName: undefined
  };
  const [deleteModel, setDeleteModel] =
    React.useState<ActionDeleteStateType>(defaultDeleteModelState);

  const handleBtnCreateClick = () => {
    setModelStatus({ ...modelStatus, show: true, action: 'create', calling: true });
  };

  const handleCloseModel = () => {
    setModelStatus(defaultModelStatus);
    setDeleteModel(defaultDeleteModelState)
  };

  // NOTE: calling the all departments data api
  const apiGetAllDepartments = BACKEND_APIS.DEPARTMENT.API_GET_ALL_DEPARTMENTS();
  if (apiGetAllDepartments.error) return <p>Error loading items</p>;

  const departmentList: any = apiGetAllDepartments.data;
  const generatedData = departmentList?.data?.map((department: any, index: any) => ({
    id: index + 1,
    name: department?.name,
    departmentId: department?._id,
    status: STATUS_LIST.find((status) => status.value === department?.is_active),
    created_at: department?.created_at
  }));

  // NOTE: calling the single department api
  const SingleDepartment = BACKEND_APIS.DEPARTMENT.API_GET_SINGLE_DEPARTMENTS(
    modelStatus?.departmentId,
    modelStatus.calling
  );

  const handleSingleDepartment = () => {
    if (SingleDepartment.data) {
      const singleData: any = SingleDepartment.data.data;
      const formData = {
        name: singleData?.name,
        description: singleData?.description
      };
      setModelStatus({
        ...modelStatus,
        departmentId: singleData?._id,
        departmentForm: formData,
        calling: false
      });
    }
  };

  if (SingleDepartment.data && modelStatus?.calling) {
    handleSingleDepartment();
  }

  // NOTE: calling the department status change api
  const ApiUpdateStatusDepartment = BACKEND_APIS.DEPARTMENT.API_UPDATE_STATUS_DEPARTMENT();
  const handleStatusChange = (departmentId: string, status: boolean) => {
    const updateStatusData = {
      id: departmentId,
      status: status
    };
    ApiUpdateStatusDepartment.mutate(updateStatusData, {
      onSuccess: (data) => {
        toast({
          title: data.message,
          description: 'Your department status change successfully'
        });
        apiGetAllDepartments.refetch();
      },
      onError(error) {
        console.error(error);
      }
    });
  };

  const handleActionClick = (row: Row<any>, action: 'view' | 'edit') => {
    const departmentId: any = row.original?.departmentId;
    handleSingleDepartment();
    setModelStatus({
      ...modelStatus,
      show: true,
      action: action,
      departmentId: departmentId,
      calling: true
    });
  };

  // NOTE: calling the department permanently delete api

  const APiPermanentDeleteDepartment = BACKEND_APIS.DEPARTMENT.API_PERMANENT_DELETE_DEPARTMENT();

  const handleDeleteAction = () => {
    if (deleteModel?.departmentId && deleteModel?.departmentName) {
      const deleteData = {
        id: deleteModel?.departmentId,
        name: deleteModel?.departmentName
      };
      APiPermanentDeleteDepartment.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your permission permanent delete successfully'
          });
          setDeleteModel(defaultDeleteModelState);
          apiGetAllDepartments.refetch();
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
              onClick: () => handleStatusChange(row.original?.departmentId, statusMenu.value)
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
            departmentId: row.original?.departmentId,
            departmentName: row.original?.name
          })
      }
    ];
  };

  return (
    <div>
      <DataTable
        loading={apiGetAllDepartments.isLoading}
        dataList={generatedData ?? []}
        columnsList={DepartmentColumns(handleOptionMenuAction)}
        asHeaderChild
      >
        <CustomButton icon={<Plus />} onClick={handleBtnCreateClick}>
          Create
        </CustomButton>
      </DataTable>
      {!SingleDepartment.isLoading ? (
        <DepartmentFormModel
          loading={false}
          asAction={modelStatus.action}
          open={modelStatus.show}
          dialogAction={handleCloseModel}
          refresh={apiGetAllDepartments.refetch}
          departmentId={modelStatus.departmentId}
          departmentData={modelStatus.departmentForm}
        />
      ) : null}
      <CustomAlterDialog
        open={deleteModel.model}
        actionClick={handleDeleteAction}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your selected item."
        dialogChange={() => setDeleteModel(defaultDeleteModelState)}
      />
    </div>
  );
};

export default Page;
