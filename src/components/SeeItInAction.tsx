"use client";

import { useState } from "react";
import VideoModal from "./VideoModal";
import Image from "next/image";

export default function SeeItInAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="heading-2 mb-4">See it in action</h2>
        <p className="body-lg text-pantry-400 max-w-2xl mx-auto">
          Real kitchen. Real ingredients. Real dinner solved.
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        {/* Video Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-black"
          style={{ minHeight: '640px' }}
        >
          {/* Poster Image */}
          <div className="relative aspect-[9/16]" style={{ minHeight: '640px' }}>
            <Image
              src="/videos/action-demo-poster.jpg"
              alt="Do-Re-Ci-Pe in action"
              fill
              className="object-cover"
            />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-20 h-20 rounded-full bg-white/90 group-hover:scale-110 transition-transform flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-coral ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Creator credit */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <div className="inline-block px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm font-medium">
                @marandterry
              </span>
            </div>
          </div>
        </button>

        {/* Caption below */}
        <p className="text-center mt-4 text-sm text-pantry-400">
          Watch how Do-Re-Ci-Pe turns a quick fridge photo into a complete meal plan
        </p>
      </div>

      {/* Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc="/videos/action-demo.mp4"
        creatorName="Mar and Terry"
        creatorHandle="marandterry"
      />
    </>
  );
}
