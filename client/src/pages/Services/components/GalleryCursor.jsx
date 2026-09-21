import React, { useEffect, useState } from 'react'

export const GalleryCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [label, setLabel] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    // Disable on touch devices or screens smaller than 1024px
    if (typeof window !== 'undefined') {
      const checkTouch = () => {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024
        setIsTouchDevice(hasTouch)
      }
      checkTouch()
      window.addEventListener('resize', checkTouch)

      const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY })

        // Check if hovering an element with data-cursor-label
        const target = e.target.closest('[data-cursor-label]')
        if (target) {
          const cursorText = target.getAttribute('data-cursor-label')
          setLabel(cursorText || 'VIEW')
          setIsActive(true)
        } else {
          setLabel('')
          setIsActive(false)
        }
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      return () => {
        window.removeEventListener('resize', checkTouch)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Small dot when inactive */}
      {!isActive && (
        <div className="w-3 h-3 rounded-full bg-primary/40 border border-primary/70 transition-all duration-300" />
      )}

      {/* Expanded pill with text when active */}
      {isActive && (
        <div className="px-3 py-1 rounded-full bg-primary text-black font-bold text-[10px] tracking-widest uppercase shadow-xl scale-100 transition-all duration-200 backdrop-blur-md flex items-center justify-center border border-white/20">
          {label}
        </div>
      )}
    </div>
  )
}

export default GalleryCursor
