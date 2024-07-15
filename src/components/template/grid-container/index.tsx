import type { ReactNode } from 'react';

type GridContainerProps = {
  children: ReactNode;
};

const GridContainer: React.FC<GridContainerProps> = ({
  children,
}): JSX.Element => {
  return <div className='grid grid-cols-4 gap-4'>{children}</div>;
};

export default GridContainer;
