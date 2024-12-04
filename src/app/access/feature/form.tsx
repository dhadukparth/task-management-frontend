import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { featuresStatic } from '@/constant/static-information';
import React from 'react';
import CustomButton from '../../../components/custom/button';
import FormikInput from '../../../components/custom/formik/formik-input';
import FormikTextarea from '../../../components/custom/formik/formik-textarea';
import FormikWrapper from '../../../components/custom/formik/formik-wrapper';
import CustomLoader from '../../../components/custom/loader/loader';
import { useToast } from '../../../hooks/use-toast';
import { API_CREATE_FEATURE, API_UPDATE_FEATURE } from '../../../service/apis/features';

interface FeatureFormModelProps {
  asAction: 'view' | 'edit' | 'create';
  open: boolean;
  dialogAction: () => void;
  featureId?: string;
  featureData?: any;
  loading: boolean;
  refresh: any;
}

const FeatureFormModel: React.FC<FeatureFormModelProps> = ({
  asAction = 'view',
  open,
  dialogAction,
  featureId,
  featureData,
  loading,
  refresh
}) => {
  const currentAction = featuresStatic[asAction];
  const { toast } = useToast();

  const initialValues = {
    name: featureData?.name ?? '',
    description: featureData?.description ?? ''
  };

  const ApiCreateFeature = API_CREATE_FEATURE()
  const ApiUpdateFeature = API_UPDATE_FEATURE()

  const handleSubmit = async (values: typeof featureData) => {
    if (asAction === 'create') {
      ApiCreateFeature.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your new feature create successfully'
          });
          refresh();
          dialogAction && dialogAction();
        },
        onError(error) {
          console.error(error);
        }
      });
    } else if (asAction === 'edit') {
      values.id = featureId;
      ApiUpdateFeature.mutate(values, {
        onSuccess: (data) => {
          toast({
            title: data.message,
            description: 'Your feature update successfully'
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

export default FeatureFormModel;
