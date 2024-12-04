import { Textarea } from '@/components/ui/textarea';
import { useFormikContextType } from '@/types/components';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import { cn } from '../../../lib/utils';

interface FormikTextareaProps {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  max?: number;
}

const FormikTextarea: React.FC<FormikTextareaProps> = ({
  name,
  disabled = false,
  className,
  placeholder,
  rows = 8,
  max = 300,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue }: useFormikContextType = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!max || newValue.length <= max) {
      helpers.setValue(newValue);
      setFieldValue(name, newValue);
    }
};

  return (
    <React.Fragment>
      <Textarea
        id={name}
        name={name}
        className={cn('max-h-96', className)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        value={field.value}
        onChange={handleChange}
        {...props}
      />
      <div className="py-0.5 text-right">
        {field.value.length}/{max}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-base">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export default FormikTextarea;
