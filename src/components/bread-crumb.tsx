'use client';

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { BreadcrumbItemType, useBreadcrumb } from '@/context/breadcrumb-context';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';

const DynamicBreadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();
  const breadcrumbCount = breadcrumbs.length;

  if (breadcrumbCount === 0) {
    return <BreadcrumbLoader />;
  }

  const renderBreadcrumb = (breadcrumb: BreadcrumbItemType) => (
    <div key={breadcrumb?.label} className="flex items-center gap-x-2">
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <span className="flex items-center gap-x-1">
            {breadcrumb?.icon && <span className="mr-1">{breadcrumb.icon}</span>}
            <Link href={breadcrumb?.url}>{breadcrumb?.label}</Link>
          </span>
        </BreadcrumbLink>
      </BreadcrumbItem>
    </div>
  );
  

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbCount > 4 && (
          <>
            {breadcrumbCount > 0 && renderBreadcrumb(breadcrumbs[0])}
            {breadcrumbCount > 1 && <BreadcrumbSeparator />}
          </>
        )}

        {breadcrumbCount > 4 ? (
          <>
            <div className="flex items-center gap-x-2">
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {breadcrumbs.slice(1, breadcrumbCount - 2).map((breadcrumb) => (
                      <DropdownMenuItem key={breadcrumb.label}>
                        <BreadcrumbLink asChild>
                          <Link href={breadcrumb?.url}>{breadcrumb?.label}</Link>
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>

            {renderBreadcrumb(breadcrumbs[breadcrumbCount - 2])}
            <BreadcrumbSeparator />
            {renderBreadcrumb(breadcrumbs[breadcrumbCount - 1])}
          </>
        ) : (
          breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.label}>
              {renderBreadcrumb(breadcrumb)}
              {index < breadcrumbCount - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;

const BreadcrumbLoader = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Skeleton className="h-4 w-14 rounded-md" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== 3 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
