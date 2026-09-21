import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FormSelect = ({ label, name, value, onChange, options, required, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <motion.select
          whileFocus={{ scale: 1.01 }}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 rounded-lg border appearance-none transition-all duration-300 focus:outline-none focus:ring-2 pr-10 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-primary focus:border-primary'
          }`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default FormSelect
