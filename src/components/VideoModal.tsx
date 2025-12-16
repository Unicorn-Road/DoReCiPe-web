"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  creatorName: string;
  creatorHandle: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  creatorName,
  creatorHandle,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-coral transition-colors text-sm font-medium"
          aria-label="Close video"
        >
          Close ✕
        </button>

        {/* Video */}
        <div className="relative bg-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            playsInline
            className="w-full aspect-[9/16]"
          />
        </div>

        {/* Creator credit */}
        <div className="mt-4 text-center text-white/80 text-sm">
          Video by{" "}
          <a
            href={`https://www.instagram.com/${creatorHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral hover:text-coral-400 transition-colors font-medium"
          >
            @{creatorHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
