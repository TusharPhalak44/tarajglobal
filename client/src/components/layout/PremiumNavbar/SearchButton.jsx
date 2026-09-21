import React from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const SearchButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-full text-text-primary hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Search"
    >
      <Search size={24} strokeWidth={1.5} />
    </motion.button>
  )
}

export default SearchButton
