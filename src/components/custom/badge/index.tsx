import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React from 'react';

type BadgeType = 'success' | 'danger' | 'pending' | 'default';

interface CustomBadgeProps {
  children: React.ReactNode;
  variant?: BadgeType;
  className?: string;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeType, string> = {
    success: 'bg-green-600 text-white hover:bg-green-900',
    danger: 'bg-red-600 text-white hover:bg-red-900',
    pending: 'bg-yellow-400 text-white hover:bg-yellow-800',
    default: 'bg-gray-600 text-white hover:bg-gray-900'
  };

  const badgeClasses = cn(variantStyles[variant], className);

  return (
    <Badge className={badgeClasses} {...props}>
      {children}
    </Badge>
  );
};

export default CustomBadge;
