import { useContext, createContext } from 'react'

export const LenisContext = createContext(null)

/**
 * Hook to access active global Lenis smooth scroll instance
 * @returns {import('lenis').default | null}
 */
export function useLenis() {
  const context = useContext(LenisContext)
  // Fallback to window.lenis if used outside of direct Context
  return context || (typeof window !== 'undefined' ? window.lenis : null)
}

export default useLenis
