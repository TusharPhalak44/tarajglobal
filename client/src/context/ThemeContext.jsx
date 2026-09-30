import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(undefined)

export const ThemeProvider = ({ children }) => {
  // Hardcode theme to dark and disable theme toggling
  const getInitialTheme = () => {
    return 'dark'
  }

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    
    // Save to localStorage
    localStorage.setItem('theme', 'dark')
  }, [])

  const toggleTheme = () => {
    // Disabled functionality, app is locked to dark mode
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
