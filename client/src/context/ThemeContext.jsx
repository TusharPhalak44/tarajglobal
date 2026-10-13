import React, { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark' })

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.removeItem('theme')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
