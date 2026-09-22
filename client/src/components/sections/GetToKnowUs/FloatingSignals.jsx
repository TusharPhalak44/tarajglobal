import React from 'react'
import { motion } from 'framer-motion'
import { Target, Radio, CheckCircle2, Users, Calendar, TrendingUp } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * FloatingSignals
 * Ambient, subtly floating intelligence telemetry signals scattered around
 * the Growth Journey track.
 */
export const FloatingSignals = () => {
  const prefersReducedMotion = useReducedMotion()

  const signals = [
    {
      id: 'icp-signal',
      label: 'ICP SIGNAL',
      sub: 'TAM CALIBRATED',
      icon: Target,
      color: '#00E5FF',
      top: '10%',
      left: '2%',
      delay: 0,
      yOffset: [-4, 4, -4],
      duration: 5,
    },
    {
      id: 'buyer-intent',
      label: 'BUYER INTENT',
      sub: 'SURGE 94%',
      icon: Radio,
      color: '#00A6FF',
      top: '72%',
      left: '22%',
      delay: 0.5,
      yOffset: [4, -4, 4],
      duration: 6,
    },
    {
      id: 'data-verified',
      label: 'DATA VERIFIED',
      sub: '0% RE-SYNC SLA',
      icon: CheckCircle2,
      color: '#10B981',
      top: '8%',
      left: '52%',
      delay: 0.8,
      yOffset: [-3, 5, -3],
      duration: 5.5,
    },
    {
      id: 'decision-maker',
      label: 'DECISION MAKER',
      sub: 'C-SUITE / VP',
      icon: Users,
      color: '#00E5FF',
      top: '78%',
      left: '48%',
      delay: 1.1,
      yOffset: [5, -3, 5],
      duration: 6.5,
    },
    {
      id: 'appointment',
      label: 'APPOINTMENT',
      sub: 'CONFIRMED SQL',
      icon: Calendar,
      color: '#FF6D00',
      top: '12%',
      left: '80%',
      delay: 1.4,
      yOffset: [-4, 4, -4],
      duration: 5.2,
    },
    {
      id: 'pipeline',
      label: 'PIPELINE WON',
      sub: 'PREDICTABLE',
      icon: TrendingUp,
      color: '#FFA600',
      top: '74%',
      left: '86%',
      delay: 1.7,
      yOffset: [3, -5, 3],
      duration: 6.2,
    },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 hidden lg:block">
      {signals.map((sig) => {
        const Icon = sig.icon

        return (
          <motion.div
            key={sig.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={prefersReducedMotion ? {} : {
              y: sig.yOffset,
            }}
            transition={{
              y: {
                duration: sig.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: { duration: 0.6, delay: sig.delay },
              scale: { duration: 0.6, delay: sig.delay },
            }}
            className="absolute flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0E121E]/80 border border-white/10 shadow-lg backdrop-blur-md opacity-80"
            style={{
              top: sig.top,
              left: sig.left,
              boxShadow: `0 4px 16px ${sig.color}15`,
            }}
          >
            {/* Pulsing Dot / Icon */}
            <div 
              className="w-4 h-4 rounded flex items-center justify-center text-white"
              style={{
                backgroundColor: `${sig.color}25`,
                color: sig.color,
                border: `1px solid ${sig.color}60`,
              }}
            >
              <Icon size={10} strokeWidth={2.5} />
            </div>

            {/* Label & Sub */}
            <div className="leading-tight">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-200 block">
                {sig.label}
              </span>
              <span className="text-[7.5px] font-mono text-slate-400 block" style={{ color: sig.color }}>
                {sig.sub}
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default FloatingSignals
