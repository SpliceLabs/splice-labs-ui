import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen flex flex-col justify-center pt-24 sm:pt-20 ${className}`}>
      {children}
    </div>
  );
}