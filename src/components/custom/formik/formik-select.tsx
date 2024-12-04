import React from 'react';
import { useField, useFormikContext, FormikContextType } from 'formik';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export type Options = {
  label: string;
  value: any;
};

interface FormikSelectProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  options: Options[];
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  name,
  disabled = false,
  className = '',
  placeholder = 'Select...',
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext<FormikContextType<any>>();

  const handleChange = (value: string) => {
    helpers.setValue(value);
    setFieldValue(name, value);
  };

  return (
    <React.Fragment>
      <Select name={name} onValueChange={handleChange} defaultValue={field.value || ''} {...props}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem value={option.value} key={option.value} className="capitalize">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-base">{meta.error}</div>
      )}
    </React.Fragment>
  );
};

export default FormikSelect;
