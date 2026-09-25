import React, { useEffect, useState } from 'react'
import {
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Eye,
  TrendingUp,
  Building2,
  Database,
  Target,
  Rocket,
  Cpu,
  Layers,
  Sparkles,
  Info
} from 'lucide-react'
import { adminAPI } from '@api'

const DEFAULT_STATS = {
  eyebrow: 'BUSINESS OUTCOMES / 01',
  title: 'BUILT ON EXPERIENCE. FOCUSED ON OUTCOMES.',
  description:
    'We work with the leading business firms globally to deliver what actually drives them providing consumer leads that increase their sales. We motivate consumers to embrace your business and build a long term relationship with you. We are experienced in creating digital experiences that generate high quality leads that increase the growth of any business.',

  chamber1: {
    number: '12',
    suffix: '+',
    name: 'EXPERIENCE',
    label: 'Industries Served',
    desc: 'B2B SaaS, Cloud, Cybersecurity, FinTech, HealthTech & Enterprise Hardware.',
  },
  chamber2: {
    number: '2,100',
    suffix: '+',
    name: 'DATA',
    label: 'Campaigns Delivered',
    desc: 'High-converting multi-channel demand generation and ABM initiatives.',
  },
  chamber3: {
    number: '1,500',
    suffix: '+',
    name: 'TARGETING',
    label: 'Leads Monthly',
    desc: 'Decision-maker matched opportunities delivered straight into sales pipelines.',
  },
  chamber4: {
    number: '16',
    suffix: '+',
    name: 'EXECUTION',
    label: 'Pipeline Multiplier',
    desc: 'Predictable pipeline acceleration measured across client multi-quarter cohorts.',
  },
}

const CARD_CONFIG = [
  {
    key: 'chamber1',
    index: '01',
    title: 'Card 01 — Experience',
    icon: Building2,
    color: '#FF6D00',
    bgLight: 'rgba(255, 109, 0, 0.08)',
    borderLight: 'rgba(255, 109, 0, 0.25)',
  },
  {
    key: 'chamber2',
    index: '02',
    title: 'Card 02 — Data',
    icon: Database,
    color: '#00A6FF',
    bgLight: 'rgba(0, 166, 255, 0.08)',
    borderLight: 'rgba(0, 166, 255, 0.25)',
  },
  {
    key: 'chamber3',
    index: '03',
    title: 'Card 03 — Targeting',
    icon: Target,
    color: '#A855F7',
    bgLight: 'rgba(168, 85, 247, 0.08)',
    borderLight: 'rgba(168, 85, 247, 0.25)',
  },
  {
    key: 'chamber4',
    index: '04',
    title: 'Card 04 — Execution',
    icon: Rocket,
    color: '#EC4899',
    bgLight: 'rgba(236, 72, 153, 0.08)',
    borderLight: 'rgba(236, 72, 153, 0.25)',
  },
]

