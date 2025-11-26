"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface PhoneMockup3DProps {
  screenshots: string[];
  className?: string;
}

export default function PhoneMockup3D({ screenshots, className = "" }: PhoneMockup3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    phone: THREE.Group;
    screen: THREE.Mesh;
    textures: THREE.Texture[];
    animationId?: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicate initialization
    if (sceneRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(600, 600);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing canvas before adding new one
    const existingCanvas = containerRef.current.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }
    
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);

    // Create phone group
    const phone = new THREE.Group();

    // Phone body (frame)
    const frameGeometry = new THREE.BoxGeometry(2.8, 5.6, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    phone.add(frame);

    // Screen
    const screenGeometry = new THREE.BoxGeometry(2.6, 5.3, 0.05);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.16;
    phone.add(screen);

    // Side button
    const buttonGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.2);
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const sideButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    sideButton.position.set(1.45, 0.8, 0);
    phone.add(sideButton);

    // Volume buttons
    const volButton1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.3, 0.2),
      buttonMaterial
    );
    volButton1.position.set(-1.45, 1.2, 0);
    phone.add(volButton1);

    const volButton2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.3, 0.2),
      buttonMaterial
    );
    volButton2.position.set(-1.45, 0.7, 0);
    phone.add(volButton2);

    scene.add(phone);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    let loadedCount = 0;

    screenshots.forEach((src, index) => {
      textureLoader.load(
        src, 
        (texture) => {
          // Configure texture
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.colorSpace = THREE.SRGBColorSpace;
          textures[index] = texture;
          loadedCount++;
          if (loadedCount === 1 && index === 0) {
            // Set first texture when loaded
            screenMaterial.map = texture;
            screenMaterial.color.set(0xffffff); // Ensure white multiplier
            screenMaterial.needsUpdate = true;
          }
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', src, error);
        }
      );
    });

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotationY = mouseX * 0.3;
        targetRotationX = mouseY * 0.2;
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Smooth rotation
      phone.rotation.y += (targetRotationY - phone.rotation.y) * 0.05;
      phone.rotation.x += (targetRotationX - phone.rotation.x) * 0.05;

      // Gentle floating animation
      phone.position.y = Math.sin(Date.now() * 0.001) * 0.05;

      renderer.render(scene, camera);
      
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    animate();

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      phone,
      screen,
      textures,
    };

    // Cleanup
    return () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      const currentContainer = containerRef.current;
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        const canvas = currentContainer.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
      renderer.dispose();
      
      // Dispose of geometries and materials
      phone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      // Dispose of textures
      textures.forEach(texture => texture.dispose());
      
      sceneRef.current = null;
    };
  }, [screenshots]);

  // Update texture when activeIndex changes
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.textures[activeIndex]) {
      const screenMaterial = sceneRef.current.screen.material as THREE.MeshBasicMaterial;
      screenMaterial.map = sceneRef.current.textures[activeIndex];
      screenMaterial.color.set(0xffffff); // Ensure white multiplier
      screenMaterial.needsUpdate = true;
    }
  }, [activeIndex]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [screenshots.length]);

  return (
    <div className={`relative ${className}`} style={{ width: "600px", height: "600px" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      
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
