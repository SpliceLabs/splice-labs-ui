'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  background?: ReactNode;
  className?: string;
}

export default function Section({
  children,
  background,
  className = ''
}: SectionProps) {
  return (
    <div className={cn('relative min-h-screen overflow-hidden', className)}>
      {background}
      {children}
    </div>
  );
}