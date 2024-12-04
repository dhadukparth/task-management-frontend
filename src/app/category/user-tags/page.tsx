'use client';
import { BREADCRUMB_CATEGORY_USER_TAGS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';
import CustomButton from '../../../components/custom/button';
import CustomAlterDialog from '../../../components/custom/dialog/alert-dialog';
import DataTable from '../../../components/custom/table/data-table';
import { ActionMenuItem } from '../../../components/custom/table/table-action-menu';
import { STATUS_LIST } from '../../../constant';
import { useToast } from '../../../hooks/use-toast';
import BACKEND_APIS from '../../../service/apis';
import UserTagsColumns from './columns';
import UserTagsFormModel from './form';

type ActionModelStatusType = {
  show: boolean;
  calling: boolean;
  action: 'view' | 'edit' | 'create';
  userTagId: string | undefined;
  userTagForm: {
    name: string;
    description: string;
  } | null;
};

type ActionDeleteStateType = {
  model: boolean;
  userTagId: string | undefined;
  userTagName: string | undefined;
};

const UserTagsPage = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_CATEGORY_USER_TAGS);
  }, []);

  const defaultModelStatus: ActionModelStatusType = {
    show: false,
    action: 'view',
    calling: false,
    userTagId: undefined,
    userTagForm: null
  };
  const [modelStatus, setModelStatus] = React.useState<ActionModelStatusType>(defaultModelStatus);

  const handleBtnCreateClick = () => {
    setModelStatus({ ...modelStatus, show: true, action: 'create', calling: true });
  };

  const handleCloseModel = () => {
    setModelStatus(defaultModelStatus);
  };

  // NOTE: calling the all user tags data api
  const apiGetAllUserTags = BACKEND_APIS.User_TAGS.API_GET_ALL_USER_TAGS();
  if (apiGetAllUserTags.error) return <p>Error loading items</p>;

  const userTagsList: any = apiGetAllUserTags.data;
  const generatedData = userTagsList?.data?.map((userTag: any, index: any) => ({
    id: index + 1,
    name: userTag?.name,
    userTagId: userTag?._id,
    status: STATUS_LIST.find((status) => status.value === userTag?.is_active),
    created_at: userTag?.created_at
  }));

  // NOTE: calling the single user tag api
  const SingleUserTag = BACKEND_APIS.User_TAGS.API_GET_SINGLE_USER_TAGS(
    modelStatus?.userTagId,
    modelStatus.calling
  );

  const handleSingleUserTag = () => {
    if (SingleUserTag.data) {
      const singleData: any = SingleUserTag.data.data;
      const formData = {
        name: singleData?.name,
        description: singleData?.description
      };
      setModelStatus({
        ...modelStatus,
        userTagId: singleData?._id,
        userTagForm: formData,
        calling: false
      });
    }
  };

  if (SingleUserTag.data && modelStatus?.calling) {
    handleSingleUserTag();
  }

  // NOTE: calling the user tag status change api
  const ApiUpdateStatusUserTag = BACKEND_APIS.User_TAGS.API_UPDATE_STATUS_USER_TAGS();
  const handleStatusChange = (id: string, status: boolean) => {
    const updateStatusData = {
      id: id,
      status: status
    };
    ApiUpdateStatusUserTag.mutate(updateStatusData, {
      onSuccess: (data) => {
        toast({
          title: data.message,
          description: 'Your user tag status change successfully'
        });
        apiGetAllUserTags.refetch();
      },
      onError(error) {
        console.error(error);
      }
    });
  };

  const handleActionClick = (row: Row<any>, action: 'view' | 'edit') => {
    const recordId: any = row.original?.userTagId;
    handleSingleUserTag();
    setModelStatus({
      ...modelStatus,
      show: true,
      action: action,
      userTagId: recordId,
      calling: true
    });
  };

  // NOTE: calling the user tag permanently delete api
  const defaultDeleteModelState = {
    model: false,
    userTagId: undefined,
    userTagName: undefined
  };
  const [deleteModel, setDeleteModel] =
    React.useState<ActionDeleteStateType>(defaultDeleteModelState);
  const APiPermanentDeleteUserTag = BACKEND_APIS.User_TAGS.API_PERMANENT_DELETE_USER_TAGS();

  const handleDeleteAction = () => {
    if (deleteModel?.userTagId && deleteModel?.userTagName) {
      const deleteData = {
        id: deleteModel?.userTagId,
        name: deleteModel?.userTagName
      };
      APiPermanentDeleteUserTag.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your permission permanent delete successfully'
          });
          setDeleteModel(defaultDeleteModelState);
          apiGetAllUserTags.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    }
  };

  const handleOptionMenuAction = (row: Row<any>): ActionMenuItem[] => {
    const statusMenu = STATUS_LIST.find((status) => status.value !== row.original?.status?.value);
    const recordId = row.original?.userTagId;
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
              onClick: () => handleStatusChange(recordId, statusMenu.value)
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
            userTagId: recordId,
            userTagName: row.original?.name
          })
      }
    ];
  };

  return (
    <div>
      <DataTable
        loading={apiGetAllUserTags.isLoading}
        dataList={generatedData ?? []}
        columnsList={UserTagsColumns(handleOptionMenuAction)}
        asHeaderChild
      >
        <CustomButton icon={<Plus />} onClick={handleBtnCreateClick}>
          Create
        </CustomButton>
      </DataTable>
      {!SingleUserTag.isLoading ? (
        <UserTagsFormModel
          loading={false}
          open={modelStatus.show}
          dialogAction={handleCloseModel}
          asAction={modelStatus.action}
          refresh={apiGetAllUserTags.refetch}
          userTagId={modelStatus.userTagId}
          userTagData={modelStatus.userTagForm}
        />
      ) : null}
      <CustomAlterDialog
        open={deleteModel.model}
        actionClick={handleDeleteAction}
        dialogChange={handleCloseModel}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your selected item."
      />
    </div>
  );
};

export default UserTagsPage;
