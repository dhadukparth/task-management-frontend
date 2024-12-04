import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface CustomLoaderProps {
  className?: string;
  customLoader?: React.ReactNode;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ className, customLoader }) => {
  if (customLoader) {
    return customLoader;
  } else {
    return <LoaderCircle className={cn('animate-spin', className)} />;
  }
};

export default CustomLoader;
