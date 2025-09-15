'use client';

import { useRouter } from 'next/navigation';
import Navbar from '../ui/Navbar';

export default function AppNavbar() {
  const router = useRouter();
  
  const handleCtaClick = () => {
    router.push('/contact');
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <Navbar ctaText="Contact Us" onCtaClick={handleCtaClick} />
    </div>
  );
}