'use client';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import React from 'react';
import { DataTableDemo } from './data-table';
import { BREADCRUMB_DASHBOARD_ITEMS } from '@/constant/breadcrumb-menulist';

const Page = () => {
  const { breadcrumbChange } = useBreadcrumb();

  React.useEffect(() => {
    breadcrumbChange(BREADCRUMB_DASHBOARD_ITEMS);
  }, []);

  return (
    <div className="py-10">
      <DataTableDemo />
    </div>
  );
};

export default Page;
