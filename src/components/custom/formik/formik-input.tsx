import { Input } from '@/components/ui/input';
import { useFormikContextType } from '@/types/components';
import { useField, useFormikContext } from 'formik';
import React from 'react';

interface FormikInputProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  disabled = false,
  className,
  placeholder,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue }: useFormikContextType = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    helpers.setValue(newValue);
    setFieldValue(name, newValue);
  };

  return (
    <React.Fragment>
      <Input
        id={name}
        name={name}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        value={field.value}
        autoComplete='off'
        onChange={handleChange}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-base">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export default FormikInput;
