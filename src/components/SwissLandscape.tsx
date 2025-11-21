"use client";

import { useEffect, useRef } from "react";

export default function SwissLandscape() {
  const landscapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!landscapeRef.current) return;
      
      const scrolled = window.scrollY;
      const elements = landscapeRef.current.querySelectorAll("[data-parallax]");
      
      elements.forEach((element) => {
        const speed = parseFloat(element.getAttribute("data-parallax") || "0");
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={landscapeRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-apricot-100 via-cream-100 to-cream z-0" />

      {/* PendleHill - fixed background layer */}
      <div className="absolute bottom-[30%] left-0 right-0">
        <svg
          viewBox="0 0 1521.13 340.43"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M1521.13,32.06c-103.21-16.27-183.01-15.03-244.58-23.4-293.37-39.9-192.85,66.36-414.87,150.88-105.69,40.23-331.15-1.64-861.68,116.63v64.26h1521.13V32.06Z"
            fill="#59907d"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* Distant hills - field-04 (back layer) */}
      <div data-parallax="0.1" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1521.13 548.51"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M1521.13,83.82c-287.37-130.1-163.41-105.55-576.53,51.43C658.68,243.91,760.57-158.18,0,303.28v245.22h1521.13V83.82Z"
            fill="#d5e2bd"
          />
        </svg>
      </div>

      {/* Mid hills - field-03 */}
      <div data-parallax="0.2" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1521.13 582.75"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M1521.13,330.46c-287.37-118.1-127.83-106.38-549.45-43.28C672.55,331.96,392.02-97.03,0,20.45v562.3h1521.13v-252.28Z"
            fill="#bcd5b4"
          />
        </svg>
      </div>

      {/* Mid-front hills - field-02 */}
      <div data-parallax="0.25" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1521.13 458.38"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M1521.13,76.94c-168.1-60.3-347.63,32.22-614.29,129.15S333.94-32.2,0,2.54v455.85h1521.13V76.94Z"
            fill="#8ab69b"
          />
        </svg>
      </div>

      {/* Foreground hills - field-01 (tallest, includes sheep) */}
      <div data-parallax="0.3" className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1521.13 342.05"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M1521.13,342.05H0v-201.91c722.04,5.28,714.33-228.71,1101.38-102.96,291.98,94.86,227.99,35.07,419.75,25.17v279.71Z"
            fill="#59907d"
          />
          {/* Sheep illustration */}
          <path
            d="M1169.28,91.68c7.69,9.1,2.35,19.34-.99,28.97,6.6-6.03,14.32-8.11,23.23-6.75,3.76.57,4.79,2.61,7.74,3.76.04.32,0,.68,0,1-.25,10.36-13.07,14.79-21.98,14.99-.97.86,6.63,7.48,7.99,8.99l2.98,9.5c1.04,6.74-.99,11.15-8.36,10.44-4.79-.46-8.04-4.44-12.61-4.95-1.27-1.42-2.96-4.25-4-5.99-.9-1.5-.58-5.48-4-4.99,2.65,7.3-.66,15.55-4,21.97-.5.97-.25,2.71-1.24,3.74-.4.41-5.71,2.89-6.48,3.04-13.33,2.71-8.36-16.83-5.26-23.77.54-.23,6.8-5.93,2.51-5.99l-1.53,2.98-1.97-1.98c-3.42,5.54-13.67,10.33-20.51,10.08-3.38-.13-5.3-2-8.48-2.09-.86-2.5-.88-4.43-1-6.99-.03-.66.03-1.33,0-2,1.3-.32,2.07-1.13,3-2,.34-.32.66-.67,1-1,7.12-6.94,10.27-7.9,18.99-11.99.84-.39,3.01-.87,3.01-1.5-.51-.85-2.03-.96-3.01-1.5.54-2.24-1.27-2.32-3-3-1.18-1.32-1.27-1.81-3-3-3.72-6.42-8.12-13.16-7.99-20.98,6.07-2.36,16.73.83,21.92,4.56,3.66,2.63,5.07,7.47,9.05,8.42.53-9.28,4.85-30.3,17.99-21.97ZM1153.29,127.64c-.35.13-1.18-.35-1.75.22-2.91,2.95-2.08,8.75,1.44,10.82,6.26,3.69,15.01-2.11,11.3-9.05-2.3-4.3-6.83-3.61-10.99-2Z"
            fill="#fff"
          />
          <path
            d="M1064.35,139.63c.4-8.03,3.5-14.21,7.02-21.23,5.91-7.28,6.2-4.67,10.13,2.58,2.66,4.9,4.83,10.46,6.83,15.65v5c0,1.66.04,3.33,0,5s.19,3.47,0,5c-.05.36-1.66,1.49-.99,2.99,4.8-.44,8.62.12,12.99,2,1.16,2.14,4.29,3.28,3.03,7.98.32.07.65-.04.97,0,.23-.73-.19-2.09,0-3,.66.02,1.34-.06,2,0v3c-.65-.04-1.36.09-2,0-.44,1.39-.34,1.73-1.41,3.05-.37.45-8.66,6.52-9.36,6.87-2.79,1.37-16.19,6.15-19.15,6.62-9.43,1.48-16.27-2.86-23.05-9.03-5.87-5.35-13.26-16.15-7.86-23.86,2.52-3.6,5.41-2.5,8.87-1.62,2.47.62,5.6,1.97,7.99,3,1.2.51,2.52,2.86,4.99,1.99-1.18-3.92-1.2-7.93-1-11.98Z"
            fill="#256261"
          />
          <path
            d="M1167.25,129.11c.04,19.91-26.94,14.69-16.11-2.93,6.11-2.36,12.74-3.37,16.11,2.93Z"
            fill="#ffe000"
          />
        </svg>
      </div>

      {/* Animated clouds */}
      <div className="absolute inset-0 z-10">
        <Cloud delay={0} top="15%" speed={40} scale={1} />
        <Cloud delay={-20} top="25%" speed={50} scale={1.2} />
        <Cloud delay={-35} top="35%" speed={45} scale={0.8} />
        <Cloud delay={-10} top="45%" speed={55} scale={1.1} />
      </div>
    </div>
  );
}

// Cloud component using cloud.svg from public
function Cloud({ 
  delay, 
  top, 
  speed, 
  scale = 1
}: { 
  delay: number; 
  top: string; 
  speed: number; 
  scale?: number;
}) {
  const size = 120 * scale;
  return (
    <div
      className="absolute opacity-70"
      style={{
        top,
        left: "-10%",
        width: `${size}px`,
        height: `${size}px`,
        animation: `float-across ${speed}s linear ${delay}s infinite`,
        willChange: "transform",
      }}
    >
      <img src="/cloud.svg" alt="" className="w-full h-full drop-shadow-md" />
    </div>
  );
}