export default function CMSStats() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [stats, setStats] = useState(DEFAULT_STATS)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await adminAPI.getStatsSettings()
      if (res.data?.data) {
        setStats({
          ...DEFAULT_STATS,
          ...res.data.data,
          chamber1: { ...DEFAULT_STATS.chamber1, ...(res.data.data.chamber1 || {}) },
          chamber2: { ...DEFAULT_STATS.chamber2, ...(res.data.data.chamber2 || {}) },
          chamber3: { ...DEFAULT_STATS.chamber3, ...(res.data.data.chamber3 || {}) },
          chamber4: { ...DEFAULT_STATS.chamber4, ...(res.data.data.chamber4 || {}) },
        })
      }
    } catch (err) {
      console.error('Failed to load stats settings:', err)
      flash('error', 'Failed to load stats settings')
    } finally {
      setLoading(false)
    }
  }

  const flash = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 4000)
  }

  const handleChamberChange = (chamberKey, field, val) => {
    setStats((prev) => ({
      ...prev,
      [chamberKey]: {
        ...prev[chamberKey],
        [field]: val,
      },
    }))
  }

  const handleSave = async (e) => {
    if (e) e.preventDefault()
    try {
      setSaving(true)
      setMessage({ type: '', text: '' })
      await adminAPI.updateStatsSettings(stats)
      flash('success', 'Numbers & Outcomes saved successfully! The homepage reflects these values now.')
    } catch (err) {
      console.error('Failed to save stats settings:', err)
      flash('error', err.response?.data?.message || 'Failed to save stats settings')
    } finally {
      setSaving(false)
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Reset all numbers and titles back to factory defaults?')) {
      setStats(DEFAULT_STATS)
      flash('success', 'Form restored to defaults. Click "Save Changes" to publish.')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[360px] text-text-muted gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Loading outcome numbers configuration...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ── Top Bar / Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary uppercase tracking-wider">
              Homepage CMS
            </span>
          </div>
          <h1 className="font-extrabold text-text-primary tracking-tight">
            Numbering
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manually edit any number, symbol, or title displayed inside the cards.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={saving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-border bg-surface hover:bg-surface/80 text-text-secondary hover:text-text-primary text-xs sm:text-sm font-medium transition-colors"
            title="Restore original numbers"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold shadow-md shadow-primary/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Numbers...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Alert Notification ── */}
      {message.text && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* ── LIVE PREVIEW BANNER (MATCHING THE UPLOADED USER IMAGE) ── */}
      <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-text-primary">
              Live Preview of Numbers &amp; Cards
            </h2>
          </div>
          <span className="text-[11px] font-mono text-text-muted uppercase">
            Real-time synchronization
          </span>
        </div>

        {/* Constellation Preview Container */}
        <div className="relative p-6 sm:p-8 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-border/80 overflow-x-auto">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 min-w-[700px]">
            {/* Left Info Column */}
            <div className="max-w-xs space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase">
                {stats.eyebrow || 'BUSINESS OUTCOMES / 01'}
              </span>
              <h3 className="font-black text-text-primary uppercase tracking-tight leading-tight">
                {stats.title || 'BUILT ON EXPERIENCE. FOCUSED ON OUTCOMES.'}
              </h3>
              <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                {stats.description}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM READY
              </div>
            </div>

            {/* Right Cards Constellation */}
            <div className="flex-1 flex flex-col items-center gap-4">
              {/* 4 Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 w-full">
                {CARD_CONFIG.map(({ key, index, icon: Icon, color }) => {
                  const ch = stats[key] || {}
                  return (
                    <div
                      key={key}
                      className="relative p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0C1526] border border-border/80 shadow-md transition-all hover:scale-[1.02] flex flex-col justify-between"
                      style={{ borderTop: `3px solid ${color}` }}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-text-muted">
                          {index} •
                        </span>
                      </div>

                      {/* Number and Suffix */}
                      <div className="mb-2">
                        <div
                          className="text-xl sm:text-2xl font-black tracking-tight"
                          style={{ color }}
                        >
                          {ch.number || '0'}
                          <span className="text-base sm:text-lg ml-0.5 opacity-90">
                            {ch.suffix || ''}
                          </span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-text-primary tracking-wider uppercase truncate">
                          {ch.name || 'LABEL'}
                        </div>
                      </div>

                      {/* Progress line */}
                      <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full"
                          style={{ width: '65%', backgroundColor: color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* OUTCOME CORE Node */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-[#0C1526] border border-primary/30 shadow-md">
                <Cpu className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                <div className="text-left">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase block">
                    OUTCOME CORE
                  </span>
                  <span className="text-xs font-black text-text-primary tracking-wide">
                    PIPELINE IMPACT ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CARD-BY-CARD NUMBER EDITING SECTION ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-text-primary">
            Edit Card Numbers &amp; Labels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARD_CONFIG.map(({ key, index, title, icon: Icon, color }) => {
            const ch = stats[key] || {}
            return (
              <div
                key={key}
                className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm relative overflow-hidden"
              >
                {/* Visual colored accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: color }}
                />

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary flex items-center gap-2">
                        {title}
                      </h3>
                      <span className="text-xs text-text-muted font-mono">
                        Card Index: #{index}
                      </span>
                    </div>
                  </div>

                  {/* Mini Badge */}
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-mono font-bold"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {ch.number || '0'}
                    {ch.suffix || ''}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Row: Number & Suffix */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                        Number Value <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={ch.number || ''}
                        onChange={(e) => handleChamberChange(key, 'number', e.target.value)}
                        placeholder="e.g. 12 or 2,100"
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-text-primary font-bold text-base focus:outline-none focus:border-primary transition-colors"
                      />
                      <span className="text-[11px] text-text-muted mt-1 block">
                        Enter any number (e.g. 12, 100, 2,100, 5000)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                        Suffix Symbol
                      </label>
                      <input
                        type="text"
                        value={ch.suffix || ''}
                        onChange={(e) => handleChamberChange(key, 'suffix', e.target.value)}
                        placeholder="e.g. +"
                        className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-text-primary font-bold text-base text-center focus:outline-none focus:border-primary transition-colors"
                      />
                      <span className="text-[11px] text-text-muted mt-1 block text-center">
                        e.g. +, %, M, x
                      </span>
                    </div>
                  </div>

                  {/* Row: Card Name (e.g. EXPERIENCE) & Sub-label (e.g. Industries Served) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                        Card Name / Title
                      </label>
                      <input
                        type="text"
                        value={ch.name || ''}
                        onChange={(e) => handleChamberChange(key, 'name', e.target.value)}
                        placeholder="e.g. EXPERIENCE"
                        className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary font-semibold text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                        Sub-label
                      </label>
                      <input
                        type="text"
                        value={ch.label || ''}
                        onChange={(e) => handleChamberChange(key, 'label', e.target.value)}
                        placeholder="e.g. Industries Served"
                        className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Card Description */}
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                      Card Detailed Description
                    </label>
                    <textarea
                      rows={2}
                      value={ch.desc || ''}
                      onChange={(e) => handleChamberChange(key, 'desc', e.target.value)}
                      placeholder="Card hover/detail description..."
                      className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-xs focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SECTION HEADER & DESCRIPTIONS ── */}
      <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          Section Heading &amp; Copy
        </h3>
        <p className="text-xs text-text-secondary mb-5">
          Customize the main headline and paragraph that appear next to the outcome cards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={stats.eyebrow || ''}
              onChange={(e) => setStats((p) => ({ ...p, eyebrow: e.target.value }))}
              placeholder="e.g. BUSINESS OUTCOMES / 01"
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
              Main Headline
            </label>
            <input
              type="text"
              value={stats.title || ''}
              onChange={(e) => setStats((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. BUILT ON EXPERIENCE. FOCUSED ON OUTCOMES."
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-text-primary text-sm font-semibold focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
            Section Description Paragraph
          </label>
          <textarea
            rows={3}
            value={stats.description || ''}
            onChange={(e) => setStats((p) => ({ ...p, description: e.target.value }))}
            placeholder="We work with the leading business firms globally..."
            className="w-full px-3.5 py-2 bg-background border border-border rounded-xl text-text-primary text-xs leading-relaxed focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      {/* ── Bottom Save Action Bar ── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={handleResetDefaults}
          disabled={saving}
          className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
        >
          Reset Defaults
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/20 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save & Publish All Numbers'}
        </button>
      </div>
    </div>
  )
}
