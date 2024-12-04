import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface FormikWrapperProps<T> {
  children: React.ReactNode;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any> | null;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
}

const FormikWrapper: React.FC<FormikWrapperProps<any>> = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
  ...props
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => <Form {...props}>{children}</Form>}
    </Formik>
  );
};

export default FormikWrapper;
