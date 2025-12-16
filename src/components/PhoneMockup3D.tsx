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
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    // Get actual container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing canvas before adding new one
    const existingCanvas = containerRef.current.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    
    window.addEventListener('resize', handleResize);

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

    // Helper function to create rounded rectangle shape
    const createRoundedRectShape = (width: number, height: number, radius: number) => {
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;
      
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
      
      return shape;
    };

    // Phone body (frame) - increased size with rounded corners
    const frameShape = createRoundedRectShape(3.3, 6.6, 0.4);
    const frameGeometry = new THREE.ExtrudeGeometry(frameShape, {
      depth: 0.3,
      bevelEnabled: false,
    });
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = -0.15; // Center the extrusion
    phone.add(frame);

    // Screen border (to hide edges and create rounded appearance) - render first
    const screenBorderShape = createRoundedRectShape(3.1, 6.3, 0.35);
    const screenBorderGeometry = new THREE.ExtrudeGeometry(screenBorderShape, {
      depth: 0.03,
      bevelEnabled: false,
    });
    const screenBorderMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.3,
      roughness: 0.7,
    });
    const screenBorder = new THREE.Mesh(screenBorderGeometry, screenBorderMaterial);
    screenBorder.position.z = 0.135; // Behind screen
    phone.add(screenBorder);
    
    // Create rounded corner alpha map for screen
    const createRoundedAlphaMap = (width: number, height: number, radius: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw rounded rectangle
      const x = 0;
      const y = 0;
      const w = canvas.width;
      const h = canvas.height;
      const r = radius * (canvas.width / width); // Scale radius to canvas size
      
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
    
    // Screen - use PlaneGeometry for proper texture mapping
    const screenGeometry = new THREE.PlaneGeometry(3.0, 6.2);
    const alphaMap = createRoundedAlphaMap(3.0, 6.2, 0.3);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      alphaMap: alphaMap,
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.17; // In front of border, avoiding z-fighting
    phone.add(screen);

    // Side button - adjusted for larger phone
    const buttonGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.2);
    const buttonMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.8,
      roughness: 0.2,
    });
    const sideButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    sideButton.position.set(1.7, 1.0, 0);
    phone.add(sideButton);

    // Volume buttons - adjusted for larger phone
    const volButton1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.35, 0.2),
      buttonMaterial
    );
    volButton1.position.set(-1.7, 1.5, 0);
    phone.add(volButton1);

    const volButton2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.35, 0.2),
      buttonMaterial
    );
    volButton2.position.set(-1.7, 0.9, 0);
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
      window.removeEventListener('resize', handleResize);
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
    <div className={`relative ${className} mx-auto w-full`} style={{ maxWidth: "800px", aspectRatio: "1/1" }}>
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
