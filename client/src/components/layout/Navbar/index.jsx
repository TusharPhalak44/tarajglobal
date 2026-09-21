import React, { useState, useEffect, useCallback, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Container from '../Container'
import ThemeToggle from '../PremiumNavbar/ThemeToggle'
import { cmsAPI } from '@api/cms.api'

// Text scramble animation hook
const useTextScramble = (text, isScrambling, duration = 1000, delay = 0) => {
  const [scrambledText, setScrambledText] = useState(text)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrambledText(text)
      return
    }

    if (!isScrambling) {
      setScrambledText(text)
      return
    }

    // Clear any existing timeouts/intervals
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)

    // Start scramble after delay
    timeoutRef.current = setTimeout(() => {
      const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      let iterations = 0
      const totalIterations = Math.floor(duration / 50)

      intervalRef.current = setInterval(() => {
        setScrambledText((prev) => {
          return text
            .split('')
            .map((letter, index) => {
              if (index < iterations / 3) {
                return text[index]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        })

        iterations += 1

        if (iterations >= totalIterations) {
          clearInterval(intervalRef.current)
          setScrambledText(text)
        }
      }, 50)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, isScrambling, duration, delay, prefersReducedMotion])

  return scrambledText
}

// Scramble text component with hover support
const ScrambleText = ({ text, isScrambling, duration = 1000, delay = 0, className = '', isHovered = false }) => {
  const scrambledText = useTextScramble(text, isScrambling || isHovered, isHovered ? 300 : duration, delay)
  return <span className={className}>{scrambledText}</span>
}

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([])
  const [loadingNav, setLoadingNav] = useState(true)
  const [logoUrl, setLogoUrl] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isNavHovered, setIsNavHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const location = useLocation()

  // Hardcoded Services dropdown structure (complex nested structure)
  const servicesDropdown = {
    name: 'Services',
    path: '/services',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'Lead Generation Services',
        path: '/services/lead-generation',
        hasSubDropdown: true,
        subItems: [
          { name: 'Sales Qualified Leads', path: '/services/lead-generation/sales-qualified' },
          { name: 'Bant Leads', path: '/services/lead-generation/bant-leads' },
          { name: 'Marketing Qualified Leads', path: '/services/lead-generation/marketing-qualified' },
          { name: 'Appointment Setting', path: '/services/lead-generation/appointment-setting' },
          { name: 'Email Marketing', path: '/services/lead-generation/email-marketing' },
          { name: 'Account Based Marketing', path: '/services/lead-generation/account-based' },
          { name: 'Content Syndication', path: '/services/lead-generation/content-syndication' },
          { name: 'Webinar Registration', path: '/services/lead-generation/webinar-registration' },
          { name: 'Lead Nurturing', path: '/services/lead-generation/lead-nurturing' },
          { name: 'Demand Generation', path: '/services/lead-generation/demand-generation' }
        ]
      },
      {
        name: 'Database Services',
        path: '/services/database',
        hasSubDropdown: true,
        subItems: [
          { name: 'B2B List Building', path: '/services/database/b2b-list-building' },
          { name: 'Database Cleansing', path: '/services/database/database-cleansing' }
        ]
      }
    ]
  }

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const response = await cmsAPI.getNavbarItems()
        const items = response.data || []
        
        // Convert API data to navLinks format
        const convertedLinks = items
          .filter(item => item.is_active && !item.parent_id && item.section === 'navbar')
          .map(item => {
            // Check if this is the Services item
            if (item.label === 'Services') {
              return servicesDropdown
            }
            return {
              name: item.label,
              path: item.url
            }
          })
          .sort((a, b) => {
            const aIndex = items.find(i => i.label === a.name)?.display_order || 0
            const bIndex = items.find(i => i.label === b.name)?.display_order || 0
            return aIndex - bIndex
          })
        
        setNavLinks(convertedLinks)
      } catch (error) {
        console.error('Failed to fetch navbar items:', error)
        // Fallback to hardcoded links if API fails
        setNavLinks([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
          servicesDropdown,
          { name: 'Careers', path: '/careers' },
          { name: 'Blogs', path: '/blog' },
          { name: 'Contact Us', path: '/contact' },
        ])
      } finally {
        setLoadingNav(false)
      }
    }

    const fetchLogo = async () => {
      try {
        const response = await cmsAPI.getLogo()
        setLogoUrl(response.data?.logo_url || '')
      } catch (error) {
        console.error('Failed to fetch logo:', error)
      }
    }

    fetchNavbarItems()
    fetchLogo()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleDropdownToggle = useCallback((index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }, [activeDropdown])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu()
    }
  }, [isMobileMenuOpen, closeMobileMenu])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen, handleKeyDown])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-hero/95 backdrop-blur-xl border-b border-border/30'
              : 'bg-transparent'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Container>
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <NavLink 
                to="/" 
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                aria-label="Taraj Global Home"
              >
                {logoUrl ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={logoUrl}
                    alt="Taraj Global Logo"
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold text-primary"
                  >
                    Taraj Global
                  </motion.div>
                )}
              </NavLink>

              {/* Desktop Navigation */}
              <nav 
                className="hidden lg:flex items-center space-x-8" 
                aria-label="Desktop navigation"
                onMouseEnter={() => setIsNavHovered(true)}
                onMouseLeave={() => {
                  setIsNavHovered(false)
                  setHoveredItem(null)
                }}
              >
                {navLinks.map((link, index) => (
                  <div key={link.name} className="relative group">
                    {link.hasDropdown ? (
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        onMouseEnter={() => setHoveredItem(link.name)}
                        className={`text-sm font-medium transition-all duration-300 relative py-2 flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg ${
                          isNavHovered && hoveredItem !== link.name
                            ? 'opacity-30 blur-[3px] scale-95'
                            : 'opacity-100 blur-0 scale-100'
                        }`}
                        aria-expanded={activeDropdown === index}
                        aria-haspopup="true"
                      >
                        {link.name}
                        <ChevronDown 
                          size={16} 
                          className={`ml-1 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                        <motion.span
                          className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                            activeDropdown === index ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={link.path}
                        onMouseEnter={() => setHoveredItem(link.name)}
                        className={({ isActive }) => `text-sm font-medium transition-all duration-300 relative py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg ${
                          isActive
                            ? 'text-primary'
                            : 'text-text-primary hover:text-accent'
                        } ${
                          isNavHovered && hoveredItem !== link.name
                            ? 'opacity-30 blur-[3px] scale-95'
                            : 'opacity-100 blur-0 scale-100'
                        }`}
                      >
                        {link.name}
                        <motion.span
                          className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                            location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </NavLink>
                    )}
                    
                    {/* Dropdown Menu */}
                    {link.hasDropdown && activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-surface rounded-lg shadow-lg border border-border/30 py-2 z-50"
                        role="menu"
                      >
                        {link.dropdownItems?.map((item, itemIndex) => (
                          <div key={item.name} className="relative group/sub">
                            {item.hasSubDropdown ? (
                              <div className="relative">
                                <button
                                  onClick={() => setActiveSubDropdown(activeSubDropdown === itemIndex ? null : itemIndex)}
                                  className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-primary/10 hover:text-accent focus:outline-none focus:bg-primary/10 flex items-center justify-between"
                                  role="menuitem"
                                >
                                  {item.name}
                                  <ChevronDown size={14} className={`ml-2 transition-transform ${activeSubDropdown === itemIndex ? 'rotate-180' : ''}`} />
                                </button>
                                {activeSubDropdown === itemIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="absolute left-full top-0 ml-2 w-64 bg-surface rounded-lg shadow-lg border border-border/30 py-2 z-50"
                                  >
                                    {item.subItems?.map((subItem) => (
                                      <NavLink
                                        key={subItem.name}
                                        to={subItem.path}
                                        className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/10 hover:text-accent focus:outline-none focus:bg-primary/10"
                                        role="menuitem"
                                      >
                                        {subItem.name}
                                      </NavLink>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            ) : (
                              <NavLink
                                to={item.path}
                                className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/10 hover:text-primary focus:outline-none focus:bg-primary/10"
                                role="menuitem"
                              >
                                {item.name}
                              </NavLink>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Theme Toggle */}
              <div className="hidden lg:block mr-4">
                <ThemeToggle />
              </div>

              {/* CTA Button */}
              <div className="hidden lg:block">
                <NavLink
                  to="/contact"
                  className="inline-block"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-cta to-accent text-text-primary hover:from-cta-hover hover:to-accent focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 shadow-lg shadow-cta/20"
                  >
                    Get Started
                  </motion.button>
                </NavLink>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-colors text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </Container>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-surface z-50 lg:hidden overflow-y-auto shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={closeMobileMenu}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>

                {/* Mobile Logo */}
                <div className="mb-8 pt-4">
                  <NavLink 
                    to="/" 
                    className="text-2xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                    onClick={closeMobileMenu}
                  >
                    GlobalCorp
                  </NavLink>
                </div>

                {/* Theme Toggle in Mobile Menu */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">Theme</span>
                  <ThemeToggle />
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2" aria-label="Mobile navigation">
                  {navLinks.map((link, index) => (
                    <div key={link.name}>
                      {link.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => handleDropdownToggle(link.name)}
                            className="w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors text-text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-expanded={activeDropdown === link.name}
                            onMouseEnter={() => setHoveredItem(link.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <span className="font-medium">
                              <ScrambleText 
                                text={link.name} 
                                isScrambling={isMobileMenuOpen} 
                                duration={800}
                                delay={index * 100}
                                isHovered={hoveredItem === link.name}
                              />
                            </span>
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-200 ${
                                activeDropdown === link.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {link.dropdownItems?.map((item, itemIndex) => (
                                <div key={item.name}>
                                  {item.hasSubDropdown ? (
                                    <div>
                                      <button
                                        onClick={() => setActiveSubDropdown(activeSubDropdown === itemIndex ? null : itemIndex)}
                                        className="w-full flex items-center justify-between py-2 px-4 text-sm text-text-secondary hover:bg-primary/10 hover:text-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        onMouseEnter={() => setHoveredItem(item.name)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                      >
                                        <ScrambleText 
                                          text={item.name} 
                                          isScrambling={activeDropdown === link.name} 
                                          duration={600}
                                          delay={itemIndex * 50}
                                          isHovered={hoveredItem === item.name}
                                        />
                                        <ChevronDown size={14} className={`ml-2 transition-transform ${activeSubDropdown === itemIndex ? 'rotate-180' : ''}`} />
                                      </button>
                                      {activeSubDropdown === itemIndex && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="pl-4 space-y-1 mt-1"
                                        >
                                          {item.subItems?.map((subItem, subIndex) => (
                                            <NavLink
                                              key={subItem.name}
                                              to={subItem.path}
                                              className="block py-2 px-4 text-sm text-text-secondary hover:bg-primary/10 hover:text-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                              onClick={closeMobileMenu}
                                              onMouseEnter={() => setHoveredItem(subItem.name)}
                                              onMouseLeave={() => setHoveredItem(null)}
                                            >
                                              <ScrambleText 
                                                text={subItem.name} 
                                                isScrambling={activeSubDropdown === itemIndex} 
                                                duration={500}
                                                delay={subIndex * 30}
                                                isHovered={hoveredItem === subItem.name}
                                              />
                                            </NavLink>
                                          ))}
                                        </motion.div>
                                      )}
                                    </div>
                                  ) : (
                                    <NavLink
                                      to={item.path}
                                      className="block py-2 px-4 text-sm text-text-secondary hover:bg-primary/10 hover:text-highlight rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                      onClick={closeMobileMenu}
                                      onMouseEnter={() => setHoveredItem(item.name)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      <ScrambleText 
                                        text={item.name} 
                                        isScrambling={activeDropdown === link.name} 
                                        duration={600}
                                        delay={itemIndex * 50}
                                        isHovered={hoveredItem === item.name}
                                      />
                                    </NavLink>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          to={link.path}
                          onClick={closeMobileMenu}
                          className={({ isActive }) => `block py-3 px-4 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                            isActive
                              ? 'bg-primary text-text-primary'
                              : 'text-text-primary hover:bg-primary/10'
                          }`}
                          onMouseEnter={() => setHoveredItem(link.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <ScrambleText 
                            text={link.name} 
                            isScrambling={isMobileMenuOpen} 
                            duration={800}
                            delay={index * 100}
                            isHovered={hoveredItem === link.name}
                          />
                        </NavLink>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-8">
                  <NavLink to="/contact" onClick={closeMobileMenu}>
                    <button className="w-full py-3 bg-gradient-to-r from-cta to-accent text-text-primary rounded-lg font-semibold hover:from-cta-hover hover:to-accent transition-all focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 shadow-lg shadow-cta/20">
                      Get Started
                    </button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
