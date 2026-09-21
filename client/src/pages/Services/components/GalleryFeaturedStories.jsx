import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MinimalArrowButton, UnderlineTextButton } from './GalleryButtons'
import { CheckCircle2, TrendingUp, Target, ShieldCheck } from 'lucide-react'

export const GalleryFeaturedStories = () => {
  return (
    <section
      id="featured-stories"
      className="relative bg-background text-text-primary border-b border-border/40 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-24 md:py-32">
        {/* SECTION HEADER */}
        <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-primary block mb-3">
              [SECTION 09 // EXHIBITION SPOTLIGHTS]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-[0.95]">
              THREE CURATED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-hover to-text-secondary">
                FEATURE STORIES.
              </span>
            </h2>
          </div>
          <div className="max-w-xs text-text-muted text-xs md:text-sm font-sans leading-relaxed">
            Deep-dive into our highest-velocity growth programs built for enterprise B2B scale.
          </div>
        </div>

        {/* STORY 01 — B2B LEAD GENERATION (Image Left, Typography Right, ~80-100vh) */}
        <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-16 border-b border-border/60">
          {/* Visual Canvas (Left) */}
          <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl group">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/sql-lead-qualification-journey.jpg"
                alt="B2B Lead Generation Journey"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-6 left-6 font-mono text-xs tracking-widest uppercase bg-black/70 text-white px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              CASE EXHIBIT // 01
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
              <span>OUTREACH CHANNELS: 4 ACTIVE</span>
              <span className="text-primary font-bold">SQL CONVERSION: 28.4%</span>
            </div>
          </div>

          {/* Typography Narrative (Right) */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-mono text-sm tracking-widest text-primary font-bold block">
              01 / CORE REVENUE ENGINE
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-tight">
              B2B LEAD <br />
              GENERATION.
            </h3>
            <p className="text-sm md:text-base text-text-secondary font-sans leading-relaxed">
              Transform cold target accounts into qualified, sales-ready prospects. We combine intent monitoring, verified contact discovery, and synchronized multi-channel outreach so your sales team steps into conversations with high-intent decision-makers ready for conversion.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Intent-triggered outreach on actively researching buyers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Zero-spam high deliverability custom domain infrastructure</span>
              </div>
            </div>

            <div className="pt-6">
              <MinimalArrowButton to="/sql-services" accent>
                LEARN MORE ABOUT LEAD GEN
              </MinimalArrowButton>
            </div>
          </div>
        </div>

        {/* STORY 02 — ACCOUNT-BASED MARKETING (Reversed Layout: Typography Left, Image Right) */}
        <div className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 py-16 border-b border-border/60">
          {/* Typography Narrative (Left) */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-mono text-sm tracking-widest text-primary font-bold block">
              02 / ENTERPRISE PENETRATION
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-tight">
              ACCOUNT-BASED <br />
              MARKETING.
            </h3>
            <p className="text-sm md:text-base text-text-secondary font-sans leading-relaxed">
              Surround high-yield enterprise accounts with bespoke collateral, personalized executive outreach, and synchronized digital air cover. Break into Tier-1 named accounts by engaging the entire buying committee simultaneously.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Multi-threaded buying committee stakeholder alignment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Custom tailored enterprise decks and personalized video touchpoints</span>
              </div>
            </div>

            <div className="pt-6">
              <MinimalArrowButton to="/abm" accent>
                LEARN MORE ABOUT ABM
              </MinimalArrowButton>
            </div>
          </div>

          {/* Visual Canvas (Right) */}
          <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl group">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/enterprise-audience.jpg"
                alt="Enterprise ABM Audience"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-6 left-6 font-mono text-xs tracking-widest uppercase bg-black/70 text-white px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              CASE EXHIBIT // 02
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
              <span>TARGET TIER: TOP 500 ENTERPRISE</span>
              <span className="text-primary font-bold">AVG ACV: $120K+</span>
            </div>
          </div>
        </div>

        {/* STORY 03 — DEMAND GENERATION (Asymmetric Composition) */}
        <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-16">
          {/* Visual Canvas (Left with masked asymmetric styling) */}
          <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl group">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/demandflow-campaigns.png"
                alt="Demand Generation Workflows"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute top-6 left-6 font-mono text-xs tracking-widest uppercase bg-black/70 text-white px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              CASE EXHIBIT // 03
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
              <span>PIPELINE VELOCITY: 3.4X FASTER</span>
              <span className="text-primary font-bold">CAC REDUCTION: -38%</span>
            </div>
          </div>

          {/* Typography Narrative (Right) */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="font-mono text-sm tracking-widest text-primary font-bold block">
              03 / FULL-FUNNEL ORCHESTRATION
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary leading-tight">
              DEMAND <br />
              GENERATION.
            </h3>
            <p className="text-sm md:text-base text-text-secondary font-sans leading-relaxed">
              Create sustained, predictable market pull. Rather than burning budget on one-off blasts, our demand programs integrate content syndication, automated nurture workflows, and real-time intent telemetry into a compound growth system.
            </p>

            <div className="space-y-2.5 pt-2 font-mono text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Full-funnel attribution and automated CRM routing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>High-converting content distribution across 16+ industry sectors</span>
              </div>
            </div>

            <div className="pt-6">
              <MinimalArrowButton to="/demand-generation" accent>
                LEARN MORE ABOUT DEMAND GEN
              </MinimalArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryFeaturedStories
