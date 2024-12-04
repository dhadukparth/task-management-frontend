'use client';
import FormikWrapper from '@/components/custom/formik/formik-wrapper';
import CustomLoader from '@/components/custom/loader/loader';
import { Separator } from '@/components/ui/separator';
import { BREADCRUMB_ROLES_ITEMS } from '@/constant/breadcrumb-menulist';
import { rolesStatic } from '@/constant/static-information';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import useParams from '@/hooks/use-params';
import { useToast } from '@/hooks/use-toast';
import BACKEND_APIS from '@/service/apis';
import { AccessControlType } from '@/service/apis/roles';
import { useRouter } from 'next/navigation';
import React from 'react';
import RoleForm, { roleFormInitialValues } from '../_components/form';

const RoleEditPage = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_ROLES_ITEMS.UPDATE);
  }, []);

  const currentPageAction = rolesStatic['update'];

  // NOTE: Calling the single role api here
  const queryParams = useParams();
  const hasFetchingRef = React.useRef<boolean>(true);
  const apiViewRoleData = BACKEND_APIS.ROLES.API_GET_SINGLE_ROLES(
    {
      roleId: queryParams?.no ?? '',
      roleName: queryParams?.role ?? ''
    },
    hasFetchingRef.current
  );
  if (hasFetchingRef.current) apiViewRoleData.refetch();
  if (apiViewRoleData.error) return <div>Sorry! This record is not found</div>;
  if (apiViewRoleData.data) hasFetchingRef.current = false;

  const singleRole: any = apiViewRoleData.data?.data;
  const viewData = {
    name: singleRole?.name,
    description: singleRole?.description,
    accessControl: singleRole?.access_control?.flatMap((item: any) =>
      item.permission_id.map((permissionId: any) => ({
        permission_id: permissionId?._id,
        feature_id: item.feature_id?._id
      }))
    )
  };

  // NOTE: Implement the logic to handle the form submission and navigation based on the clicked button.
  const ApiUpdateRole = BACKEND_APIS.ROLES.API_UPDATE_ROLES();
  const handleSubmit = (value: any) => {
    const groupAccessControl: AccessControlType[] = Object.values(
      value?.accessControl.reduce((acc: any, item: any) => {
        if (acc[item.feature_id]) {
          acc[item.feature_id].permission_id.push(item.permission_id);
        } else {
          acc[item.feature_id] = {
            feature_id: item.feature_id,
            permission_id: [item.permission_id]
          };
        }
        return acc;
      }, {})
    );

    const apiData = {
      id: queryParams?.no ?? '',
      name: value.name,
      description: value?.description,
      accessControl: groupAccessControl
    };

    ApiUpdateRole.mutate(apiData, {
      onSuccess: (data: any) => {
        toast({
          title: data?.message,
          description: 'Your new role create successfully.'
        });
        router.push(currentPageAction.cancelClick, { scroll: true });
      },
      onError: (error) => {
        toast({
          title: error.message
        });
        console.error(error);
      }
    });
  };

  console.log(viewData);

  return (
    <div className="overflow-hidden rounded-sm border bg-background shadow">
      <div className="p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{currentPageAction.title}</h2>
          <p className="text-base font-medium text-muted-foreground">
            {currentPageAction.description}
          </p>
        </div>
        <Separator />
        {apiViewRoleData.isLoading && !apiViewRoleData.data ? (
          <div className="h-20 flex justify-center items-center">
            <CustomLoader />
          </div>
        ) : (
          <FormikWrapper
            initialValues={viewData ?? roleFormInitialValues}
            onSubmit={handleSubmit}
            validationSchema={null}
          >
            <RoleForm currentPageAction={currentPageAction} btnLoader={ApiUpdateRole.isPending} />
          </FormikWrapper>
        )}
      </div>
    </div>
  );
};

export default RoleEditPage;
