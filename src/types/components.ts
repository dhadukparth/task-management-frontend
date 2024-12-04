import { FormikErrors } from 'formik';
import React from 'react';

export type useFormikContextType = {
  values: any;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<unknown>>;
};
