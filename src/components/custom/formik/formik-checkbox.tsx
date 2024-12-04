import { CheckedState } from '@radix-ui/react-checkbox';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import { useFormikContextType } from '../../../types/components';
import { Checkbox } from '../../ui/checkbox';

interface FormikCheckBoxProps {
  name: string;
  id: string;
  disabled?: boolean;
  className?: string;
  checkBoxLabel: string | React.ReactNode;
  value: any;
}

const FormikCheckBox: React.FC<FormikCheckBoxProps> = ({
  name,
  disabled = false,
  className,
  checkBoxLabel,
  value,
  id,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue }: useFormikContextType = useFormikContext();

  const handleChange = (checked: CheckedState) => {
    const currentValues = field.value || [];
    if (checked) {
      setFieldValue(name, [...currentValues, value]);
    } else if (typeof value === 'object') {
      setFieldValue(
        name,
        currentValues.filter((item: any) => JSON.stringify(item) !== JSON.stringify(value))
      );
    } else {
      setFieldValue(
        name,
        currentValues.filter((item: any) => item !== value)
      );
    }
  };

  const handleCheckValue = (checkedValues: any): boolean => {
    if (typeof value === 'object') {
      return checkedValues.some((item: any) => JSON.stringify(item) === JSON.stringify(value));
    } else {
      return checkedValues.includes(value);
    }
  };

  return (
    <React.Fragment>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={handleCheckValue(field.value)}
          onCheckedChange={handleChange}
          disabled={disabled}
          {...props}
        />
        {checkBoxLabel && (
          <label
            htmlFor={id}
            className="text-base capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {checkBoxLabel}
          </label>
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-base">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export default FormikCheckBox;
