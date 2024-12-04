'use client';
import { Separator } from '@/components/ui/separator';
import { BREADCRUMB_ROLES_ITEMS } from '@/constant/breadcrumb-menulist';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import React from 'react';
import FormikWrapper from '../../../../../components/custom/formik/formik-wrapper';
import CustomLoader from '../../../../../components/custom/loader/loader';
import { rolesStatic } from '../../../../../constant/static-information';
import useParams from '../../../../../hooks/use-params';
import BACKEND_APIS from '../../../../../service/apis';
import RoleForm, { roleFormInitialValues } from '../_components/form';

const RoleViewPage = () => {
  const { breadcrumbChange } = useBreadcrumb();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_ROLES_ITEMS.READ);
  }, []);

  const currentPageAction = rolesStatic['read'];

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
    accessControl: singleRole?.access_control?.flatMap((item:any) =>
      item.permission_id.map((permissionId:any) => ({
        permission_id: permissionId?._id,
        feature_id: item.feature_id?._id,
      }))
    )
  };


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
        {apiViewRoleData.isLoading ? (
          <div className="h-20 flex justify-center items-center">
            <CustomLoader />
          </div>
        ) : (
          <FormikWrapper
            initialValues={viewData ?? roleFormInitialValues}
            onSubmit={(values) => console.log(values)}
            validationSchema={null}
          >
            <RoleForm currentPageAction={currentPageAction} btnLoader={false} />
          </FormikWrapper>
        )}
      </div>
    </div>
  );
};

export default RoleViewPage;
