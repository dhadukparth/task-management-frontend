import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CustomButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  isLoadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asLink?: {
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
  };
  children: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type = 'button',
  onClick = () => {},
  variant = 'default',
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  isLoadingText,
  icon,
  iconPosition = 'left',
  asLink,
  ...props
}) => {
  const buttonClasses = `${fullWidth ? 'w-full' : ''} ${loading || disabled ? 'cursor-no-drop' : ''} ${className}`;

  if (asLink) {
    return (
      <Link
        href={asLink?.href ?? ''}
        target={asLink?.target}
        className="h-9 px-4 py-2 border bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        {...props}
      >
        <div className="flex items-center">
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </div>
      </Link>
    );
  } else {
    return (
      <Button
        type={type}
        variant={variant}
        onClick={onClick}
        disabled={loading || disabled}
        className={buttonClasses}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <React.Fragment>
            <LoaderCircle className="animate-spin" />
            {isLoadingText && <span className="sr-only">{isLoadingText}</span>}{' '}
          </React.Fragment>
        ) : (
          <div className="flex items-center">
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </div>
        )}
      </Button>
    );
  }
};

export default CustomButton;
