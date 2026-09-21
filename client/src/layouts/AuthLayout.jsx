import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,166,255,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 75% 65%, rgba(255,109,0,0.05) 0%, transparent 60%)
          `,
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,166,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
