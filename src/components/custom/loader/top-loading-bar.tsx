'use client';

import React from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the default CSS styles
import { usePathname, useSearchParams } from 'next/navigation';

NProgress.configure({ showSpinner: false }); // Customize the progress bar here

const TopLoadingBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending] = React.useTransition();

  React.useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams, isPending]);

  return children;
};

export default TopLoadingBar;
