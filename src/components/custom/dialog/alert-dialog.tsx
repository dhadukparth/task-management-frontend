import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import React from 'react';

interface CustomAlterDialogBaseProps {
  open: boolean;
  dialogChange: (status: boolean) => void;
  title: string;
  description: string;
  asChild?: boolean;
  actionClick: ()=>void
}

interface CustomAlterDialogWithChildren extends CustomAlterDialogBaseProps {
  asChild: true;
  children: React.ReactNode;
}

interface CustomAlterDialogWithoutChildren extends CustomAlterDialogBaseProps {
  asChild?: false;
  children?: never;
}

type CustomAlterDialogProps = CustomAlterDialogWithChildren | CustomAlterDialogWithoutChildren;

const CustomAlterDialog: React.FC<CustomAlterDialogProps> = ({
  open,
  dialogChange,
  title,
  description,
  asChild,
  children,
  actionClick
}) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={dialogChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            <span>{description}</span>
            {
                asChild && (
                  <div className="mt-4">
                    {children}
                  </div>
                )
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionClick}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlterDialog;
