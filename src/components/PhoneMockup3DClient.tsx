"use client";

import dynamic from 'next/dynamic';

const PhoneMockup3D = dynamic(() => import('./PhoneMockup3D'), { 
  ssr: false
});

interface PhoneMockup3DClientProps {
  screenshots: string[];
  className?: string;
}

export default function PhoneMockup3DClient({ screenshots, className }: PhoneMockup3DClientProps) {
  return <PhoneMockup3D screenshots={screenshots} className={className} />;
}
