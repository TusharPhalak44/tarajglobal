import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@context/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-surface/90 dark:bg-white/5 border border-border/80 dark:border-white/10 text-text-secondary hover:text-text-primary hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs cursor-pointer overflow-hidden group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Subtle Specular Glow on Hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-colors duration-200 pointer-events-none" />

      {/* Smooth Icon Switch */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="text-text-primary group-hover:text-primary transition-colors flex items-center justify-center"
          >
            <Moon size={16} strokeWidth={2} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="text-text-primary group-hover:text-primary transition-colors flex items-center justify-center"
          >
            <Sun size={16} strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default ThemeToggle
