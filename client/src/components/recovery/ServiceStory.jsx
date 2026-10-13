import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@hooks/useReducedMotion'
import { useRecovery } from '@context/RecoveryContext'

/**
 * Shared "case file" layout for service pages:
 * Symptoms → Diagnosis → Treatment → Recovery → Questions, with a growth line
 * drawn down the page that turns from flat red to rising orange as the reader scrolls.
 */

const CHAPTERS = [
  { id: 'symptoms', label: 'Challenges' },
  { id: 'diagnosis', label: 'Strategic Shift' },
  { id: 'treatment', label: 'Execution' },
  { id: 'recovery', label: 'Enterprise Impact' },
  { id: 'questions', label: 'FAQ' },
]

function ChapterHeading({ index, kicker, title, children }) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-text-muted">
        <span className="text-cta">0{index + 1}</span> · {CHAPTERS[index].label}
        {kicker && <span className="text-text-muted"> · {kicker}</span>}
      </p>
      <h2 className="mt-3 text-3xl sm:text-[44px] font-black leading-[1.08] tracking-[-0.025em] text-text-primary">{title}</h2>
      {children && <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">{children}</p>}
    </div>
  )
}

/** The growth line that runs down the left edge of the case file on large screens. */
function Spine({ targetRef }) {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 60%', 'end 80%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  return (
    <div aria-hidden className="pointer-events-none absolute left-4 top-0 bottom-0 hidden w-10 xl:block 2xl:left-10">
      <svg viewBox="0 0 40 1000" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EF4444" />
            <stop offset="0.35" stopColor="#EF4444" />
            <stop offset="0.6" stopColor="#00A6FF" />
            <stop offset="1" stopColor="#FF6D00" />
          </linearGradient>
        </defs>
        <path d="M20 0 L20 1000" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        <motion.path
          d="M20 0 C 24 120, 16 240, 20 360 S 22 520, 14 640 S 6 820, 34 1000"
          fill="none"
          stroke="url(#spine-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reducedMotion ? 1 : progress }}
        />
      </svg>
    </div>
  )
}

