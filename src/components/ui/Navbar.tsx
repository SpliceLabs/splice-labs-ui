'use client';

import Image from 'next/image';
import Link from 'next/link';
import GlassContainer from './GlassContainer';
import Button from './Button';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function Navbar({
  links = [],
  ctaText,
  onCtaClick
}: NavbarProps) {
  return (
    <nav className="relative z-10 mx-auto max-w-6xl px-6 pt-8">
      <GlassContainer className="flex items-center justify-between rounded-full px-8 py-4 shadow-sm border border-gray-100/50">
        <Link href="/" className="flex items-center">
          <Image 
            src="/splicelabs-logo.png" 
            alt="Splice Labs" 
            width={200}
            height={50}
            className="h-6 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        { ctaText && (<Button
          text={ctaText}
          size="sm"
          onClick={onCtaClick}
          className='z-2'
        />) }
      </GlassContainer>
    </nav>
  );
}
