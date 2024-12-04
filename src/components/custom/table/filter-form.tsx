import { useFormikContextType } from '@/types/components';
import { FilterFormProps } from '@/types/custom-table';
import { FieldArray, useFormikContext } from 'formik';
import { Plus, X } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui/button';
import FormikInput from '../formik/formik-input';
import FormikSelect from '../formik/formik-select';

const FilterForm: React.FC<FilterFormProps> = ({ columnsList, filter }) => {
  const { values, setFieldValue }: useFormikContextType = useFormikContext();

  const filterOperationList =
    filter?.operationList?.map((operation) => ({
      label: operation.label,
      value: operation.value
    })) ?? [];

  return (
    <div className="divide-y">
      <FieldArray name="filters">
        {({ push, remove }) => (
          <React.Fragment>
            <div className="py-2 px-3">
              <h6>In this view show records</h6>
            </div>
            <div className="py-2 px-3 space-y-4">
              {values.filters.length !== 0 ? (
                <React.Fragment>
                  {values.filters.map((fi: any, index: number) => (
                    <div key={index} className="grid grid-cols-12 gap-x-4 items-center">
                      <div className="text-center col-span-2">Where</div>
                      <div className="col-span-3">
                        <FormikSelect
                          name={`filters.${index}.field`}
                          options={
                            columnsList
                              .filter((column) => column.getCanFilter())
                              .map((column) => ({
                                value: column.id,
                                label: column.id
                                  ?.toString()
                                  ?.replace(/\//g, '_')
                                  .replace(/_/g, ' ')
                                  .toLowerCase()
                              })) ?? []
                          }
                          placeholder="select column"
                        />
                      </div>
                      <div className="col-span-3">
                        <FormikSelect
                          name={`filters.${index}.operation`}
                          options={filterOperationList}
                          placeholder="select operation"
                        />
                      </div>
                      <div className="col-span-3 flex justify-between items-center gap-x-4">
                        <FormikInput name={`filters.${index}.value`} placeholder="enter value" />
                      </div>
                      <div className="col-span-1">
                        <Button
                          type="button"
                          className="w-fit"
                          variant="ghost"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ) : (
                <div className="flex justify-center items-center h-20">
                  <h2>Not Found</h2>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center py-2 px-3">
              <Button
                type="button"
                className="flex justify-start items-center gap-x-2"
                onClick={() => push({})}
              >
                <Plus />
                Add Filter
              </Button>
              <div className="flex justify-between items-center gap-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setFieldValue('filters', []);
                    setFieldValue('filters', [{}]);
                  }}
                >
                  Clear all filters
                </Button>
                <Button type="submit">Apply Filter</Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </FieldArray>
    </div>
  );
};

export default FilterForm;
