import React from 'react';

interface FacebookReelEmbedProps {
  videoUrl: string;
  className?: string;
}

const FacebookReelEmbed: React.FC<FacebookReelEmbedProps> = ({ videoUrl, className = '' }) => {
  const encodedUrl = encodeURIComponent(videoUrl);
  // Use post.php which often handles Reels more reliably than video.php for vertical content
  const src = `https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=false&width=267&height=476`;

  return (
    <div className={`mx-auto max-w-[300px] ${className}`}>
      <div className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white bg-black">
        {/* 9:16 Aspect Ratio */}
        <div className="relative pb-[177.77%] h-0">
          <iframe
            src={src}
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Reel"
          />
          {/* Fallback/Loading state */}
          <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-pantry-900 z-0">
            <span className="sr-only">Loading Reel...</span>
          </div>
        </div>
      </div>
      {/* Fallback Link */}
      <div className="mt-4 text-center">
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-pantry-400 hover:text-coral transition-colors"
        >
          <span>Watch on Facebook</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FacebookReelEmbed;
