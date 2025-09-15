'use client';

import { cn } from '@/lib/utils';

interface ButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  text,
  size = 'md',
  variant = 'primary',
  showArrow = true,
  onClick,
  className = ''
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-white text-gray-900 hover:bg-gray-100'
  };

  const arrowSizes = {
    sm: { width: 6, height: 10 },
    md: { width: 6, height: 10 },
    lg: { width: 8, height: 14 }
  };

  const arrow = arrowSizes[size];

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {text}
      {showArrow && (
        <svg
          width={arrow.width}
          height={arrow.height}
          viewBox={`0 0 ${arrow.width} ${arrow.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:translate-x-0.5 transition-transform"
        >
          <path
            d={`M1 1L${arrow.width - 1} ${arrow.height / 2}L1 ${arrow.height - 1}`}
            stroke="currentColor"
            strokeWidth={size === 'lg' ? 2 : 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}