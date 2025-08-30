'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const MagicBento = ({
  children,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",
  className = ""
}) => {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles for stars effect
    if (enableStars) {
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(${glowColor}, 0.8);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        `;
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        container.appendChild(particle);

        // Animate particles
        gsap.to(particle, {
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    }

    // Mouse move handler for effects
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Tilt effect
      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        gsap.to(container, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000
        });
      }

      // Magnetism effect
      if (enableMagnetism) {
        const strength = 0.3;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * strength;
        const deltaY = (y - centerY) * strength;
        
        gsap.to(container, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Spotlight effect
      if (enableSpotlight && spotlightRef.current) {
        gsap.set(spotlightRef.current, {
          x: x - spotlightRadius / 2,
          y: y - spotlightRadius / 2,
        });
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setIsHovered(false);
      
      if (enableTilt) {
        gsap.to(container, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }

      if (enableMagnetism) {
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    // Mouse enter handler
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    // Click effect
    const handleClick = (e) => {
      if (!clickEffect) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: rgba(${glowColor}, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10;
      `;
      
      container.appendChild(ripple);
      
      gsap.to(ripple, {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          container.removeChild(ripple);
        }
      });

      // Scale effect
      gsap.to(container, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('click', handleClick);
    };
  }, [enableTilt, enableMagnetism, enableSpotlight, clickEffect, spotlightRadius, particleCount, glowColor]);

  return (
    <div 
      ref={containerRef}
      className={`magic-bento relative overflow-hidden cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Border Glow Effect */}
      {enableBorderGlow && (
        <div 
          className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, rgba(${glowColor}, 0.5), transparent, rgba(${glowColor}, 0.5))`,
            padding: '1px',
            zIndex: 0,
            opacity: isHovered ? 1 : 0
          }}
        >
          <div className="w-full h-full bg-inherit rounded-inherit" />
        </div>
      )}

      {/* Spotlight Effect */}
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          className="absolute opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            width: `${spotlightRadius}px`,
            height: `${spotlightRadius}px`,
            background: `radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: isHovered ? 1 : 0,
            zIndex: 1
          }}
        />
      )}

      {/* Content */}
      <div 
        className={`relative z-10 h-full transition-opacity duration-300 ${
          textAutoHide && isHovered ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MagicBento;