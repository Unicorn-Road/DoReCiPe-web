'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  const [shouldTrack, setShouldTrack] = useState(true);

  useEffect(() => {
    // Fetch user's IP and check if it should be excluded
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        const excludedIps = ['145.224.65.236']; // Your IP
        if (excludedIps.includes(data.ip)) {
          setShouldTrack(false);
          console.log('Google Analytics disabled for admin IP');
        }
      })
      .catch(() => {
        // If IP check fails, default to tracking
        setShouldTrack(true);
      });
  }, []);

  if (!shouldTrack) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
