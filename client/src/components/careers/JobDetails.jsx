import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Briefcase, Clock, Calendar, ArrowRight } from 'lucide-react'

const JobDetails = ({ job, onClose, onApply }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} className="text-primary" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Qualifications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {job.qualifications}
              </p>
            </div>

            {/* Experience Required */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Experience Required
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {job.experienceRequired}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onApply(job)}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default JobDetails
