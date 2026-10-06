import React, { useState, useRef } from 'react';
import { useReducedMotion } from '@hooks/useReducedMotion';

export const HeroRightAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  // When video 1 ends, instantly transition to video 2 and play it
  const handleVideo1Ended = () => {
    setActiveVideo(2);
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  };

  // When video 2 ends, loop back to video 1
  const handleVideo2Ended = () => {
    setActiveVideo(1);
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  };

  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-surface/10 rounded-[2rem] border border-white/5">
        <span className="text-white/40 font-mono text-sm">Animation Disabled</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[550px] flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] pointer-events-none -z-10 rounded-full" />
      
      {/* Container for videos to ensure they fill the space nicely */}
      <div className="relative w-full h-[90%] max-w-[600px] aspect-square sm:aspect-auto rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,166,255,0.15)] bg-black/40 backdrop-blur-md">
        
        {/* Video 1: tarajbranding.mp4 (Plays first) */}
        <video
          ref={video1Ref}
          src="/tarajbranding.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideo1Ended}
          // We keep it in the DOM but hide it instantly when done to prevent flashes
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />

        {/* Video 2: taraj_branding.mp4 (Plays second and loops back to first) */}
        <video
          ref={video2Ref}
          src="/taraj_branding.mp4"
          muted
          playsInline
          onEnded={handleVideo2Ended}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      </div>
    </div>
  );
};

export default HeroRightAnimation;
