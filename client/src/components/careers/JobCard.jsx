import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Clock, Calendar, ArrowRight } from 'lucide-react'

const JobCard = ({ job, index, onViewDetails, onApply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Job Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {job.title}
      </h3>

      {/* Job Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase size={16} className="text-primary" />
          <span>{job.department}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-primary" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="text-primary" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} className="text-primary" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Posted Date */}
      <div className="text-xs text-gray-500 mb-4">
        Posted {job.postedDate}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewDetails(job)}
          className="flex-1 px-4 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
        >
          View Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onApply(job)}
          className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm flex items-center justify-center gap-2"
        >
          Apply Now
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default JobCard
