import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, Zap, Target, MousePointer2 } from 'lucide-react';
import { useReducedMotion } from '@hooks/useReducedMotion';

export const HeroRightAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  
  // Interactive Engine State
  const [isEngineHovered, setIsEngineHovered] = useState(false);
  const [activeChartBar, setActiveChartBar] = useState(null);

  // 3D Parallax Tilt Effect
  const x = useMotionValue(200);
  const y = useMotionValue(250);
  const rotateX = useTransform(y, [0, 500], [8, -8]);
  const rotateY = useTransform(x, [0, 400], [-8, 8]);

  function handleMouseMove(event) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(250);
  }

  // Meaningful Data Tags instead of abstract dots
  const particles = [
    { id: 1, startX: '12%', isGood: false, delay: 0, duration: 3.2, label: "Spam Bot" },
    { id: 2, startX: '45%', isGood: true, delay: 1.0, duration: 4.5, label: "Tech CEO" },
    { id: 3, startX: '75%', isGood: false, delay: 1.8, duration: 3.0, label: "No Budget" },
    { id: 4, startX: '28%', isGood: false, delay: 2.7, duration: 3.3, label: "Wrong Industry" },
    { id: 5, startX: '55%', isGood: true, delay: 3.8, duration: 4.8, label: "VP Sales" },
    { id: 6, startX: '85%', isGood: false, delay: 4.6, duration: 3.1, label: "Fake Email" },
    { id: 7, startX: '18%', isGood: false, delay: 5.5, duration: 3.4, label: "Student" },
    { id: 8, startX: '65%', isGood: true, delay: 6.5, duration: 4.6, label: "Marketing Dir." },
    { id: 9, startX: '35%', isGood: false, delay: 7.4, duration: 3.2, label: "Low Intent" },
    { id: 10, startX: '50%', isGood: true, delay: 8.5, duration: 4.7, label: "Founder" },
  ];

  // Dummy data for interactive pipeline chart
  const pipelineData = [
    { value: '30%', tooltip: 'Meeting Booked' },
    { value: '50%', tooltip: 'Proposal Sent' },
    { value: '70%', tooltip: 'Negotiation' },
    { value: '90%', tooltip: 'Deal Closed!' }
  ];

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative min-h-[580px] px-2 sm:px-4 mt-8 xl:mt-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      
      {/* Ambient Core Glows */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] z-0 transition-colors duration-500 ${isEngineHovered ? 'bg-amber-500/30 animate-pulse' : 'bg-primary/10'}`} />

      {/* Main Interactive 3D Container */}
      <motion.div 
        className="relative w-full max-w-[420px] h-[580px] z-10 flex flex-col items-center"
        style={prefersReducedMotion ? {} : { rotateX, rotateY }}
      >
        
        {/* Floating "Interact" Hint */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute -top-12 sm:-top-8 -right-4 sm:-right-10 flex items-center gap-2 bg-primary/20 border border-primary/50 text-primary px-3 py-1.5 rounded-full backdrop-blur-md z-30 pointer-events-none"
        >
          <MousePointer2 size={14} className="animate-bounce" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Hover to play</span>
        </motion.div>

        {/* TOP: Unqualified Market */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 w-full z-20 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Phase 1: Acquisition</span>
            <div className="flex items-center gap-2 text-text-secondary bg-[#0a0a0a]/80 px-5 py-2 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-white">Mass Market Traffic</span>
            </div>
          </div>
        </div>

        {/* THE FUNNEL SVG */}
        <svg viewBox="0 0 240 380" className="absolute top-8 inset-x-0 w-full h-[400px] pointer-events-none overflow-visible">
          <defs>
            <linearGradient id="funnelFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="funnelGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={isEngineHovered ? "1" : "0.3"} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={isEngineHovered ? "1" : "0.3"} />
            </linearGradient>
          </defs>
          <path d="M 10 20 L 230 20 L 150 200 L 150 360 L 90 360 L 90 200 Z" fill="rgba(255,255,255,0.01)" />
          <path 
            d="M 10 20 L 230 20 L 150 200 L 150 360 L 90 360 L 90 200 Z" 
            fill="url(#funnelFront)" 
            stroke="url(#funnelGlow)" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
            className="transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,166,255,0.2)]"
          />
        </svg>

        {/* MIDDLE: INTERACTIVE TARAJ DATA SCANNER */}
        <motion.div 
          className="absolute top-[180px] sm:top-[190px] left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] h-[72px] bg-[#050505]/95 border shadow-[0_0_40px_rgba(0,166,255,0.3)] rounded-2xl flex flex-col items-center justify-center backdrop-blur-xl z-20 overflow-hidden cursor-pointer transition-all duration-300"
          animate={{
            scale: isEngineHovered ? 1.1 : 1,
            borderColor: isEngineHovered ? '#fbbf24' : '#00a6ff',
            boxShadow: isEngineHovered ? '0 0 60px rgba(251,191,36,0.6)' : '0 0 40px rgba(0,166,255,0.3)'
          }}
          onMouseEnter={() => setIsEngineHovered(true)}
          onMouseLeave={() => setIsEngineHovered(false)}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className={`absolute top-0 bottom-0 w-[200%] bg-gradient-to-b from-transparent to-transparent ${isEngineHovered ? 'via-amber-500/40' : 'via-primary/20'}`}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: isEngineHovered ? 0.5 : 1.5, ease: "linear" }}
          />
          <div className="flex flex-col items-center justify-center relative z-10 w-full pt-1">
            <span className={`text-[8px] font-bold uppercase tracking-widest mb-0.5 ${isEngineHovered ? 'text-amber-200' : 'text-text-muted'}`}>Phase 2: Qualification</span>
            <div className="flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-lg border border-white/5">
              <Zap size={14} className={`${isEngineHovered ? 'text-amber-400 fill-amber-400' : 'text-primary fill-primary'} animate-pulse`} />
              <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase text-shadow-glow ${isEngineHovered ? 'text-amber-400' : 'text-white'}`}>
                Taraj AI Scanner
              </span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.span 
              key={isEngineHovered ? 'analyzing' : 'qualifying'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-[9px] sm:text-[10px] font-mono uppercase relative z-10 mt-1 ${isEngineHovered ? 'text-amber-300' : 'text-primary/80'}`}
            >
              {isEngineHovered ? 'Scanning Intent Data...' : 'Hover to Boost Engine'}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Falling Data Cards Simulation */}
        <div className="absolute top-10 inset-x-0 w-full h-[400px] z-10 pointer-events-none">
          {particles.map((p) => {
            const fallKeyframes = p.isGood ? ['0%', '42%', '100%'] : ['0%', '42%', '45%'];
            const opacityKeyframes = p.isGood ? [0, 1, 1, 0] : [0, 1, 0, 0];
            const scaleKeyframes = p.isGood ? [0.8, 1, 1, 0] : [0.8, 1, 0.5, 0];
            
            const currentDuration = isEngineHovered ? p.duration * 0.6 : p.duration;

            return (
              <motion.div
                key={p.id}
                className="absolute flex items-center justify-center pointer-events-auto -ml-10"
                style={{ left: p.startX }}
                animate={prefersReducedMotion ? {} : {
                  top: fallKeyframes,
                  opacity: opacityKeyframes,
                  scale: scaleKeyframes,
                }}
                transition={{
                  duration: currentDuration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                  times: p.isGood ? [0, 0.45, 0.9, 1] : [0, 0.8, 1]
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
              >
                {/* Meaningful Data Card instead of a dot */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-lg backdrop-blur-md cursor-pointer ${
                  p.isGood 
                    ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] text-amber-400' 
                    : 'bg-surface/80 border-text-muted/30 shadow-[0_0_10px_rgba(0,0,0,0.5)] text-text-muted'
                }`}>
                  {p.isGood ? <CheckCircle2 size={12} /> : <ShieldAlert size={12} />}
                  <span className="text-[10px] sm:text-[11px] font-bold whitespace-nowrap tracking-wide">{p.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM: INTERACTIVE Sales Pipeline */}
        <div className="absolute bottom-4 w-full flex flex-col items-center z-30">
          
          <div className="w-[80%] max-w-[280px] h-[100px] bg-gradient-to-t from-surface to-transparent border-b-0 rounded-t-3xl border border-white/10 flex items-end justify-between px-6 pb-2 relative overflow-visible backdrop-blur-md shadow-[0_-20px_40px_-20px_rgba(251,191,36,0.15)]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_20px]" pointer-events-none="true" />
            
            {/* Interactive Bars representing Sales Stages */}
            {pipelineData.map((data, idx) => (
              <div 
                key={idx} 
                className="relative w-8 group cursor-pointer h-full flex items-end justify-center z-20"
                onMouseEnter={() => setActiveChartBar(idx)}
                onMouseLeave={() => setActiveChartBar(null)}
              >
                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {activeChartBar === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.8 }}
                      className="absolute -top-10 bg-[#111] border border-amber-400/50 text-amber-400 text-[10px] font-bold px-3 py-1.5 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
                    >
                      {data.tooltip}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The Bar */}
                <motion.div 
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    idx === 3 
                      ? 'bg-gradient-to-t from-amber-400 to-amber-300 border-t-2 border-white shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                      : 'bg-gradient-to-t from-amber-500/20 to-amber-500/60 border-t border-amber-400/50'
                  }`} 
                  animate={{ height: activeChartBar === idx ? '100%' : data.value }} 
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {idx === 3 && <Target size={16} className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-400" />}
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="w-[90%] max-w-[320px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-px rounded-xl shadow-[0_10px_30px_-10px_rgba(251,191,36,0.5)] cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="bg-[#050505] rounded-xl py-2 px-6 flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-widest mb-0.5">Phase 3: Sales Pipeline</span>
              <span className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 uppercase tracking-widest leading-tight">
                High-Intent Deals Only
              </span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
