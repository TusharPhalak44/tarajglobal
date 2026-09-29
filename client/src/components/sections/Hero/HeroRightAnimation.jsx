import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, RefreshCw, Filter, Target, Database, Play, Activity, TrendingDown, Users, AlertCircle, Mail, XCircle, Crosshair } from 'lucide-react';
import { useReducedMotion } from '@hooks/useReducedMotion';

// Realistic Character Video Component
const SceneGrowthStalled = ({ isActive }) => {
  const pipelineStages = [
    { name: 'LEADS', count: '1,240' },
    { name: 'QUALIFIED', count: '312' },
    { name: 'MEETINGS', count: '38' },
    { name: 'OPPS', count: '6' },
    { name: 'REVENUE', count: '1' }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-2 sm:px-6">

      {/* Background Pipeline Visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Base Track */}
        <div className="w-[85%] max-w-[420px] h-[1px] bg-white/5 absolute top-1/2 -translate-y-1/2" />

        {/* Leakage Tracks (going down) */}
        <div className="w-[85%] max-w-[420px] absolute top-1/2 flex justify-between px-[10%]">
          <div className="w-[1px] h-[40px] bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="w-[1px] h-[30px] bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="w-[1px] h-[20px] bg-gradient-to-b from-amber-500/20 to-transparent" />
        </div>

        <div className="w-[85%] max-w-[420px] flex justify-between absolute top-1/2 -translate-y-1/2 z-10">
          {pipelineStages.map((stage, i) => (
            <div key={i} className="flex flex-col items-center relative">
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${i === 0 ? 'bg-primary shadow-[0_0_8px_#00A6FF]' : 'bg-white/20'} z-10 transition-colors`} />
              <div className="absolute -bottom-6 sm:-bottom-7 text-[7px] sm:text-[9px] text-white/40 font-mono text-center whitespace-nowrap">
                {stage.name}<br />
                <span className={i === 4 ? "text-red-400 font-bold" : "text-white/60"}>{stage.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Particles */}
        {isActive && (
          <div className="absolute w-[85%] max-w-[420px] h-[60px] top-1/2 -translate-y-1/2">
            {/* Successful particle (rare) */}
            <motion.div
              className="absolute top-[29px] left-0 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#00A6FF]"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 4, ease: 'linear', repeat: Infinity, delay: 1 }}
            />
            {/* Leaking particle 1 */}
            <motion.div
              className="absolute top-[29px] left-0 w-1 h-1 bg-red-400 rounded-full"
              animate={{ left: ['0%', '25%', '25%'], top: ['29px', '29px', '60px'], opacity: [1, 1, 0] }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
            />
            {/* Leaking particle 2 */}
            <motion.div
              className="absolute top-[29px] left-0 w-1 h-1 bg-amber-400 rounded-full"
              animate={{ left: ['0%', '50%', '50%'], top: ['29px', '29px', '50px'], opacity: [1, 1, 0] }}
              transition={{ duration: 2.5, ease: 'linear', repeat: Infinity, delay: 0.7 }}
            />
            {/* Leaking particle 3 */}
            <motion.div
              className="absolute top-[29px] left-0 w-1 h-1 bg-red-500 rounded-full"
              animate={{ left: ['0%', '75%', '75%'], top: ['29px', '29px', '45px'], opacity: [1, 1, 0] }}
              transition={{ duration: 3, ease: 'linear', repeat: Infinity, delay: 1.5 }}
            />
          </div>
        )}
      </div>

      {/* Active Problem Indicators */}
      <div className="w-full h-full relative z-20">

        {/* Low Pipeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[5%] sm:top-[10%] left-[2%] sm:left-[5%] bg-[#0a0a0a]/90 border border-red-500/30 p-2 sm:p-2.5 rounded-lg flex items-center gap-2 sm:gap-3 backdrop-blur-md w-[140px] sm:w-[160px] shadow-lg shadow-red-500/5"
        >
          <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-md text-red-400">
            <TrendingDown size={14} className={isActive ? "animate-pulse" : ""} />
          </div>
          <div>
            <div className="text-[9px] sm:text-[11px] font-bold text-red-400 uppercase tracking-tight">Low Pipeline</div>
            <div className="text-[7px] sm:text-[8px] text-white/50 uppercase tracking-wider">Volume dropping</div>
          </div>
        </motion.div>

        {/* Poor Lead Quality */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
          transition={{ delay: 0.6 }}
          className="absolute top-[35%] right-[2%] sm:right-[5%] bg-[#0a0a0a]/90 border border-red-500/30 p-2 sm:p-2.5 rounded-lg flex items-center gap-2 sm:gap-3 backdrop-blur-md w-[145px] sm:w-[170px] shadow-lg shadow-red-500/5"
        >
          <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 relative overflow-hidden">
            <Users size={14} />
            {isActive && <motion.div animate={{ x: [-10, 25], y: [-10, 25] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} className="absolute w-[1px] h-[150%] bg-red-500/50 rotate-45 top-0 left-0" />}
          </div>
          <div>
            <div className="text-[9px] sm:text-[11px] font-bold text-red-400 uppercase tracking-tight">Poor Quality</div>
            <div className="text-[7px] sm:text-[8px] text-white/50 uppercase tracking-wider">High rejection rate</div>
          </div>
        </motion.div>

        {/* Unpredictable Demand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.9 }}
          className="absolute bottom-[10%] sm:bottom-[15%] left-[25%] sm:left-[30%] bg-[#0a0a0a]/90 border border-amber-500/30 p-2 sm:p-2.5 rounded-lg flex items-center gap-2 sm:gap-3 backdrop-blur-md w-[150px] sm:w-[175px] shadow-lg shadow-amber-500/5"
        >
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-400">
            <motion.div animate={{ y: [-1, 1, -1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Activity size={14} />
            </motion.div>
          </div>
          <div>
            <div className="text-[9px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-tight">Unpredictable</div>
            <div className="text-[7px] sm:text-[8px] text-white/50 uppercase tracking-wider">Erratic demand</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const SceneInHouseAttempt = ({ isActive }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative px-2 sm:px-6">

      {/* Background Grid/Dashboard environment */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-80 z-10">

        {/* Panel 1: Lead Database */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }} transition={{ delay: 0.2 }}
          className="absolute top-[5%] sm:top-[10%] left-[2%] w-[130px] sm:w-[150px] bg-[#050505]/90 border border-white/10 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm shadow-xl"
        >
          <div className="text-[7px] sm:text-[8px] text-white/40 mb-1.5 flex items-center gap-1 uppercase tracking-widest"><Database size={10} /> Lead Database</div>
          <div className="text-[10px] sm:text-xs font-bold text-white mb-2 tracking-wide">1,240 CONTACTS</div>
          <div className="flex flex-col gap-1 text-[7px] sm:text-[8px] text-white/40 uppercase tracking-wider">
            <div className="flex justify-between"><span>Company</span><span className="text-white/70">TechCorp</span></div>
            <div className="flex justify-between"><span>Industry</span><span className="text-white/70">Software</span></div>
            <div className="flex justify-between"><span>Revenue</span><span className="text-white/70">$50M+</span></div>
            <div className="flex justify-between"><span>Location</span><span className="text-white/70">NY, USA</span></div>
            <div className="flex justify-between"><span>Seniority</span><span className="text-white/70">Director</span></div>
          </div>
        </motion.div>

        {/* Panel 2: ICP Filter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }} transition={{ delay: 0.4 }}
          className="absolute top-[45%] sm:top-[50%] left-[2%] w-[130px] sm:w-[150px] bg-[#050505]/90 border border-white/10 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm shadow-xl"
        >
          <div className="text-[7px] sm:text-[8px] text-white/40 mb-1.5 flex items-center gap-1 uppercase tracking-widest"><Filter size={10} /> ICP Filter</div>
          <div className="flex flex-col gap-1 text-[7px] sm:text-[8px] text-white/50 uppercase tracking-wider">
            <div className="flex justify-between"><span>Industry</span><span className="text-emerald-500 font-bold">✓</span></div>
            <div className="flex justify-between"><span>Company Size</span><span className="text-emerald-500 font-bold">✓</span></div>
            <div className="flex justify-between"><span>Revenue</span><span className="text-emerald-500 font-bold">✓</span></div>
            <div className="flex justify-between"><span>Seniority</span><span className="text-amber-500 font-bold">?</span></div>
            <div className="flex justify-between"><span>Intent</span><span className="text-red-500 font-bold">✗</span></div>
          </div>
        </motion.div>

        {/* Panel 3: Outreach */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }} transition={{ delay: 0.6 }}
          className="absolute top-[5%] sm:top-[10%] left-[40%] sm:left-[45%] w-[100px] sm:w-[120px] bg-[#050505]/90 border border-white/10 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm shadow-xl"
        >
          <div className="text-[7px] sm:text-[8px] text-white/40 mb-1.5 flex items-center gap-1 uppercase tracking-widest"><Mail size={10} /> Outreach</div>
          <div className="flex flex-col gap-1 text-[7px] sm:text-[8px] text-white/50 uppercase tracking-wider">
            <div className="bg-white/5 p-1 rounded">Email 01</div>
            <div className="bg-white/5 p-1 rounded">Email 02</div>
            <div className="bg-white/5 p-1 rounded">LinkedIn</div>
            <div className="bg-white/5 p-1 rounded text-white/30">Follow-up</div>
          </div>
        </motion.div>

        {/* Data Particles flowing left to right, filtering down */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {/* 1. Main stream coming from left */}
            <motion.div className="absolute top-[20%] left-[25%] w-1 h-1 bg-white/40 rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.div className="absolute top-[25%] left-[25%] w-1 h-1 bg-white/40 rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
            <motion.div className="absolute top-[30%] left-[25%] w-1 h-1 bg-white/40 rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />

            {/* Rejected Particles diverging downwards */}
            <motion.div className="absolute top-[25%] left-[30%] w-1 h-1 bg-red-500 rounded-full" animate={{ left: [0, 40, 80], top: [0, 60, 120], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
            <motion.div className="absolute top-[35%] left-[32%] w-1 h-1 bg-red-500 rounded-full" animate={{ left: [0, 30, 70], top: [0, 50, 100], opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }} />

            {/* Rejection Labels */}
            <motion.div className="absolute top-[45%] left-[35%] text-[7px] text-red-500 font-bold uppercase tracking-wider" animate={{ opacity: [0, 1, 0], top: [0, 10] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>Wrong Industry</motion.div>
            <motion.div className="absolute top-[55%] left-[38%] text-[7px] text-red-500 font-bold uppercase tracking-wider" animate={{ opacity: [0, 1, 0], top: [0, 10] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}>Too Junior</motion.div>

            {/* Middle stream (after ICP) */}
            <motion.div className="absolute top-[20%] left-[40%] w-1 h-1 bg-amber-500/60 rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
            <motion.div className="absolute top-[28%] left-[40%] w-1 h-1 bg-amber-500/60 rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />

            {/* Final stream (Meetings/Opps) */}
            <motion.div className="absolute top-[25%] left-[60%] w-1.5 h-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] rounded-full" animate={{ left: [0, 80], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }} />

            {/* Further rejections from Outreach */}
            <motion.div className="absolute top-[30%] left-[55%] w-1 h-1 bg-red-500 rounded-full" animate={{ left: [0, 30, 60], top: [0, 40, 80], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.1 }} />
            <motion.div className="absolute top-[40%] left-[60%] text-[7px] text-red-500 font-bold uppercase tracking-wider" animate={{ opacity: [0, 1, 0], top: [0, 10] }} transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}>No Buying Intent</motion.div>

            {/* Stray particle wandering off to the right (to Scene 3) */}
            <motion.div className="absolute top-[40%] left-[60%] w-1 h-1 bg-white/20 rounded-full" animate={{ left: [0, 200], opacity: [0, 1, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 2.5 }} />
          </div>
        )}
      </div>

      {/* Top Right Metric Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }} transition={{ delay: 1 }}
        className="absolute top-[5%] sm:top-[10%] right-[2%] w-[130px] sm:w-[160px] bg-[#0a0a0a]/95 border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md z-30"
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[9px] sm:text-xs"><span className="text-white/60">Generated</span><span className="text-white font-bold">1,240</span></div>
          <div className="flex justify-between text-[9px] sm:text-xs"><span className="text-white/60">Valid</span><span className="text-white/80 font-bold">682</span></div>
          <div className="flex justify-between text-[9px] sm:text-xs"><span className="text-white/60">Targetable</span><span className="text-white/90 font-bold">312</span></div>
          <div className="w-full h-[1px] bg-white/10 my-0.5" />
          <div className="flex justify-between text-[9px] sm:text-xs"><span className="text-white/60">Qualified</span><span className="text-amber-400 font-bold">38</span></div>
          <div className="flex justify-between text-[9px] sm:text-xs"><span className="text-white/60">Meetings</span><span className="text-amber-500 font-bold">6</span></div>
          <div className="flex justify-between text-[9px] sm:text-xs border-t border-white/10 pt-1.5 mt-0.5"><span className="text-white/60">Closed</span><span className="text-red-500 font-black">1</span></div>
        </div>
      </motion.div>

    </div>
  );
};

const SceneTarajSolution = ({ isActive }) => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (isActive) {
      let step = 0;
      const interval = setInterval(() => {
        step = (step + 1) % 6;
        setActiveStage(step);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const capabilities = [
    { title: "ICP CALIBRATION", desc: "Identify key accounts.", icon: <Target size={12} /> },
    { title: "BUYING INTENT", desc: "Find meaningful signals.", icon: <Activity size={12} /> },
    { title: "ACCOUNT TARGETING", desc: "Focus on high-value.", icon: <Crosshair size={12} /> },
    { title: "PERSONALIZED OUTREACH", desc: "Relevant messaging.", icon: <Mail size={12} /> },
    { title: "DEMAND GENERATION", desc: "Predictable pipeline.", icon: <TrendingDown size={12} /> }
  ];

  const funnelStages = [
    { label: "TARGET MARKET", num: "50,000+", width: "w-[220px]" },
    { label: "TARGET ACCOUNTS", num: "8,500", width: "w-[180px]" },
    { label: "ENGAGED ACCOUNTS", num: "2,400", width: "w-[140px]" },
    { label: "HIGH-INTENT LEADS", num: "620", width: "w-[100px]", highlight: "text-amber-500" },
    { label: "SALES OPPORTUNITIES", num: "150", width: "w-[70px]", highlight: "text-amber-500" },
    { label: "CLOSED DEALS", num: "42", width: "w-[50px]", highlight: "text-primary font-bold" }
  ];

  // Right Side progression
  const intentProgression = [
    { label: "Mass Market", color: "text-white/50" },
    { label: "Target Accounts", color: "text-white/70" },
    { label: "Engaged", color: "text-white/90" },
    { label: "High-Intent", color: "text-amber-500 font-bold" },
    { label: "Sales Opportunities", color: "text-amber-500 font-bold" }
  ];

  return (
    <div className="w-full h-full flex items-center justify-between relative px-2 sm:px-4 z-20">

      {/* LEFT SIDE: Capabilities */}
      <div className="flex flex-col gap-1.5 sm:gap-2 w-[140px] sm:w-[170px]">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
            transition={{ delay: i * 0.2 }}
            className={`bg-[#050505]/90 border p-1.5 sm:p-2 rounded-lg flex items-center gap-2 backdrop-blur-sm shadow-xl transition-all duration-300 ${activeStage === i || (activeStage === 5 && i === 4) ? 'border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(0,166,255,0.2)] scale-[1.02]' : 'border-white/10'}`}
          >
            <div className={`p-1 sm:p-1.5 rounded-md ${activeStage === i || (activeStage === 5 && i === 4) ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40'}`}>
              {cap.icon}
            </div>
            <div>
              <div className={`text-[7px] sm:text-[9px] font-bold uppercase tracking-wider ${activeStage === i || (activeStage === 5 && i === 4) ? 'text-primary' : 'text-white/70'}`}>{cap.title}</div>
              <div className="text-[6px] sm:text-[7px] text-white/40">{cap.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CENTER-RIGHT: Main Funnel */}
      <div className="absolute top-[5%] sm:top-[10%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 w-[240px]">
        {funnelStages.map((stage, i) => {
          const isStageActive = (activeStage === i) || (activeStage >= 5 && i >= 5);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -10 }}
              transition={{ delay: i * 0.15 + 0.5 }}
              className={`relative flex flex-col items-center justify-center p-1 sm:p-1.5 border rounded-md backdrop-blur-md transition-all duration-500 ${stage.width} ${isStageActive ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(0,166,255,0.15)] scale-[1.02]' : 'border-white/10 bg-[#050505]/60'}`}
            >
              <div className="flex justify-between w-full px-2 items-center">
                <span className="text-[6px] sm:text-[7px] text-white/50 uppercase tracking-widest">{stage.label}</span>
                <span className={`text-[8px] sm:text-[10px] ${stage.highlight || 'text-white font-bold'}`}>{stage.num}</span>
              </div>
              {i < funnelStages.length - 1 && (
                <div className="absolute -bottom-1.5 sm:-bottom-2 w-0.5 h-1.5 sm:h-2 bg-white/10" />
              )}
            </motion.div>
          )
        })}

        {/* Funnel Animation Particles */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Particles entering top */}
            <motion.div className="absolute top-[-15px] left-[50%] w-1 h-1 bg-white/40 rounded-full" animate={{ top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />
            <motion.div className="absolute top-[-15px] left-[45%] w-1 h-1 bg-white/40 rounded-full" animate={{ top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
            <motion.div className="absolute top-[-15px] left-[55%] w-1 h-1 bg-white/40 rounded-full" animate={{ top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />

            {/* Red particles rejected left and right */}
            <motion.div className="absolute top-[20%] left-[20%] w-0.5 h-0.5 bg-red-500 rounded-full" animate={{ x: [0, -30], top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
            <motion.div className="absolute top-[40%] right-[30%] w-0.5 h-0.5 bg-red-500 rounded-full" animate={{ left: [0, 30], top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />

            {/* Blue successful particles moving down */}
            <motion.div className="absolute top-[30%] left-[50%] w-1 h-1 bg-primary rounded-full" animate={{ top: [0, 40], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />

            {/* High Intent / Closed Deals becoming bright orange/cyan at bottom */}
            <motion.div className="absolute top-[70%] left-[50%] w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_8px_#FF8533]" animate={{ top: [0, 30], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
            <motion.div className="absolute top-[85%] left-[50%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#00A6FF]" animate={{ top: [0, 20], opacity: [0, 1, 1], scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />

            {/* Transition particle to Scene 5 */}
            <motion.div className="absolute top-[90%] left-[50%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#00A6FF]" animate={{ left: [0, 150], top: [0, 50], opacity: [0, 1, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Intent Progression */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
        transition={{ delay: 1 }}
        className="flex flex-col items-end gap-2 w-[100px] sm:w-[130px] relative mt-10"
      >
        {intentProgression.map((level, i) => (
          <div key={i} className="flex items-center gap-1.5 w-full justify-end">
            <div className={`text-[7px] sm:text-[9px] uppercase tracking-wider ${level.color}`}>{level.label}</div>
            <div className={`w-1 h-1 rounded-full z-10 ${i >= 3 ? 'bg-amber-500 shadow-[0_0_5px_#FF8533]' : 'bg-white/20'}`} />
          </div>
        ))}
        {/* Decorative connecting line */}
        <div className="absolute right-[1.5px] sm:right-[1.5px] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-white/10 via-amber-500/30 to-amber-500/80 z-0" />
      </motion.div>

    </div>
  );
};

const AnimatedNumber = ({ end, duration, isActive }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isActive) {
      // rough counter
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    } else {
      setValue(0);
    }
  }, [isActive, end, duration]);

  return <span>{value.toLocaleString()}</span>;
};

const SceneOptimization = ({ isActive }) => {
  const [engineStep, setEngineStep] = useState(-1);

  useEffect(() => {
    if (isActive) {
      const steps = setInterval(() => {
        setEngineStep(prev => (prev < 4 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(steps);
    } else {
      setEngineStep(-1);
    }
  }, [isActive]);

  const engineTasks = [
    "DATA ANALYZED",
    "ICP UPDATED",
    "MESSAGING FIXED",
    "TARGETING BETTER"
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative px-2 sm:px-6 z-20">

      {/* Background Data Streams */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Stream line from Top-Left to Center */}
        <div className="absolute top-[25%] left-[20%] w-[35%] h-[1px] bg-gradient-to-r from-primary/10 to-primary/50 rotate-[15deg] origin-left" />
        {/* Stream line from Center to Bottom-Right */}
        <div className="absolute top-[50%] left-[50%] w-[35%] h-[1px] bg-gradient-to-r from-emerald-500/50 to-emerald-500/10 rotate-[15deg] origin-left" />

        {/* Circular loop line */}
        <div className="absolute w-[80%] h-[70%] border border-white/5 rounded-[100%] border-dashed opacity-50" />
      </div>

      {/* Main Layout Container */}
      <div className="w-full flex justify-between items-center relative h-full">

        {/* LEFT: Initial Pipeline */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20, y: isActive ? 0 : -20 }}
          transition={{ delay: 0.3 }}
          className="w-[120px] sm:w-[150px] bg-[#050505]/95 border border-white/10 rounded-xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md self-start mt-6 sm:mt-10 relative z-20"
        >
          <div className="text-[7px] sm:text-[8px] text-white/50 uppercase tracking-widest text-center mb-0.5">INITIAL PIPELINE</div>
          <div className="text-[9px] sm:text-[10px] font-bold text-white text-center mb-2 bg-white/5 py-0.5 rounded">CAMPAIGN 01</div>

          <div className="flex flex-col gap-1 text-[8px] sm:text-[9px]">
            <div className="flex justify-between"><span className="text-white/60">Reached</span><span className="text-white font-bold">1,240</span></div>
            <div className="flex justify-between"><span className="text-white/60">Qualified</span><span className="text-white font-bold">312</span></div>
            <div className="flex justify-between"><span className="text-white/60">Intent</span><span className="text-primary font-bold">47</span></div>
          </div>
        </motion.div>

        {/* CENTER: Optimization Engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.6 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] sm:-translate-y-1/2 w-[160px] sm:w-[190px] bg-[#050505]/95 border border-primary/30 rounded-2xl p-3 sm:p-4 shadow-[0_0_30px_rgba(0,166,255,0.15)] backdrop-blur-xl z-30 flex flex-col items-center"
        >
          <RefreshCw size={18} className={`text-primary mb-2 ${engineStep >= 0 && engineStep < 4 ? 'animate-spin' : ''}`} />
          <div className="text-[8px] sm:text-[10px] font-black text-primary uppercase tracking-widest text-center mb-3">Optimization<br />Engine</div>

          <div className="flex flex-col gap-1.5 w-full">
            {engineTasks.map((task, i) => (
              <div key={i} className="flex items-center justify-between text-[7px] sm:text-[8px] font-bold uppercase tracking-wider">
                <span className={engineStep >= i ? 'text-white' : 'text-white/30'}>{task}</span>
                {engineStep >= i ? <CheckCircle2 size={10} className="text-emerald-400" /> : <div className="w-2.5 h-2.5 border border-white/20 rounded-full" />}
              </div>
            ))}
          </div>

          {/* Glowing pulses from engine */}
          {engineStep >= 0 && engineStep < 4 && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary/50 pointer-events-none"
              animate={{ opacity: [0, 1, 0], scale: [1, 1.05, 1.1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* RIGHT: Optimized Pipeline */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20, y: isActive ? 0 : 20 }}
          transition={{ delay: 3.5 }} // delay until engine completes
          className="w-[130px] sm:w-[160px] bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-2.5 sm:p-3 shadow-xl shadow-emerald-500/10 backdrop-blur-md self-end mb-16 sm:mb-20 relative z-20"
        >
          <div className="text-[7px] sm:text-[8px] text-emerald-400 uppercase tracking-widest text-center mb-0.5 font-bold">OPTIMIZED PIPELINE</div>
          <div className="text-[9px] sm:text-[10px] font-bold text-white text-center mb-2 bg-emerald-500/20 py-0.5 rounded">CAMPAIGN 02</div>

          <div className="flex flex-col gap-1 text-[8px] sm:text-[9px]">
            <div className="flex justify-between"><span className="text-white/60">Reached</span><span className="text-white font-bold">{isActive ? (engineStep >= 4 ? <AnimatedNumber end={1500} duration={1.5} isActive={isActive} /> : "1,240") : "1,240"}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Qualified</span><span className="text-white font-bold">{isActive ? (engineStep >= 4 ? <AnimatedNumber end={600} duration={1.5} isActive={isActive} /> : "312") : "312"}</span></div>
            <div className="flex justify-between"><span className="text-white/60">Intent</span><span className="text-emerald-400 font-bold">{isActive ? (engineStep >= 4 ? <AnimatedNumber end={150} duration={1.5} isActive={isActive} /> : "47") : "47"}</span></div>
          </div>
        </motion.div>

      </div>

      {/* Animated Data Particles / Labels */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top-Left to Center particles */}
          <motion.div className="absolute top-[26%] left-[20%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#00A6FF]" animate={{ left: [0, 80], top: [0, 30], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          <motion.div className="absolute top-[32%] left-[25%] text-[6px] sm:text-[7px] text-primary font-bold tracking-widest uppercase bg-[#050505] px-1 rounded border border-primary/20" animate={{ left: [0, 50], y: [0, 15], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>DATA</motion.div>

          <motion.div className="absolute top-[24%] left-[22%] w-1 h-1 bg-white rounded-full" animate={{ left: [0, 70], y: [0, 25], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1 }} />
          <motion.div className="absolute top-[28%] left-[28%] text-[6px] sm:text-[7px] text-white font-bold tracking-widest uppercase bg-[#050505] px-1 rounded border border-white/20" animate={{ left: [0, 40], top: [0, 10], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1 }}>SIGNAL</motion.div>

          {/* Center to Bottom-Right particles (start after engine) */}
          {engineStep >= 4 && (
            <>
              <motion.div className="absolute top-[55%] left-[55%] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#34d399]" animate={{ left: [0, 80], top: [0, 30], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.div className="absolute top-[58%] left-[58%] text-[6px] sm:text-[7px] text-emerald-400 font-bold tracking-widest uppercase bg-[#050505] px-1 rounded border border-emerald-500/20" animate={{ left: [0, 60], top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>ICP</motion.div>

              <motion.div className="absolute top-[60%] left-[52%] w-1 h-1 bg-white rounded-full" animate={{ left: [0, 90], y: [0, 35], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }} />
              <motion.div className="absolute top-[65%] left-[60%] text-[6px] sm:text-[7px] text-white font-bold tracking-widest uppercase bg-[#050505] px-1 rounded border border-white/20" animate={{ left: [0, 50], top: [0, 20], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}>MESSAGE</motion.div>
            </>
          )}

          {/* Transition to Scene 6 */}
          {engineStep >= 4 && (
            <motion.div className="absolute top-[75%] right-[20%] w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#34d399]" animate={{ left: [0, 100], opacity: [0, 1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          )}
        </div>
      )}

    </div>
  );
};

const SceneHighIntent = ({ isActive }) => {
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setActiveStage(prev => (prev < 4 ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setActiveStage(-1);
    }
  }, [isActive]);

  const pipelineStages = [
    { label: "TARGET ACCOUNTS", color: "border-primary/30 text-primary", activeColor: "bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,166,255,0.3)]", number: 850 },
    { label: "ENGAGED ACCOUNTS", color: "border-primary/50 text-primary", activeColor: "bg-primary/30 border-primary shadow-[0_0_15px_rgba(0,166,255,0.4)]", number: 240 },
    { label: "HIGH-INTENT LEADS", color: "border-amber-500/50 text-amber-500 font-bold", activeColor: "bg-amber-500/20 border-amber-500 shadow-[0_0_20px_rgba(255,133,51,0.5)]", number: 62 },
    { label: "SALES MEETINGS", color: "border-amber-500/80 text-amber-500 font-bold", activeColor: "bg-amber-500/30 border-amber-500 shadow-[0_0_20px_rgba(255,133,51,0.6)]", number: 15 },
    { label: "CLOSED DEALS", color: "border-white/50 text-white font-bold", activeColor: "bg-white/20 border-white shadow-[0_0_25px_rgba(255,255,255,0.8)] text-white", number: 4 }
  ];

  return (
    <div className="w-full h-full flex items-center justify-between relative px-2 sm:px-6 z-20">

      {/* Background Company Network */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          <path d="M 50 50 Q 100 20, 200 80 T 350 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 150 150 Q 250 200, 350 120 T 500 180" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M 80 200 Q 150 250, 300 220" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </svg>

        {/* Nodes */}
        {[
          { x: '10%', y: '15%', label: 'Company A' },
          { x: '45%', y: '25%', label: 'Company B', intent: true },
          { x: '35%', y: '50%', label: 'Company C' },
          { x: '75%', y: '12%', label: 'Company D', intent: true },
          { x: '65%', y: '60%', label: 'Company E', intent: true },
          { x: '20%', y: '70%', label: 'Company F' }
        ].map((node, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: node.x, top: node.y }}>
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${node.intent ? 'bg-amber-500 shadow-[0_0_8px_#FF8533]' : 'bg-white/30'}`}
              animate={node.intent ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span className={`text-[5px] sm:text-[6px] mt-1 ${node.intent ? 'text-amber-400 font-bold' : 'text-white/30'}`}>{node.label}</span>
          </div>
        ))}
      </div>

      {/* LEFT: Real-Time Insights Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
        transition={{ delay: 0.3 }}
        className="w-[130px] sm:w-[160px] bg-[#050505]/95 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md z-20 mt-[-20px] sm:mt-0"
      >
        <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
          <Database size={12} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-bold text-white uppercase tracking-wider leading-tight">Real-Time</span>
            <span className="text-[7px] sm:text-[8px] text-primary uppercase tracking-widest leading-tight">Insights</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {["Intent Signals", "Account Activity", "Campaign Perf.", "Optimization"].map((item, i) => (
            <div key={i} className="flex justify-between items-center relative">
              <span className="text-[7px] sm:text-[9px] text-white/80">{item}</span>
              <div className="flex items-center gap-1.5">
                {/* Tiny signal pulse */}
                {isActive && (
                  <motion.div
                    className="w-1 h-1 bg-emerald-400 rounded-full"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 }}
                  />
                )}
                {activeStage >= (i > 2 ? 2 : i) ? <CheckCircle2 size={10} className="text-emerald-400" /> : <div className="w-2.5 h-2.5 border border-white/20 rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT: Diagonal Main Pipeline */}
      <div className="w-[160px] sm:w-[220px] h-full flex flex-col justify-center gap-2 sm:gap-3 relative z-20 mt-10 sm:mt-0 ml-4 sm:ml-0">

        {/* Animated Particles travelling through */}
        {isActive && (
          <div className="absolute top-[20px] bottom-[20px] left-[-15px] w-0.5 bg-gradient-to-b from-primary via-amber-500 to-white opacity-20" />
        )}

        {isActive && (
          <motion.div
            className="absolute left-[-17.5px] w-1.5 h-1.5 rounded-full z-30"
            style={{ backgroundColor: activeStage >= 2 ? (activeStage >= 4 ? '#FFFFFF' : '#FF8533') : '#00A6FF', boxShadow: `0 0 10px ${activeStage >= 2 ? (activeStage >= 4 ? '#FFFFFF' : '#FF8533') : '#00A6FF'}` }}
            initial={{ top: '0%' }}
            animate={{ y: `${(Math.min(activeStage >= 0 ? activeStage : 0, 4) / 4) * 80 + 10}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        )}

        {pipelineStages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
            transition={{ delay: i * 0.15 + 0.5 }}
            className={`relative p-2 border rounded-lg flex items-center justify-between transition-all duration-300 backdrop-blur-md
              ${activeStage === i ? stage.activeColor + ' scale-105 ml-2' : 'bg-[#050505]/80 ' + stage.color}
            `}
          >
            <span className={`text-[7px] sm:text-[9px] uppercase tracking-wider ${activeStage === i ? 'text-white' : ''}`}>{stage.label}</span>
            <span className={`text-[9px] sm:text-[11px] font-black ${activeStage === i ? 'text-white' : ''}`}>
              {activeStage >= i ? <AnimatedNumber end={stage.number} duration={1} isActive={isActive && activeStage >= i} /> : 0}
            </span>
          </motion.div>
        ))}

        {/* Transition Particles to Scene 7 */}
        {activeStage >= 4 && (
          <motion.div className="absolute bottom-[10%] right-[-20%] w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#FFFFFF]" animate={{ left: [0, 150], y: [0, -50], opacity: [0, 1, 1], scale: [1, 1.5, 2] }} transition={{ duration: 1.5, repeat: Infinity }} />
        )}
      </div>

    </div>
  );
};

const AnimatedDecimal = ({ end, duration, isActive }) => {
  const [value, setValue] = useState(1.00);

  useEffect(() => {
    if (isActive) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentVal = 1.00 + (end - 1.00) * easeProgress;
        setValue(currentVal);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    } else {
      setValue(1.00);
    }
  }, [isActive, end, duration]);

  return <span>{value.toFixed(2)}</span>;
};

const SceneRevenueGrowth = ({ isActive }) => {
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowPoints(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowPoints(false);
    }
  }, [isActive]);

  const supportingMetrics = [
    { label: "+28% INTENT", top: "15%", left: "15%" },
    { label: "+41% QUALIFIED", top: "70%", left: "10%" },
    { label: "+62% MEETINGS", top: "15%", right: "15%" },
    { label: "+37% CONVERSION", top: "60%", right: "10%" }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-2 sm:px-6 z-20 overflow-hidden">

      {/* Background Particles (Upward) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{ left: `${10 + i * 15}%`, bottom: '0%' }}
            animate={isActive ? { y: ['0%', '-1000%'], opacity: [0, 1, 0] } : {}}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Supporting Metrics (Low Opacity) */}
      {supportingMetrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.5 + i * 0.2 }}
          className="absolute z-10 text-[8px] sm:text-[10px] text-white/20 font-bold uppercase tracking-widest pointer-events-none"
          style={{ top: metric.top, left: metric.left, right: metric.right }}
        >
          {metric.label}
        </motion.div>
      ))}

      {/* Main Graph (Background) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {/* Axes */}
        <div className="absolute left-[10%] bottom-[20%] w-[80%] h-[1px] bg-white/10" />
        <div className="absolute left-[10%] bottom-[20%] h-[60%] w-[1px] bg-white/10" />
        <span className="absolute left-[10%] bottom-[15%] text-[5px] sm:text-[6px] text-white/30 uppercase tracking-widest">TIME</span>
        <span className="absolute left-[2%] bottom-[75%] text-[5px] sm:text-[6px] text-white/30 uppercase tracking-widest -rotate-90">REVENUE</span>

        {/* Graph Line */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
          <svg width="80%" height="60%" viewBox="0 0 100 50" preserveAspectRatio="none" className="overflow-visible mt-[5%]">
            {/* Gradient Fill under line */}
            <defs>
              <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A6FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00A6FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#00A6FF" />
                <stop offset="100%" stopColor="#FF8533" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 50 C 20 45, 40 40, 50 30 C 60 20, 80 10, 100 0"
              fill="url(#graphGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />
            <motion.path
              d="M 0 50 C 20 45, 40 40, 50 30 C 60 20, 80 10, 100 0"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isActive ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Data Points */}
            {showPoints && (
              <>
                <circle cx="20" cy="45" r="1.5" fill="#00A6FF" className="animate-pulse" />
                <circle cx="50" cy="30" r="1.5" fill="#00A6FF" className="animate-pulse" />
                <circle cx="80" cy="10" r="1.5" fill="#00A6FF" className="animate-pulse" />
              </>
            )}

            {/* Final Growth Point Glow */}
            <motion.circle
              cx="100" cy="0" r="2.5"
              fill="#FF8533"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isActive ? [0.8, 1, 0.8] : 0, scale: isActive ? [1, 1.3, 1] : 0 }}
              transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
              style={{ filter: "drop-shadow(0 0 10px #FF8533) drop-shadow(0 0 20px #00A6FF)" }}
            />

            {/* Traveling particle on line */}
            {isActive && (
              <motion.circle
                r="1"
                fill="#FFFFFF"
                style={{ filter: "drop-shadow(0 0 5px #00A6FF)" }}
                animate={{
                  cx: [0, 20, 50, 80, 100],
                  cy: [50, 45, 30, 10, 0],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            )}
          </svg>
        </div>
      </div>

      {/* Center Main Metric */}
      <motion.div
        className="z-30 text-center flex flex-col items-center justify-center mt-[-30px] sm:mt-[-50px] bg-[#050505]/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="text-6xl sm:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-cta drop-shadow-[0_0_30px_rgba(255,133,51,0.5)]">
          {isActive ? <AnimatedDecimal end={2.34} duration={2} isActive={isActive} /> : "1.00"}&times;
        </div>
        <div className="text-sm sm:text-lg font-extrabold text-white uppercase tracking-[0.3em] mt-3 drop-shadow-md">
          Revenue Growth
        </div>
        <div className="text-[10px] sm:text-xs text-cta font-bold uppercase tracking-widest mt-2 bg-cta/10 px-3 py-1 rounded-full border border-cta/20">
          In One Quarter
        </div>
      </motion.div>

    </div>
  );
};

const SceneClientFeedback = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-2 sm:px-6 z-20 overflow-hidden">

      {/* Blurred Background Dashboard */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 filter blur-[4px]">
        <div className="w-[80%] h-[60%] flex gap-4">
          {["PIPELINE", "QUALIFIED", "MEETINGS", "REVENUE"].map((label, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-2">
              <div className="text-[6px] text-white/50 text-center font-bold tracking-widest">{label}</div>
              <div className="w-full bg-white/10 rounded-t-md" style={{ height: `${40 + (i * 10)}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Cyan Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
            animate={isActive ? { y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] } : {}}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Testimonial Card */}
      <motion.div
        className="w-[280px] sm:w-[360px] bg-[#050505]/95 border border-white/10 rounded-xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl relative z-10"
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <div className="absolute -top-4 -left-2 text-6xl text-primary/40 font-serif leading-none">&ldquo;</div>
        <p className="text-xs sm:text-sm text-white/90 italic leading-relaxed text-center font-medium mt-1">
          "Taraj didn't just give us more leads.<br />
          They helped us build a predictable<br />
          pipeline and significantly grow our<br />
          revenue."
        </p>
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <span className="text-[8px] sm:text-[9px] font-bold text-white/60 uppercase tracking-widest">— B2B SAAS GROWTH TEAM</span>
        </div>
      </motion.div>

      {/* Connected Outcome Pills */}
      <div className="flex items-center justify-center mt-8 z-10">
        {[
          { label: "STRONGER PIPELINE", color: "text-primary border-primary/30 bg-primary/10 shadow-[0_0_10px_rgba(0,166,255,0.2)]" },
          { arrow: true },
          { label: "HIGHER REVENUE", color: "text-amber-500 border-amber-500/30 bg-amber-500/10 shadow-[0_0_10px_rgba(255,133,51,0.2)]" },
          { arrow: true },
          { label: "LONG-TERM PARTNERSHIP", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.2)]" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
            transition={{ delay: 1 + i * 0.2 }}
          >
            {item.arrow ? (
              <div className="mx-1 sm:mx-2 text-white/30 text-[8px] sm:text-[10px]">
                <ArrowRight size={10} />
              </div>
            ) : (
              <div className={`px-2 py-1 border rounded text-[7px] sm:text-[9px] font-bold uppercase tracking-wider ${item.color}`}>
                {item.label}
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
};

// Realistic Character Video Component
const BusinessCharacter = ({ isWalking, scene, direction }) => {
  const videoRef = React.useRef(null);
  const leftVideoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current && leftVideoRef.current) {
      if (isWalking) {
        if (direction === 1) {
          videoRef.current.play().catch(e => console.log('Playback prevented:', e));
          leftVideoRef.current.pause();
        } else {
          leftVideoRef.current.play().catch(e => console.log('Playback prevented:', e));
          videoRef.current.pause();
        }
      } else {
        videoRef.current.pause();
        leftVideoRef.current.pause();
      }
    }
  }, [isWalking, direction]);

  const handleTimeUpdate = (e) => {
    if (e.target.currentTime >= 3) {
      e.target.currentTime = 0;
    }
  };

  return (
    <div className="relative flex flex-col items-center z-50">
      <motion.div
        animate={{
          y: isWalking ? [0, -2, 0] : [0, 0, 0]
        }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 origin-bottom"
      >
        {/* Video Container */}
        <div className="w-[140px] h-40 sm:w-40 sm:h-52 relative flex items-center justify-center overflow-visible pointer-events-none">

          {/* Forward (Right) Video - Native Screen Blend */}
          <video
            ref={videoRef}
            src="/rightvdo.mp4"
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 mt-30 ${direction === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ mixBlendMode: 'screen', filter: "none", transform: "scale(1.1)" }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          {/* Backward (Left) Video - Flipped Right Video to preserve perfect background! */}
          <video
            ref={leftVideoRef}
            src="/rightvdo.mp4"
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 mt-30 ${direction === -1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ mixBlendMode: 'screen', filter: "none", transform: "scaleX(-1) scale(1.1)" }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

        </div>
      </motion.div>
    </div>
  );
};

export const HeroRightAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const scenesData = [
    {
      title: 'Growth Stalled',
      subtitle: 'Need more qualified leads',
      accent: 'text-red-500',
      ui: (isActive) => <SceneGrowthStalled isActive={isActive} />
    },
    {
      title: 'In-House Attempt',
      subtitle: 'Low conversion rates',
      accent: 'text-amber-500',
      ui: (isActive) => <SceneInHouseAttempt isActive={isActive} />
    },
    {
      title: 'Exploring Vendors',
      subtitle: 'Searching for the right fit',
      accent: 'text-primary',
      ui: (isActive) => (
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 w-full max-w-[400px] mb-8">
            <div className="bg-surface/50 border border-white/10 p-2 rounded text-xs text-white/60 text-center w-[120px]">Vendor A<br />Mass Outreach</div>
            <div className="bg-surface/50 border border-white/10 p-2 rounded text-xs text-white/60 text-center w-[120px]">Vendor B<br />Cold Email</div>
            <div className="bg-surface/50 border border-white/10 p-2 rounded text-xs text-white/60 text-center w-[120px]">Vendor C<br />Paid Acq.</div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-primary/10 border border-primary/50 p-3 sm:p-4 rounded-xl shadow-[0_0_30px_rgba(0,166,255,0.2)] w-48 text-center backdrop-blur-lg relative"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-2 py-0.5 rounded border border-primary/50 text-[9px] text-primary whitespace-nowrap">SOLUTION FOUND</div>
            <h3 className="text-primary font-black text-sm uppercase tracking-wider mb-1 mt-2">Taraj Global</h3>
            <p className="text-[9px] text-white/80 uppercase">Revenue Intelligence</p>
          </motion.div>
        </div>
      )
    },
    {
      title: 'Taraj Global Solution',
      subtitle: 'REVENUE INTELLIGENCE',
      accent: 'text-primary',
      ui: (isActive) => <SceneTarajSolution isActive={isActive} />
    },
    {
      title: 'Continuous Optimization',
      subtitle: 'Data-driven improvement',
      accent: 'text-emerald-400',
      ui: (isActive) => <SceneOptimization isActive={isActive} />
    },
    {
      title: 'High-Intent Pipeline',
      subtitle: 'Focus on closing',
      accent: 'text-cta',
      ui: (isActive) => <SceneHighIntent isActive={isActive} />
    },
    {
      title: 'Revenue Result',
      subtitle: 'Measurable impact',
      accent: 'text-cta',
      ui: (isActive) => <SceneRevenueGrowth isActive={isActive} />
    },
    {
      title: 'Client Feedback',
      subtitle: 'Long-term partnership',
      accent: 'text-white',
      ui: (isActive) => <SceneClientFeedback isActive={isActive} />
    }
  ];

  const totalScenes = scenesData.length;
  const timings = [4000, 5000, 5000, 6000, 6000, 5000, 5000, 5000];

  const handleSceneChange = (newScene) => {
    if (newScene === scene) return;
    setDirection(newScene > scene ? 1 : -1);
    setIsWalking(true);
    setScene(newScene);
    setTimeout(() => setIsWalking(false), 1500);
  };

  const nextScene = () => handleSceneChange((scene + 1) % totalScenes);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeout = setTimeout(nextScene, timings[scene] || 5000);
    return () => clearTimeout(timeout);
  }, [scene, prefersReducedMotion]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative min-h-[400px] sm:min-h-[500px] lg:min-h-[580px] px-2 sm:px-4 mt-[-0px] sm:mt-5 xl:mt-0 select-none mix-blend-screen">
      {/* Main Interactive 3D Container (Viewport) */}
      <motion.div
        className="relative w-full max-w-[700px] h-[400px] sm:h-[550px] bg-transparent overflow-hidden transition-all duration-500 flex flex-col mix-blend-screen"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Explore The Journey Indicator */}
        <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 bg-[#000]/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md pointer-events-none transition-opacity duration-300">
          <Play size={10} className="text-primary" />
          <span className="text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-white/80">Explore The Journey</span>
        </div>

        {/* UPPER 70%: UI & Visual Storytelling Area */}
        <div className="relative w-full h-[70%] z-20 overflow-hidden">
          {/* Sliding Track for UI Scenes */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 flex"
            style={{ width: `${totalScenes * 100}%` }}
            animate={{ x: `-${(scene / totalScenes) * 100}%` }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          >
            {scenesData.map((data, i) => (
              <div key={i} className="relative pt-6 sm:pt-8 flex flex-col items-center w-full h-full" style={{ width: `${100 / totalScenes}%` }}>
                {/* Scene Header */}
                <div className="absolute top-4 sm:top-6 text-center w-full px-4 z-30">
                  <h2 className="text-lg sm:text-2xl font-black text-white/95 uppercase tracking-tight mb-0.5 drop-shadow-md">{data.title}</h2>
                  <p className={`${data.accent} font-bold text-[9px] sm:text-[11px] uppercase tracking-widest drop-shadow-sm`}>{data.subtitle}</p>
                </div>
                {/* Scene specific UI */}
                <div className="w-full h-full pt-16">
                  {data.ui(scene === i)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* LOWER 30%: Character Walking Lane */}
        <div className="relative w-full h-[30%] z-10 bg-transparent flex items-end">
          {/* Animated decorative data stream in the floor */}
          <motion.div
            className="absolute bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{ backgroundPosition: ['200% 0', '-100% 0'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <motion.div
              animate={{ x: -100 + (scene * 22) }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
              className="h-full flex items-end"
            >
              <BusinessCharacter isWalking={isWalking} scene={scene} direction={direction} />
            </motion.div>
          </div>
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-between items-center px-4 sm:px-6 z-40">
          <div className="flex gap-1.5 sm:gap-2 bg-[#000]/70 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {scenesData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSceneChange(i)}
                className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 ${scene === i ? 'bg-primary scale-125' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to scene ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextScene}
            className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/10 cursor-pointer backdrop-blur-md"
          >
            {scene === totalScenes - 1 ? 'Restart Journey' : 'Next Phase'} <ArrowRight size={10} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
