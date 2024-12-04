'use client';
import CustomButton from '@/components/custom/button';
import FormikCheckBox from '@/components/custom/formik/formik-checkbox';
import FormikInput from '@/components/custom/formik/formik-input';
import FormikTextarea from '@/components/custom/formik/formik-textarea';
import CustomLoader from '@/components/custom/loader/loader';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import BACKEND_APIS from '@/service/apis';
import { useFormikContextType } from '@/types/components';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';

interface RoleFormType {
  currentPageAction: any;
  btnLoader: boolean;
}

export const roleFormInitialValues = {
  name: '',
  description: '',
  accessControl: []
};

const RoleForm: React.FC<RoleFormType> = ({ currentPageAction, btnLoader }) => {
  const { values, handleSubmit, setFieldValue }: useFormikContextType = useFormikContext();

  const router = useRouter();

  const handleCancelClick = () => {
    router.push(currentPageAction?.cancelClick);
  };

  const apiRoleAccessControlList = BACKEND_APIS.ROLES.API_GET_ROLES_ACCESS_CONTROL();
  if (apiRoleAccessControlList.error) return <p>Error loading items</p>;
  const accessControlList: any = apiRoleAccessControlList.data;

  if (apiRoleAccessControlList.isLoading) {
    return (
      <div className="h-20 flex justify-center items-center">
        <CustomLoader />
      </div>
    );
  }

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget: any = event.target;
    if (eventTarget?.innerText?.toLowerCase() === 'save & more') {
      setFieldValue('clicked', 'save_more');
      handleSubmit();
    } else if (eventTarget?.innerText?.toLowerCase() === 'save') {
      setFieldValue('clicked', 'save');
      handleSubmit();
    }
  };

  console.log(values);

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 sm:col-span-3">
            <Label htmlFor="name" className="text-base font-medium">
              Name
            </Label>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <FormikInput
              name="name"
              disabled={currentPageAction?.disabled}
              placeholder="enter role name"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 sm:col-span-3">
            <Label htmlFor="description" className="text-base font-medium">
              Description
            </Label>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <FormikTextarea
              name="description"
              disabled={currentPageAction?.disabled}
              placeholder="enter role description"
              rows={8}
            />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 sm:col-span-3">
            <h2 className="text-base font-medium">Features</h2>
          </div>
          <div className="col-span-12 sm:col-span-9">
            <h2 className="text-base font-medium">Permissions</h2>
          </div>
        </div>
        <div className="space-y-4">
          {accessControlList?.data?.length ? (
            <React.Fragment>
              {accessControlList?.data.map((accessControl: any, index: any) => (
                <div className="grid grid-cols-12 gap-x-4" key={index}>
                  <div className="col-span-12 sm:col-span-3">
                    <Label
                      htmlFor={accessControl?.feature_id?.name}
                      className="text-base font-medium capitalize"
                    >
                      {accessControl?.feature_id?.name}
                    </Label>
                  </div>
                  <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-4">
                    {accessControl?.permission_id?.map((permission: any, index: any) => (
                      <FormikCheckBox
                        key={index}
                        checkBoxLabel={permission?.name}
                        name="accessControl"
                        id={`${accessControl?.feature_id?.name}-${permission?.name}`}
                        disabled={currentPageAction?.disabled}
                        value={{
                          permission_id: permission?._id,
                          feature_id: accessControl?.feature_id?._id
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ) : (
            <div className="h-20 flex justify-center items-center">
              <h2 className="text-gray-300 font-semibold">
                Sorry! Your feature and permissions were not found. Please create them before
                creating roles.
              </h2>
            </div>
          )}
        </div>
      </div>
      {!currentPageAction?.disabled ? (
        <React.Fragment>
          <Separator />
          <div className="flex justify-end items-center gap-x-2">
            <CustomButton variant="secondary" type="button" onClick={handleCancelClick}>
              Cancel
            </CustomButton>
            {accessControlList?.data?.length ? (
              <React.Fragment>
                {currentPageAction?.action === 'create' ? (
                  <CustomButton
                    variant="outline"
                    loading={btnLoader}
                    type="button"
                    onClick={handleSubmitForm}
                  >
                    Save & More
                  </CustomButton>
                ) : null}
                <CustomButton
                  variant="default"
                  loading={btnLoader}
                  type="button"
                  onClick={handleSubmitForm}
                >
                  Save
                </CustomButton>
              </React.Fragment>
            ) : null}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default RoleForm;
