"use client"

import * as React from 'react';

export interface BreadcrumbItemType {
  label: string;
  url: string;
  icon?: React.ReactNode
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItemType[];
  breadcrumbChange: (breadcrumb: BreadcrumbItemType[]) => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | undefined>(undefined);

const useBreadcrumb = () => {
  const context = React.useContext(BreadcrumbContext);

  if (!context) {
    throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider');
  }
  return context;
};

const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItemType[]>([]);

  const breadcrumbChange = (newBreadcrumb: BreadcrumbItemType[]) => {
    setBreadcrumbs(newBreadcrumb);
  };

  const breadcrumbValues = React.useMemo(() => ({ breadcrumbs, breadcrumbChange }), [breadcrumbs]);

  return (
    <BreadcrumbContext.Provider value={breadcrumbValues}>{children}</BreadcrumbContext.Provider>
  );
};

export { useBreadcrumb, BreadcrumbProvider };
