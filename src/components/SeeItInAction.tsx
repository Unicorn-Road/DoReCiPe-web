"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";
import Image from "next/image";

interface Video {
  id: string;
  posterSrc: string;
  videoSrc: string;
  creatorHandle: string;
  creatorName: string;
}

const videos: Video[] = [
  {
    id: "marandterry",
    posterSrc: "/videos/action-demo-poster.jpg",
    videoSrc: "/videos/action-demo.mp4",
    creatorHandle: "marandterry",
    creatorName: "Mar and Terry",
  },
  {
    id: "momapocalypse",
    posterSrc: "/videos/momapocalypse-demo-poster.jpg",
    videoSrc: "/videos/momapocalypse-demo.mp4",
    creatorHandle: "momapocalypse",
    creatorName: "Momapocalypse",
  },
  {
    id: "bubbas",
    posterSrc: "/videos/bubbas-demo-poster.jpg",
    videoSrc: "/videos/bubbas-demo.mp4",
    creatorHandle: "bubbas_sourdough_co",
    creatorName: "Bubba's Sourdough Co",
  },
  {
    id: "kenskitchen",
    posterSrc: "/videos/kenskitchen-demo-poster.jpg",
    videoSrc: "/videos/kenskitchen-demo.mp4",
    creatorHandle: "kenskitchennn",
    creatorName: "Ken's Kitchen",
  },
];

export default function SeeItInAction() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="heading-2 mb-4">See it in action</h2>
        <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
          Watch real people solve dinner with a quick fridge photo.
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-black"
          >
            {/* Poster Image */}
            <div className="relative aspect-[9/16]">
              <Image
                src={video.posterSrc}
                alt={`Do-Re-Ci-Pe demo by @${video.creatorHandle}`}
                fill
                className="object-cover"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:scale-110 transition-transform flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-coral ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Creator credit */}
            <div className="absolute bottom-4 left-0 right-0 text-center px-2">
              <div className="inline-block px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-medium">
                  @{video.creatorHandle}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo.videoSrc}
          creatorName={selectedVideo.creatorName}
          creatorHandle={selectedVideo.creatorHandle}
        />
      )}
    </>
  );
}
