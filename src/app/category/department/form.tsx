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
import { departmentStatic } from '@/constant/static-information';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import BACKEND_APIS from '../../../service/apis';

interface PermissionFormModelProps {
  asAction: 'view' | 'edit' | 'create';
  open: boolean;
  dialogAction: () => void;
  departmentId?: string;
  departmentData?: any;
  loading?: boolean;
  refresh: any;
}

const DepartmentFormModel: React.FC<PermissionFormModelProps> = ({
  asAction = 'view',
  open,
  dialogAction,
  departmentId,
  departmentData,
  loading,
  refresh
}) => {
  const initialValues = {
    name: departmentData?.name ?? '',
    description: departmentData?.description ?? ''
  };

  const { toast } = useToast();
  const currentAction = departmentStatic[asAction];

  const ApiCreateDepartment = BACKEND_APIS.DEPARTMENT.API_CREATE_DEPARTMENT();
  const ApiUpdateDepartment = BACKEND_APIS.DEPARTMENT.API_UPDATE_DEPARTMENT();

  const handleSubmit = async (values: typeof departmentData) => {
    if (asAction === 'create') {
      ApiCreateDepartment.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your new department create successfully'
          });
          refresh();
          dialogAction && dialogAction();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (asAction === 'edit') {
      values.id = departmentId;
      ApiUpdateDepartment.mutate(values, {
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

export default DepartmentFormModel;
