'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SplashCursor = ({
  size = 20,
  color = '#84cc16',
  splashSize = 100,
  className = ''
}) => {
  const cursorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Initialize cursor position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Mouse move handler
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Update cursor position immediately
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
    };

    // Mouse click handler for splash effect
    const handleClick = (e) => {
      createSplash(e.clientX, e.clientY);
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted, splashSize, color]);

  // Create splash effect
  const createSplash = (x, y) => {
    // Main splash circle
    const splash = document.createElement('div');
    splash.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${splashSize}px;
      height: ${splashSize}px;
      background: ${color};
      border: 3px solid ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.7;
    `;
    
    document.body.appendChild(splash);
    
    // Animate main splash
    gsap.timeline({
      onComplete: () => {
        if (document.body.contains(splash)) {
          document.body.removeChild(splash);
        }
      }
    })
    .to(splash, {
      scale: 1,
      opacity: 0.5,
      duration: 0.2,
      ease: 'power2.out'
    })
    .to(splash, {
      scale: 2,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Create particles
    for (let i = 0; i < 8; i++) {
      createParticle(x, y, i);
    }

    // Create ripple effect
    createRipple(x, y);
  };

  // Create individual particles
  const createParticle = (x, y, index) => {
    const particle = document.createElement('div');
    const angle = (index * 45) * Math.PI / 180;
    const distance = 50 + Math.random() * 40;
    
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 8px;
      height: 8px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(particle);
    
    gsap.to(particle, {
      x: x + Math.cos(angle) * distance,
      y: y + Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }
    });
  };

  // Create ripple effect
  const createRipple = (x, y) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${splashSize * 1.5}px;
      height: ${splashSize * 1.5}px;
      border: 2px solid ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.6;
      background: transparent;
    `;
    
    document.body.appendChild(ripple);
    
    gsap.timeline({
      onComplete: () => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }
    })
    .to(ripple, {
      scale: 1,
      opacity: 0.3,
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(ripple, {
      scale: 1.8,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
  };

  if (!mounted) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          zIndex: 999999,
          opacity: 0.8,
          boxShadow: `0 0 20px ${color}80`
        }}
      />
    </>
  );
};

export default SplashCursor;