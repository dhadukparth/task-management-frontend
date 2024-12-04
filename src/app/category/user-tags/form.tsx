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
import { userTagsStatic } from '@/constant/static-information';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import BACKEND_APIS from '../../../service/apis';

interface PermissionFormModelProps {
  asAction: 'view' | 'edit' | 'create';
  open: boolean;
  dialogAction: () => void;
  userTagId?: string;
  userTagData?: any;
  loading?: boolean;
  refresh: any;
}

const UserTagsFormModel: React.FC<PermissionFormModelProps> = ({
  asAction = 'view',
  open,
  dialogAction,
  userTagId,
  userTagData,
  loading,
  refresh
}) => {
  const initialValues = {
    name: userTagData?.name ?? '',
    description: userTagData?.description ?? ''
  };

  const { toast } = useToast();
  const currentAction = userTagsStatic[asAction];

  const ApiCreateUserTags = BACKEND_APIS.User_TAGS.API_CREATE_USER_TAGS();
  const ApiUpdateUserTags = BACKEND_APIS.User_TAGS.API_UPDATE_USER_TAGS();

  const handleSubmit = async (values: typeof userTagData) => {
    if (asAction === 'create') {
      ApiCreateUserTags.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your new user tag create successfully'
          });
          refresh();
          dialogAction && dialogAction();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (asAction === 'edit') {
      values.id = userTagId;
      ApiUpdateUserTags.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your user tag update successfully'
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

export default UserTagsFormModel;
