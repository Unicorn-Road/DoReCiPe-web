"use client";

import dynamic from 'next/dynamic';

const PhoneMockup3D = dynamic(() => import('./PhoneMockup3D'), { 
  ssr: false,
  loading: () => (
    <div style={{ width: '600px', height: '600px' }} className="flex items-center justify-center bg-gradient-to-br from-coral-100 to-pantry-100 rounded-3xl">
      <div className="text-pantry-400">Loading 3D view...</div>
    </div>
  )
});

interface PhoneMockup3DClientProps {
  screenshots: string[];
  className?: string;
}

export default function PhoneMockup3DClient({ screenshots, className }: PhoneMockup3DClientProps) {
  return <PhoneMockup3D screenshots={screenshots} className={className} />;
}
