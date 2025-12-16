"use client";

import { useState, useRef, useEffect } from "react";

interface HeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  creatorHandle: string;
}

export default function HeroVideo({
  videoSrc,
  posterSrc,
  creatorHandle,
}: HeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative max-w-sm mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ minHeight: '640px' }}>
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          muted={isMuted}
          playsInline
          autoPlay={!isMobile}
          className="w-full aspect-[9/16] object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Mobile play button overlay */}
        {isMobile && !isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            aria-label="Play video"
          >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-coral ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {/* Sound control */}
        {!isMobile && isPlaying && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Creator Credit */}
      <div className="mt-4 text-center">
        <p className="text-sm text-pantry-400">
          Video by{" "}
          <a
            href={`https://www.instagram.com/${creatorHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral hover:text-coral-600 transition-colors font-medium"
          >
            @{creatorHandle}
          </a>
        </p>
      </div>
    </div>
  );
}
