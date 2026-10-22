import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'tg_recovery'

export const STUCK_GROWTH = 2
export const PEAK_GROWTH = 38
export const BREAKTHROUGH_GROWTH = 40

// Strategic Growth Objectives: Route defines the visitor's tailored pipeline acceleration roadmap.
export const GOALS = [
  {
    id: 'reach',
    pain: 'Marketing budget wasted on out-of-market and non-ICP accounts.',
    problem: 'Inefficient account targeting & low pipeline precision',
    short: 'Account Targeting',
    outcome: 'Precision ABM campaigns targeting 100% verified ICP accounts',
    diagnosis: 'Strong value propositions fail when delivered to companies lacking buying authority or market fit.',
    stage: 0,
    tab: 'reach',
    services: [
      { title: 'Account-Based Marketing', link: '/abm' },
      { title: 'B2B Email Marketing', link: '/b2b-email-marketing' },
    ],
    route: ['/abm', '/b2b-email-marketing', '/content-syndication', '/demandflow-bridge'],
  },
  {
    id: 'data',
    pain: 'High bounce rates, decaying contacts, and inaccurate CRM intelligence.',
    problem: 'Outdated or inaccurate B2B contact data',
    short: 'Data Integrity',
    outcome: 'Human-verified decision-maker contacts backed by a 99.8% accuracy SLA',
    diagnosis: 'Contact decay and organizational turnover silently drain sales efficiency before outreach begins.',
    stage: 1,
    tab: 'reach',
    services: [
      { title: 'B2B List Building', link: '/b2b-list-building' },
      { title: 'Database Cleansing', link: '/database-cleansing' },
    ],
    route: ['/database-cleansing', '/b2b-list-building', '/abm', '/demandflow-bridge'],
  },
  {
    id: 'convert',
    pain: 'High top-of-funnel volume that stalls before sales qualification.',
    problem: 'Leads generated but failing to convert into pipeline',
    short: 'Lead Conversion',
    outcome: 'Multi-tier qualified leads (MQL, SQL, BANT) ready for immediate sales engagement',
    diagnosis: 'Sales teams spend critical hours chasing unqualified clicks and non-decision-makers.',
    stage: 3,
    tab: 'qualify',
    services: [
      { title: 'BANT Lead Generation', link: '/bant-lead-generation' },
      { title: 'HQL Services', link: '/hql-services' },
    ],
    route: ['/bant-lead-generation', '/hql-services', '/lead-nurturing', '/sql-services'],
  },
  {
    id: 'meetings',
    pain: 'Unpredictable meeting volume and underutilized account executive capacity.',
    problem: 'Inconsistent sales meeting volume & pipeline velocity',
    short: 'Meeting Velocity',
    outcome: 'High-intent discovery meetings booked directly on sales calendars',
    diagnosis: 'Top sales talent is forced into cold prospecting instead of conducting strategic discovery calls.',
    stage: 4,
    tab: 'meet',
    services: [
      { title: 'B2B Appointment Setting', link: '/b2b-appointment-setting' },
      { title: 'Demand Generation', link: '/demand-generation' },
    ],
    route: ['/b2b-appointment-setting', '/demand-generation', '/webinar-services', '/bant-lead-generation'],
  },
]

// Strategic Growth Capabilities: Comprehensive solutions aligned with pipeline acceleration.
export const FIXES = {
  '/demand-generation': { title: 'Demand Generation', fixes: 'Predictable multi-channel demand engine driving in-market buyers.' },
  '/abm': { title: 'Account-Based Marketing', fixes: 'Hyper-personalized outreach targeting Tier-1 buying committees.' },
  '/b2b-email-marketing': { title: 'B2B Email Marketing', fixes: 'High-deliverability outbound sequences that generate executive replies.' },
  '/content-syndication': { title: 'Content Syndication', fixes: 'Targeted distribution of thought leadership to verified enterprise leaders.' },
  '/b2b-list-building': { title: 'B2B List Building', fixes: 'Custom-researched, human-verified contact databases matched to your ICP.' },
  '/database-cleansing': { title: 'Database Cleansing', fixes: 'Comprehensive data hygiene eliminating bounces, duplicates, and dead records.' },
  '/mql-services': { title: 'MQL Services', fixes: 'Engaged prospects pre-qualified against verified demographic criteria.' },
  '/hql-services': { title: 'HQL Services', fixes: 'High-intent leads with verified enterprise interest and active project initiatives.' },
  '/sql-services': { title: 'SQL Services', fixes: 'Sales-ready opportunities validated and agreed upon by your sales leadership.' },
  '/bant-lead-generation': { title: 'BANT Lead Generation', fixes: 'Budget, Authority, Need, and Timeline rigorously validated prior to routing.' },
  '/lead-nurturing': { title: 'Lead Nurturing', fixes: 'Multi-touch engagement cadences that advance long-cycle prospects.' },
  '/b2b-appointment-setting': { title: 'B2B Appointment Setting', fixes: 'Confirmed discovery meetings placed directly on sales executive calendars.' },
  '/webinar-services': { title: 'Webinar Services', fixes: 'Targeted audience acquisition driving high attendance and post-event pipeline.' },
  '/demandflow-bridge': { title: 'DemandFlow Bridge™', fixes: 'Integrated platform uniting intelligence, campaign orchestration, and attribution.' },
}

const ROUTE_LIFT = 10
const OTHER_LIFT = 5

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return { goalId: saved?.goalId || null, visited: Array.isArray(saved?.visited) ? saved.visited : [] }
  } catch {
    return { goalId: null, visited: [] }
  }
}

const RecoveryContext = createContext(null)

export function RecoveryProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  }, [state])

  useEffect(() => {
    const onStorage = (e) => e.key === STORAGE_KEY && setState(load())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setGoal = useCallback((goalId) => setState((s) => ({ ...s, goalId })), [])

  const markVisited = useCallback((path) => {
    if (!FIXES[path]) return
    setState((s) => (s.visited.includes(path) ? s : { ...s, visited: [...s.visited, path] }))
  }, [])

  const value = useMemo(() => {
    const goal = GOALS.find((g) => g.id === state.goalId) || null
    const route = goal?.route || []
    const lift = state.visited.reduce((sum, path) => sum + (route.includes(path) ? ROUTE_LIFT : OTHER_LIFT), 0)
    const growth = STUCK_GROWTH + lift
    const nextStop = route.find((path) => !state.visited.includes(path)) || null
    return {
      goal,
      goals: GOALS,
      route,
      visited: state.visited,
      growth,
      brokeThrough: growth >= BREAKTHROUGH_GROWTH,
      nextStop,
      setGoal,
      markVisited,
    }
  }, [state, setGoal, markVisited])

  return <RecoveryContext.Provider value={value}>{children}</RecoveryContext.Provider>
}

export function useRecovery() {
  const ctx = useContext(RecoveryContext)
  if (!ctx) throw new Error('useRecovery must be used within a RecoveryProvider')
  return ctx
}
