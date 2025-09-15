'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  opacity?: number;
}

export default function GlassContainer({
  children,
  className = '',
  opacity = 60
}: GlassContainerProps) {
  return (
    <div
      className={cn(
        `bg-white/${opacity} backdrop-blur-md`,
        className
      )}
    >
      {children}
    </div>
  );
}