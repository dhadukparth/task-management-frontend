'use client';
import { useBreadcrumb } from '@/context/breadcrumb-context';
import { Home } from 'lucide-react';
import React from 'react';

const Page = () => {
  const { breadcrumbChange } = useBreadcrumb();

  React.useEffect(() => {
    breadcrumbChange([
      { label: 'Home', url: '/', icon: <Home className='size-5' /> },
    ]);
  }, []);
  

  return (
    <div>
      <h2>Dashboard Page</h2>
    </div>
  );
};

export default Page;
