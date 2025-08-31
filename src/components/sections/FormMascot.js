import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FormMascot({ focusedField }) {
  const mascotRef = useRef(null);
  const eyesRef = useRef(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    const eyes = eyesRef.current;
    
    if (!mascot || !eyes) return;

    // Reset animation
    gsap.set(mascot, { rotation: 0, x: 0 });
    gsap.set(eyes, { opacity: 1 });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Animate based on focused field
    switch (focusedField) {
      case 'name':
        gsap.to(mascot, { 
          rotation: -5, 
          x: 10, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        break;
      case 'email':
        gsap.to(mascot, { 
          rotation: 5, 
          x: -10, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        break;
      case 'password':
        gsap.to(eyes, { 
          opacity: 0, 
          duration: 0.2 
        });
        break;
      case 'dob':
        gsap.to(mascot, { 
          rotation: -3, 
          x: 8, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        break;
      case 'country':
        gsap.to(mascot, { 
          rotation: 3, 
          x: -8, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        break;
      default:
        gsap.to(mascot, { 
          rotation: 0, 
          x: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(eyes, { 
          opacity: 1, 
          duration: 0.2 
        });
    }
  }, [focusedField]);

  return (
    <div className="hidden lg:flex items-center justify-center">
      <div className="relative">
        <svg
          ref={mascotRef}
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="transform-gpu"
          style={{ transformOrigin: 'center' }}
        >
          {/* Mascot Body */}
          <circle
            cx="120"
            cy="140"
            r="80"
            fill="#15C26B"
            className="drop-shadow-lg"
          />
          
          {/* Mascot Head */}
          <circle
            cx="120"
            cy="80"
            r="50"
            fill="#15C26B"
            className="drop-shadow-lg"
          />
          
          {/* Eyes */}
          <g ref={eyesRef}>
            <circle cx="105" cy="75" r="8" fill="white" />
            <circle cx="135" cy="75" r="8" fill="white" />
            <circle cx="105" cy="75" r="4" fill="#0F1413" />
            <circle cx="135" cy="75" r="4" fill="#0F1413" />
          </g>
          
          {/* Smile */}
          <path
            d="M 100 90 Q 120 105 140 90"
            stroke="#0F1413"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Arms */}
          <circle cx="70" cy="120" r="20" fill="#15C26B" className="drop-shadow-md" />
          <circle cx="170" cy="120" r="20" fill="#15C26B" className="drop-shadow-md" />
          
          {/* Money symbol */}
          <text
            x="120"
            y="150"
            textAnchor="middle"
            className="text-2xl font-bold fill-white"
          >
            $
          </text>
        </svg>
        
        {/* Floating money icons */}
        <div className="absolute -top-2 -right-2 animate-bounce">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900">
            ₹
          </div>
        </div>
        
        <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
          <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-green-900">
            $
          </div>
        </div>
      </div>
    </div>
  );
}
