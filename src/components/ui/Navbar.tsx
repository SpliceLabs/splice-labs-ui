'use client';

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
  links = [
    { label: 'Docs', href: '#' },
    { label: 'Hackathons', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Whitepaper', href: '#' }
  ],
  ctaText = 'Start Building',
  onCtaClick
}: NavbarProps) {
  return (
    <nav className="relative z-10 mx-auto max-w-6xl px-6 pt-8">
      <GlassContainer className="flex items-center justify-between rounded-full px-8 py-4 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            pliceLabs
          </span>
        </div>

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
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Explore
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L4 4L7 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <Button
          text={ctaText}
          size="sm"
          onClick={onCtaClick}
          className='z-2'
        />
      </GlassContainer>
    </nav>
  );
}