'use client';
import FormikWrapper from '@/components/custom/formik/formik-wrapper';
import { Separator } from '@/components/ui/separator';
import { BREADCRUMB_ROLES_ITEMS } from '@/constant/breadcrumb-menulist';
import { rolesStatic } from '@/constant/static-information';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { useToast } from '@/hooks/use-toast';
import BACKEND_APIS from '@/service/apis';
import { AccessControlType } from '@/service/apis/roles';
import { useRouter } from 'next/navigation';
import React from 'react';
import RoleForm, { roleFormInitialValues } from '../_components/form';

const RoleCreatePage = () => {
  const { breadcrumbChange } = useBreadcrumb();
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_ROLES_ITEMS.CREATE);
  }, []);

  const currentPageAction = rolesStatic['create'];

  // NOTE: Implement the logic to handle the form submission and navigation based on the clicked button.
  const ApiCreateRole = BACKEND_APIS.ROLES.API_CREATE_ROLES();
  const handleSubmit = (value: any, { resetForm }: any) => {
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
      name: value.name,
      description: value?.description,
      accessControl: groupAccessControl
    };

    if (value?.clicked === 'save_more') {
      ApiCreateRole.mutate(apiData, {
        onSuccess: (data: any) => {
          toast({
            title: data?.message,
            description: 'Your new role create successfully.'
          });
          resetForm();
        },
        onError: (error) => {
          toast({
            title: error.message
          });
          console.error(error);
        }
      });
    } else {
      ApiCreateRole.mutate(apiData, {
        onSuccess: (data: any) => {
          toast({
            title: data?.message,
            description: 'Your new role create successfully.'
          });
          router.push(currentPageAction.cancelClick);
        },
        onError: (error) => {
          toast({
            title: error.message
          });
          console.error(error);
        }
      });
    }
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
        <FormikWrapper
          initialValues={roleFormInitialValues}
          onSubmit={handleSubmit}
          validationSchema={null}
        >
          <RoleForm currentPageAction={currentPageAction} btnLoader={ApiCreateRole.isPending} />
        </FormikWrapper>
      </div>
    </div>
  );
};

export default RoleCreatePage;
