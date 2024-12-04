'use client';
import CustomButton from '@/components/custom/button';
import DataTable from '@/components/custom/table/data-table';
import { BREADCRUMB_FEATURES_ITEMS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import React from 'react';
import CustomAlterDialog from '../../../components/custom/dialog/alert-dialog';
import { ActionMenuItem } from '../../../components/custom/table/table-action-menu';
import { useToast } from '../../../hooks/use-toast';
import BACKEND_APIS from '../../../service/apis';
import FeaturesColumns from './columns';
import FeatureFormModel from './form';

type ActionModelStatusType = {
  show: boolean;
  calling: boolean;
  action: 'view' | 'edit' | 'create';
  featureId: string | undefined;
  featureForm: {
    name: string;
    description: string;
  } | null;
};

type ActionDeleteStateType = {
  model: boolean;
  featureId: string | undefined;
  featureName: string | undefined;
};

const FeatureListPage = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_FEATURES_ITEMS.ROOT);
  }, []);

  const defaultModelStatus: ActionModelStatusType = {
    show: false,
    action: 'view',
    calling: false,
    featureId: undefined,
    featureForm: null
  };
  const [modelStatus, setModelStatus] = React.useState<ActionModelStatusType>(defaultModelStatus);

  const defaultDeleteModelState: ActionDeleteStateType = {
    model: false,
    featureId: undefined,
    featureName: undefined
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

  // NOTE: calling the get all features list api
  const apiAllFeaturesList = BACKEND_APIS.FEATURES.API_GET_ALL_FEATURES();
  if (apiAllFeaturesList.error) return <p>Error loading items</p>;
  const featuresList: any = apiAllFeaturesList.data;
  const allFeatureList = featuresList?.data?.map((feature: any, index: any) => ({
    id: index + 1,
    featureId: feature?._id,
    name: feature?.name,
    description: feature?.description,
    created_at: feature?.created_at
  }));

  // NOTE: calling the get single feature api
  const apiSingleFeature = BACKEND_APIS.FEATURES.API_GET_SINGLE_FEATURE(
    modelStatus?.featureId,
    modelStatus.calling
  );

  const handleSingleFeature = () => {
    if (apiSingleFeature.data) {
      const singleData: any = apiSingleFeature.data.data;
      const formData = {
        name: singleData?.name,
        description: singleData?.description
      };
      setModelStatus({
        ...modelStatus,
        featureId: singleData?._id,
        featureForm: formData,
        calling: false
      });
    }
  };

  if (apiSingleFeature.data && modelStatus?.calling) {
    handleSingleFeature();
  }

  const handleActionClick = (row: Row<any>, action: 'view' | 'edit') => {
    const featureId: any = row.original?.featureId;
    handleSingleFeature();
    setModelStatus({
      ...modelStatus,
      show: true,
      action: action,
      featureId: featureId,
      calling: true
    });
  };

  // NOTE: calling the permanently feature delete api
  const apiPermanentDeleteFeature = BACKEND_APIS.FEATURES.API_PERMANENT_DELETE_FEATURES();
  const handleDeleteAction = () => {
    if (deleteModel?.featureId && deleteModel?.featureName) {
      const deleteData = {
        id: deleteModel?.featureId,
        name: deleteModel?.featureName
      };
      apiPermanentDeleteFeature.mutate(deleteData, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your feature delete successfully'
          });
          apiAllFeaturesList.refetch();
        },
        onError(error) {
          console.error(error);
        }
      });
    }
  };

  const handleActionMenuList = (row: Row<any>): ActionMenuItem[] => {
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
      {
        key: 'delete',
        label: 'Delete',
        className: 'focus:bg-red-500',
        onClick: () => {
          setDeleteModel({
            ...deleteModel,
            model: true,
            featureId: row.original?.featureId,
            featureName: row.original?.name
          });
        }
      }
    ];
  };

  return (
    <div>
      <DataTable
        loading={apiAllFeaturesList.isLoading}
        dataList={allFeatureList ?? []}
        columnsList={FeaturesColumns(handleActionMenuList)}
        asHeaderChild
      >
        <CustomButton icon={<Plus />} onClick={handleBtnCreateClick}>
          Create
        </CustomButton>
      </DataTable>
      {!apiSingleFeature.isLoading ? (
        <FeatureFormModel
          asAction={modelStatus.action}
          open={modelStatus.show}
          loading={apiSingleFeature.isLoading}
          dialogAction={handleCloseModel}
          refresh={apiAllFeaturesList.refetch}
          featureId={modelStatus.featureId}
          featureData={modelStatus.featureForm}
        />
      ) : null}
      <CustomAlterDialog
        open={deleteModel.model}
        actionClick={handleDeleteAction}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete the selected item."
        dialogChange={handleCloseModel}
      />
    </div>
  );
};

export default FeatureListPage;
