import React from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from '../app-sidebar';
import NavbarSection from '../custom/navbar';
import { BreadcrumbProvider } from '@/context/breadcrumb-context';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <AppSidebar />
        <SidebarInset>
          <NavbarSection />
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
};

export default AdminLayout;