function ChapterNav() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return (
    <nav aria-label="Strategy chapters" className="sticky top-[80px] z-20 -mx-5 border-y border-white/5 bg-background/85 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
      <ol className="flex gap-1 overflow-x-auto py-2.5">
        {CHAPTERS.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={active === c.id ? 'true' : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                active === c.id ? 'bg-white/10 text-text-primary' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <span className={`font-mono text-[11px] ${active === c.id ? 'text-cta' : ''}`}>0{i + 1}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function Opening({ story, path }) {
  const { goal, route } = useRecovery()
  const stepOnRoute = route.indexOf(path)
  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-10 lg:pb-20" aria-labelledby="case-title">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(239,68,68,0.10), transparent 70%)' }} />
      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A6FF]" />
            {stepOnRoute >= 0 ? `Capability ${stepOnRoute + 1} of ${route.length} on your pipeline roadmap` : `Capability Briefing · ${story.name}`}
          </p>
          <p className="mt-6 text-[15px] font-semibold text-primary">{story.symptomLine}</p>
          <h1 id="case-title" className="mt-2 text-[36px] sm:text-[52px] xl:text-[60px] font-black leading-[1.04] tracking-[-0.035em] text-text-primary">
            {story.headline} <span className="text-primary">{story.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-[580px] text-base sm:text-lg leading-relaxed text-text-secondary">{story.intro}</p>
          {goal && stepOnRoute < 0 && (
            <p className="mt-4 max-w-[580px] text-[14px] text-text-muted">
              Aligned with your strategic priority: “{goal.problem}”. Every capability expands your pipeline velocity.
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#symptoms"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF6D00] px-7 text-[15px] font-bold text-white hover:bg-[#FF6D00]/90 transition-colors"
            >
              Review Key Challenges <ArrowDown size={16} />
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-[15px] font-semibold text-text-primary hover:border-white/40 transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">Projected Pipeline Velocity Lift</p>
            <svg viewBox="0 0 400 200" className="mt-3 w-full h-auto" aria-hidden>
              {[50, 100, 150].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />)}
              <path d="M10 180 C 60 172, 100 130, 170 108 S 230 104, 250 106" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 108 C 200 100, 230 110, 250 106" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              <motion.path
                d="M250 106 C 290 98, 330 60, 390 22"
                fill="none"
                stroke="#FF6D00"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,109,0,0.5))' }}
              />
              <circle cx="250" cy="106" r="5" fill="#EF4444" />
              <text x="250" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="#F87171">Baseline</text>
              <text x="384" y="18" textAnchor="end" fontSize="12" fontWeight="800" fill="#FF6D00">With {story.shortName}</text>
            </svg>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {story.pillars.map((p) => (
                <li key={p} className="rounded-xl border border-white/10 px-3 py-2.5 text-[13px] font-semibold text-text-primary">{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Symptoms({ story }) {
  const [checked, setChecked] = useState([])
  const toggle = (id) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]))
  const count = checked.length
  const verdict =
    count === 0
      ? 'Select the key challenges impacting your current outbound pipeline.'
      : count <= 2
        ? `${count} key challenge${count > 1 ? 's' : ''} identified. ${story.shortName} provides targeted resolution.`
        : `${count} of ${story.problems.length} challenges identified. ${story.shortName} is a high-priority capability for your pipeline.`
  return (
    <section id="symptoms" className="scroll-mt-32 py-16 lg:py-24" aria-labelledby="symptoms-heading">
      <ChapterHeading index={0} title={<span id="symptoms-heading">Identify Your Core Pipeline Bottlenecks</span>}>
        Evaluate the primary friction points hindering your account engagement and revenue velocity.
      </ChapterHeading>
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {story.problems.map((p) => {
          const on = checked.includes(p.id)
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(p.id)}
              className={`flex items-start gap-3 rounded-2xl border p-5 text-left transition-colors ${
                on ? 'border-[#EF4444]/70 bg-[#EF4444]/10' : 'border-white/10 hover:border-white/25'
              }`}
            >
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? 'border-[#EF4444] bg-[#EF4444] text-white' : 'border-white/25'}`}>
                {on && <Check size={13} strokeWidth={3} />}
              </span>
              <span>
                <span className="block text-[16px] font-bold text-text-primary">{p.problem}</span>
                <span className="mt-1 block text-[14px] text-text-secondary">{p.problemDetail}</span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
        <p className={`text-[16px] font-semibold ${count >= 3 ? 'text-[#F87171]' : 'text-text-primary'}`}>{verdict}</p>
        <a href="#diagnosis" className="inline-flex items-center gap-2 text-[14px] font-bold text-primary">
          Explore the strategic solution <ArrowDown size={15} />
        </a>
      </div>
    </section>
  )
}

function Diagnosis({ story }) {
  const [fixed, setFixed] = useState(false)
  return (
    <section id="diagnosis" className="scroll-mt-32 py-16 lg:py-24" aria-labelledby="diagnosis-heading">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ChapterHeading index={1} title={<span id="diagnosis-heading">{story.diagnosisTitle}</span>} />
          <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-text-secondary">
            {story.diagnosis.map((para) => <p key={para}>{para}</p>)}
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[14px] font-semibold text-text-secondary">Compare traditional outbound vs. Taraj Global {story.shortName}</p>
            <button
              type="button"
              role="switch"
              aria-checked={fixed}
              onClick={() => setFixed((v) => !v)}
              className="flex items-center gap-3 rounded-full border border-white/15 p-1 pr-4 text-[13px] font-bold"
            >
              <span className={`relative h-7 w-12 rounded-full transition-colors ${fixed ? 'bg-[#00A6FF]' : 'bg-[#EF4444]/70'}`}>
                <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-white ${fixed ? 'right-1' : 'left-1'}`} />
              </span>
              <span className={fixed ? 'text-primary' : 'text-[#F87171]'}>{fixed ? `With ${story.shortName}` : 'Traditional Approach'}</span>
            </button>
          </div>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {story.problems.map((p, i) => (
              <li key={p.id} className="relative min-h-[104px] overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={fixed ? 'fix' : 'problem'}
                    initial={{ opacity: 0, y: fixed ? 14 : -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: fixed ? -14 : 14 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${fixed ? 'text-primary' : 'text-[#F87171]'}`}>
                      {fixed ? 'Advantage' : 'Challenge'}
                    </span>
                    <span className="mt-1 block text-[17px] font-bold text-text-primary">{fixed ? p.solution : p.problem}</span>
                    <span className="mt-0.5 block text-[14px] text-text-secondary">{fixed ? p.solutionDetail : p.problemDetail}</span>
                  </motion.div>
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Treatment({ story }) {
  const [active, setActive] = useState(0)
  const refs = useRef([])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])
  const progress = (active + 1) / story.steps.length

  return (
    <section id="treatment" className="scroll-mt-32 py-16 lg:py-24" aria-labelledby="treatment-heading">
      <ChapterHeading index={2} title={<span id="treatment-heading">{story.treatmentTitle}</span>}>
        {story.treatmentIntro}
      </ChapterHeading>
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:order-2">
          <div className="sticky top-[150px] rounded-3xl border border-white/10 bg-black/40 p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-muted">Execution Progress</p>
            <p className="mt-2 text-5xl font-black tabular-nums text-text-primary">
              {active + 1}<span className="text-2xl text-text-muted">/{story.steps.length}</span>
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full origin-left bg-gradient-to-r from-[#EF4444] via-[#00A6FF] to-[#FF6D00]" animate={{ scaleX: progress }} transition={{ duration: 0.5 }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cta">Key Deliverable</p>
                <p className="mt-1 text-[17px] font-bold text-text-primary">{story.steps[active].deliverable}</p>
              </motion.div>
            </AnimatePresence>
            <p className="mt-6 text-[14px] text-text-secondary">{story.outcome}</p>
          </div>
        </div>
        <ol className="lg:col-span-7 lg:order-1">
          {story.steps.map((s, i) => (
            <li
              key={s.title}
              data-index={i}
              ref={(el) => { refs.current[i] = el }}
              className={`relative border-l-2 py-8 pl-8 transition-colors duration-500 ${i <= active ? 'border-[#00A6FF]' : 'border-white/10'}`}
            >
              <span className={`absolute -left-[9px] top-9 h-4 w-4 rounded-full border-2 transition-colors duration-500 ${i <= active ? 'border-[#00A6FF] bg-[#00A6FF]' : 'border-white/30 bg-background'}`} />
              <p className="font-mono text-[12px] font-semibold text-text-muted">Step {String(i + 1).padStart(2, '0')}</p>
              <h3 className={`mt-1 text-2xl font-black transition-colors duration-500 ${i === active ? 'text-text-primary' : 'text-text-secondary'}`}>{s.title}</h3>
              <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-text-secondary">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Recovery({ story }) {
  const [audienceId, setAudienceId] = useState(story.audiences[0].id)
  const audience = story.audiences.find((a) => a.id === audienceId)
  return (
    <section id="recovery" className="scroll-mt-32 py-16 lg:py-24" aria-labelledby="recovery-heading">
      <ChapterHeading index={3} title={<span id="recovery-heading">Proven Business Impact Across Key Verticals</span>}>
        Select your organization profile to view tailored outcomes.
      </ChapterHeading>
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div role="tablist" aria-label="Company type" className="flex gap-2 overflow-x-auto pb-1 lg:col-span-4 lg:flex-col">
          {story.audiences.map((a) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={a.id === audienceId}
              aria-controls="recovery-panel"
              onClick={() => setAudienceId(a.id)}
              className={`shrink-0 rounded-xl border px-4 py-3 text-left text-[14px] font-semibold transition-colors ${
                a.id === audienceId ? 'border-[#00A6FF] bg-[#00A6FF]/10 text-text-primary' : 'border-white/10 text-text-secondary hover:border-white/25'
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div id="recovery-panel" role="tabpanel" className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div key={audience.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
              <p className="text-[18px] leading-relaxed text-text-primary">{audience.description}</p>
              <ul className="mt-6 space-y-3">
                {audience.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[15px] text-text-secondary">
                    <Check size={17} className="mt-0.5 shrink-0 text-success" /> {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-black text-text-primary">Why Global Enterprises Partner with Taraj Global</h3>
        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {story.reasons.map((r, i) => (
            <li key={r.title} className="border-t border-white/10 pt-4">
              <p className="font-mono text-[12px] text-cta">0{i + 1}</p>
              <p className="mt-1 text-[17px] font-bold text-text-primary">{r.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Questions({ story }) {
  const [openId, setOpenId] = useState(null)
  return (
    <section id="questions" className="scroll-mt-32 py-16 lg:py-24" aria-labelledby="questions-heading">
      <ChapterHeading index={4} title={<span id="questions-heading">Frequently Asked Questions</span>} />
      <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {story.faqs.map((f) => {
          const open = openId === f.id
          return (
            <div key={f.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${f.id}-answer`}
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-bold text-text-primary hover:text-primary transition-colors"
                >
                  {f.question}
                  <ChevronDown size={18} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`${f.id}-answer`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-[16px] leading-relaxed text-text-secondary">{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[16px] text-text-secondary">Have questions about aligning {story.name} with your revenue goals?</p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-[15px] font-bold text-cta">
          Speak with a Demand Specialist <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

export default function ServiceStory({ story, path }) {
  const bodyRef = useRef(null)
  return (
    <div className="relative bg-background">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <Opening story={story} path={path} />
      </div>
      <div ref={bodyRef} className="relative">
        <Spine targetRef={bodyRef} />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ChapterNav />
          <Symptoms story={story} />
          <Diagnosis story={story} />
          <Treatment story={story} />
          <Recovery story={story} />
          <Questions story={story} />
        </div>
      </div>
    </div>
  )
}
