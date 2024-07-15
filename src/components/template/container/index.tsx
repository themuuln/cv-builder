import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { SlashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Fragment, type ReactNode } from 'react';

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const breadcrumbs = window.location.pathname
    .slice(1)
    .split('/')
    .filter(Boolean)
    .map((path, index, array) => {
      const href = `/${array.slice(0, index + 1).join('/')}`;
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbLink href={href}>
            {path.replace(/^\w/, (c) => c.toUpperCase())}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    });

  return (
    <div className={cn('container', className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((breadcrumb, index) => (
            <Fragment key={index}>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              {breadcrumb}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </div>
  );
};

export default Container;
