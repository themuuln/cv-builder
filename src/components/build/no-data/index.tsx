import type { ReactNode } from 'react';

const NoData = ({ children }: { children: ReactNode }) => {
  return <p className='text-gray-400'>{children}</p>;
};

export default NoData;
