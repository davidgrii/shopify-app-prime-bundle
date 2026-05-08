'use client';

import React from 'react';
import {cn} from "@/components/ui/cn.ts";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container: React.FC<IProps> = ({ children, className }) => {
  return <div className={cn('mx-auto px-3 max-w-7xl', className)}>{children}</div>;
};
