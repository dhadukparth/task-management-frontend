'use client';
import CustomButton from '@/components/custom/button';
import FormikInput from '@/components/custom/formik/formik-input';
import FormikTextarea from '@/components/custom/formik/formik-textarea';
import FormikWrapper from '@/components/custom/formik/formik-wrapper';
import CustomLoader from '@/components/custom/loader/loader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { permissionStatic } from '@/constant/static-information';
import { useToast } from '@/hooks/use-toast';
import {
  API_CREATE_PERMISSION,
  API_UPDATE_PERMISSION
} from '@/service/apis/permission';
import React from 'react';

interface PermissionFormModelProps {
  asAction: 'view' | 'edit' | 'create';
  open: boolean;
  dialogAction: () => void;
  permissionId?: string;
  permissionData?: any;
  loading: boolean;
  refresh: any;
}

const PermissionFormModel: React.FC<PermissionFormModelProps> = ({
  asAction = 'view',
  open,
  dialogAction,
  permissionId,
  permissionData,
  loading,
  refresh
}) => {
  const initialValues = {
    name: permissionData?.name ?? '',
    description: permissionData?.description ?? ''
  };

  const { toast } = useToast();
  const currentAction = permissionStatic[asAction];

  const CreatePermission = API_CREATE_PERMISSION();
  const UpdatePermission = API_UPDATE_PERMISSION();

  const handleSubmit = async (values: typeof permissionData) => {
    if (asAction === 'create') {
      CreatePermission.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your new permission create successfully'
          });
          refresh();
          dialogAction && dialogAction();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (asAction === 'edit') {
      values.id = permissionId;
      UpdatePermission.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your permission update successfully'
          });
          refresh();
          dialogAction && dialogAction();
        },
        onError(error) {
          console.error(error);
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={dialogAction}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{currentAction.title}</DialogTitle>
          <DialogDescription>{currentAction.description}</DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="h-96 flex justify-center items-center">
            <CustomLoader />
          </div>
        ) : (
          <FormikWrapper
            initialValues={initialValues}
            validationSchema={null}
            onSubmit={handleSubmit}
          >
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <FormikInput
                  name="name"
                  className="col-span-3"
                  placeholder="enter name"
                  disabled={currentAction.disabled}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="" className="text-right">
                  Description
                </Label>
                <FormikTextarea
                  name="description"
                  className="col-span-3"
                  placeholder="enter description"
                  disabled={currentAction.disabled}
                  rows={8}
                />
              </div>
            </div>
            {!currentAction.disabled ? (
              <DialogFooter>
                <CustomButton type="button" variant="secondary" onClick={dialogAction}>
                  Close
                </CustomButton>
                <CustomButton type="submit">Save</CustomButton>
              </DialogFooter>
            ) : null}
          </FormikWrapper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PermissionFormModel;
