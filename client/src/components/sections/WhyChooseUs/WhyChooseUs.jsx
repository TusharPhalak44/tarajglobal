import React, { useRef } from 'react'
import WhyChooseUsHeader from './WhyChooseUsHeader'
import FeaturesGrid from './FeaturesGrid'
import { AnimatedSectionBackground, SectionLaserDivider } from '@components/animations'

const WhyChooseUs = () => {
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef} 
      className="relative py-16 lg:py-24 overflow-hidden" 
      style={{ 
        position: 'relative',
        zIndex: 1
      }}
    >
      <AnimatedSectionBackground accent="emerald" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        <WhyChooseUsHeader />
        <FeaturesGrid />
      </div>

      {/* ── Bottom Laser Divider ────────────────────────────────────────── */}
      <SectionLaserDivider variant="amber" position="bottom" />
    </section>
  )
}

export default WhyChooseUs

