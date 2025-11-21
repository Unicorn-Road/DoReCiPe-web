import React from 'react';

interface FacebookReelEmbedProps {
  videoUrl: string;
  className?: string;
}

const FacebookReelEmbed: React.FC<FacebookReelEmbedProps> = ({ videoUrl, className = '' }) => {
  const encodedUrl = encodeURIComponent(videoUrl);
  const src = `https://www.facebook.com/plugins/video.php?height=476&href=${encodedUrl}&show_text=false&width=267&t=0`;

  return (
    <div className={`mx-auto max-w-[300px] ${className}`}>
      <div className="relative w-full overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white bg-black">
        {/* 9:16 Aspect Ratio */}
        <div className="relative pb-[177.77%] h-0">
          <iframe
            src={src}
            className="absolute top-0 left-0 w-full h-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Reel"
          />
        </div>
      </div>
    </div>
  );
};

export default FacebookReelEmbed;
