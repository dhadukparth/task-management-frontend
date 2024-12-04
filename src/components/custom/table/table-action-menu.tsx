import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
type DividerType = {
  key: 'DIVIDER';
};

type ActionTypeLink = {
  key: string;
  label: string;
  asLink?: true;
  href: string;
  onClick?: never;
  sectionLabel?: string;
  className?: string;
};

type ActionTypeButton = {
  key: string;
  label: string;
  asLink?: false;
  href?: never;
  onClick: (event: React.MouseEvent<HTMLDivElement>, menu: ActionTypeButton) => void;
  sectionLabel?: string;
  className?: string;
};

type ActionType = ActionTypeLink | ActionTypeButton;
export type ActionMenuItem = DividerType | ActionType;

interface TableActionButtonProps {
  menuList: ActionMenuItem[];
  headerLabel?: React.ReactNode | false;
}

// Type guard to check if item is of type ActionType
const isActionType = (item: ActionMenuItem): item is ActionType => item.key !== 'DIVIDER';

const TableActionButton: React.FC<TableActionButtonProps> = ({ menuList, headerLabel = false }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {headerLabel === false ? (
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        ) : (
          headerLabel
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuList.map((menu, index) => {
          if (!isActionType(menu)) {
            return <DropdownMenuSeparator key={`divider-${index}`} />;
          }

          return (
            <React.Fragment key={menu.key}>
              {menu.sectionLabel && (
                <DropdownMenuLabel className="text-xs font-medium ">
                  {menu.sectionLabel}
                </DropdownMenuLabel>
              )}
              {menu.asLink ? (
                <DropdownMenuItem asChild>
                  <Link href={menu.href} className={menu.className}>
                    {menu.label}
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className={menu.className}
                  onClick={(event) => menu.onClick && menu.onClick(event, menu)}
                >
                  {menu.label}
                </DropdownMenuItem>
              )}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionButton;
