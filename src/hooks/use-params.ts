'use client';

import { useSearchParams } from 'next/navigation';

const useParams = ()=> {
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  if (Object.keys(params).length === 0) {
    return null;
  }

  return params;
}

export default useParams