import React from 'react'

export default function WorkflowSvgConnectors({
  activeStepIndex = 0,
  isReducedMotion = false,
}) {
  // All 9 workflow segments connecting strictly:
  // 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → Target Goal
  const connectors = [
    {
      id: '01-to-02',
      from: 0,
      to: 1,
      d: 'M 580 77.5 L 736 77.52',
      node: { x: 580, y: 77.5 },
      dur: '1.2s',
      activeOn: 0,
    },
    {
      id: '02-to-03',
      from: 1,
      to: 2,
      d: 'M 840 144 L 840 155 Q 840 167.5 825 167.5 L 135 167.5 Q 120 167.5 120 180 L 120 191',
      node: { x: 840, y: 140 },
      dur: '2.0s',
      activeOn: 1,
    },
    {
      id: '03-to-04',
      from: 2,
      to: 3,
      d: 'M 220 260 L 256 260.02',
      node: { x: 220, y: 260 },
      dur: '0.8s',
      activeOn: 2,
    },
    {
      id: '04-to-05',
      from: 3,
      to: 4,
      d: 'M 460 260 L 496 260.02',
      node: { x: 460, y: 260 },
      dur: '0.8s',
      activeOn: 3,
    },
    {
      id: '05-to-06',
      from: 4,
      to: 5,
      d: 'M 700 260 L 736 260.02',
      node: { x: 700, y: 260 },
      dur: '0.8s',
      activeOn: 4,
    },
    {
      id: '06-to-07',
      from: 5,
      to: 6,
      d: 'M 940 260 L 976 260.02',
      node: { x: 940, y: 260 },
      dur: '0.8s',
      activeOn: 5,
    },
    {
      id: '07-to-08',
      from: 6,
      to: 7,
      d: 'M 1140 327 L 1140 338 Q 1140 350 1125 350 L 645 350 Q 630 350 630 362 L 630 371',
      node: { x: 1140, y: 325 },
      dur: '2.0s',
      activeOn: 6,
    },
    {
      id: '08-to-09',
      from: 7,
      to: 8,
      d: 'M 730 440 L 976 440.02',
      node: { x: 730, y: 440 },
      dur: '1.2s',
      activeOn: 7,
    },
    {
      id: '09-to-goal',
      from: 8,
      to: 9,
      d: 'M 1184 440 C 1235 440, 1255 385, 1268 328',
      node: { x: 1180, y: 440 },
      dur: '1.4s',
      activeOn: 8,
    },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
      viewBox="0 0 1400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes unifiedDashFlow {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }
          .unified-connector-dash {
            animation: unifiedDashFlow 1.4s linear infinite;
          }
        `}</style>

        <linearGradient
          id="cyanConnectorGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1400"
          y2="520"
        >
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="35%" stopColor="#00d2ff" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#00f0ff" />
        </linearGradient>

        <marker
          id="cyan-flow-arrowhead"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="4.5"
          markerHeight="4.5"
          orient="auto"
        >
          <path
            d="M 1 1.5 L 8 5 L 1 8.5 Z"
            fill="#0284c7"
            className="fill-sky-500 dark:fill-[#00d2ff]"
          />
        </marker>

        <marker
          id="active-flow-arrowhead"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path
            d="M 1 1 L 9 5 L 1 9 Z"
            fill="#00e5ff"
            className="fill-sky-400 dark:fill-[#00f0ff]"
          />
        </marker>
      </defs>

      {connectors.map((c) => {
        const isCurrentActive = activeStepIndex === c.activeOn
        const isCompleted = activeStepIndex > c.activeOn

        return (
          <g key={`unified-flow-${c.id}`}>
            {c.node && (
              <g className="transition-transform duration-300">
                <circle
                  cx={c.node.x}
                  cy={c.node.y}
                  r={isCurrentActive ? 4.5 : 3.5}
                  fill="#00e5ff"
                  className="fill-sky-500 dark:fill-[#00e5ff]"
                  style={{ filter: 'drop-shadow(0 0 4px #00d2ff)' }}
                  opacity={isCurrentActive ? 1 : isCompleted ? 0.95 : 0.8}
                />
                <circle
                  cx={c.node.x}
                  cy={c.node.y}
                  r={isCurrentActive ? 2 : 1.5}
                  fill="#ffffff"
                />
              </g>
            )}

            {isCurrentActive && (
              <path
                d={c.d}
                stroke="#00d2ff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.35"
                style={{ filter: 'drop-shadow(0 0 6px #00e5ff)' }}
              />
            )}

            <path
              id={`path-${c.id}`}
              d={c.d}
              stroke="url(#cyanConnectorGradient)"
              strokeWidth={isCurrentActive ? '3.5' : '2.6'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={isCurrentActive ? '7 4' : '6 5'}
              opacity={isCurrentActive ? 1 : isCompleted ? 0.9 : 0.75}
              markerEnd={isCurrentActive ? 'url(#active-flow-arrowhead)' : 'url(#cyan-flow-arrowhead)'}
              className={`stroke-sky-500 dark:stroke-[#00d2ff] ${!isReducedMotion ? 'unified-connector-dash' : ''}`}
              style={{ filter: 'drop-shadow(0 0 3px rgba(0, 180, 255, 0.5))' }}
            >
              {!isReducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="24"
                  to="0"
                  dur={isCurrentActive ? '0.7s' : '1.3s'}
                  repeatCount="indefinite"
                />
              )}
            </path>

            {!isReducedMotion && (
              <g>
                {isCurrentActive && (
                  <circle
                    r="8"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                    opacity="0.8"
                    style={{ filter: 'drop-shadow(0 0 5px #00f0ff)' }}
                  >
                    <animateMotion
                      path={c.d}
                      dur={c.dur ? `${parseFloat(c.dur) * 0.75}s` : '1.0s'}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                )}

                <circle
                  r={isCurrentActive ? 5 : 3.5}
                  fill={isCurrentActive ? '#00f0ff' : '#38bdf8'}
                  opacity={isCurrentActive ? 1 : isCompleted ? 0.9 : 0.75}
                  style={{ filter: 'drop-shadow(0 0 5px #00f0ff)' }}
                >
                  <animateMotion
                    path={c.d}
                    dur={isCurrentActive ? (c.dur ? `${parseFloat(c.dur) * 0.75}s` : '1.0s') : c.dur}
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </circle>

                <circle
                  r={isCurrentActive ? 2.5 : 1.8}
                  fill="#ffffff"
                  opacity={1}
                >
                  <animateMotion
                    path={c.d}
                    dur={isCurrentActive ? (c.dur ? `${parseFloat(c.dur) * 0.75}s` : '1.0s') : c.dur}
                    repeatCount="indefinite"
                    rotate="auto"
                  />
                </circle>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}
