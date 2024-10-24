import React from 'react';
import DynamicBreadcrumb from '@/components/bread-crumb';
import { ModeToggle } from '@/components/theme-mode';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Bell } from 'lucide-react';


const NavbarSection = () => {

  return (
    <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb />
      </div>
      <div className="flex justify-center gap-2 items-center">
        <Bell />
        <ModeToggle />
      </div>
    </header>
  );
};

export default NavbarSection;
