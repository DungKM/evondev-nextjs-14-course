"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { TActiveLinkProps } from '../types';

const ActiveLink = ({ url = "/", children }: TActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 dark:text-grayDark transition-all ${
        isActive
          ? "!text-primary !bg-opacity-20 !bg-primary svg-animation !font-semibold"
          : "hover:!text-primary hover:bg-primary hover:!bg-opacity-10 !font-semibold"
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink