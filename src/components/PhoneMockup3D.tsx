"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PhoneMockup3DProps {
  screenshots: string[];
  className?: string;
}

function IPhoneModel({ screenshots, activeIndex }: { screenshots: string[]; activeIndex: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load textures
  const textures = useTexture(screenshots);
  
  // Auto-rotate slightly
  useFrame((state) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Phone body - dark frame */}
      <RoundedBox
        args={[2.8, 5.6, 0.3]}
        radius={0.25}
        smoothness={4}
      >
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Screen - slightly inset */}
      <RoundedBox
        args={[2.6, 5.3, 0.05]}
        radius={0.2}
        smoothness={4}
        position={[0, 0, 0.16]}
      >
        <meshStandardMaterial 
          map={textures[activeIndex]}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Notch */}
      <mesh position={[0, 2.4, 0.17]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Side button */}
      <mesh position={[1.45, 0.8, 0]}>
        <boxGeometry args={[0.05, 0.6, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Volume buttons */}
      <mesh position={[-1.45, 1.2, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.45, 0.7, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen reflection overlay */}
      <mesh position={[0, 0, 0.17]}>
        <planeGeometry args={[2.6, 5.3]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.05}
          metalness={1}
          roughness={0}
        />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2.8, 5.6, 0.3]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  );
}

export default function PhoneMockup3D({ screenshots, className = "" }: PhoneMockup3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  if (!isClient) {
    return (
      <div className={`relative ${className}`} style={{ width: "600px", height: "600px" }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coral-100 to-pantry-100 rounded-3xl">
          <div className="text-pantry-400">Loading 3D view...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: "600px", height: "600px" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <IPhoneModel screenshots={screenshots} activeIndex={activeIndex} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-50 flex justify-center gap-2">
        {screenshots.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? "bg-coral w-8" 
                : "bg-coral/30 hover:bg-coral/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
