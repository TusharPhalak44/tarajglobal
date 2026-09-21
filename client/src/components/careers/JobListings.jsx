import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@components/layout/Container'
import JobCard from './JobCard'
import JobDetails from './JobDetails'

const JobListings = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Placeholder data - ready for API integration
  // Expected API: GET /api/careers
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote',
      experience: '5+ years',
      type: 'Full-time',
      postedDate: '2 days ago',
      description: 'We are looking for an experienced React Developer to join our team and build cutting-edge web applications.',
      responsibilities: [
        'Develop and maintain web applications using React 19',
        'Collaborate with design and backend teams',
        'Write clean, maintainable code',
        'Mentor junior developers'
      ],
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      qualifications: 'Bachelors degree in Computer Science or related field',
      experienceRequired: '5+ years of professional React development experience'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'New York, NY',
      experience: '3+ years',
      type: 'Full-time',
      postedDate: '3 days ago',
      description: 'Join our design team to create beautiful and intuitive user experiences for our products.',
      responsibilities: [
        'Create wireframes and prototypes',
        'Conduct user research and testing',
        'Collaborate with developers',
        'Maintain design systems'
      ],
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      qualifications: 'Bachelors degree in Design or related field',
      experienceRequired: '3+ years of UI/UX design experience'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      experience: '4+ years',
      type: 'Full-time',
      postedDate: '1 week ago',
      description: 'Lead our marketing initiatives and drive growth through innovative campaigns.',
      responsibilities: [
        'Develop and execute marketing strategies',
        'Manage marketing budget',
        'Analyze campaign performance',
        'Lead marketing team'
      ],
      skills: ['Digital Marketing', 'SEO', 'Analytics', 'Team Leadership'],
      qualifications: 'Bachelors degree in Marketing or Business',
      experienceRequired: '4+ years of marketing experience'
    },
    {
      id: 4,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      experience: '4+ years',
      type: 'Full-time',
      postedDate: '5 days ago',
      description: 'Build robust backend systems and APIs to power our applications.',
      responsibilities: [
        'Design and implement RESTful APIs',
        'Optimize database performance',
        'Ensure system security',
        'Collaborate with frontend team'
      ],
      skills: ['Node.js', 'Express', 'MySQL', 'AWS'],
      qualifications: 'Bachelors degree in Computer Science',
      experienceRequired: '4+ years of backend development experience'
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Remote',
      experience: '2+ years',
      type: 'Full-time',
      postedDate: '1 week ago',
      description: 'Transform data into actionable insights to drive business decisions.',
      responsibilities: [
        'Analyze complex datasets',
        'Create reports and dashboards',
        'Identify trends and patterns',
        'Present findings to stakeholders'
      ],
      skills: ['SQL', 'Python', 'Tableau', 'Data Visualization'],
      qualifications: 'Bachelors degree in Data Science or Statistics',
      experienceRequired: '2+ years of data analysis experience'
    },
    {
      id: 6,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      experience: '5+ years',
      type: 'Full-time',
      postedDate: '2 weeks ago',
      description: 'Drive product strategy and lead cross-functional teams to deliver exceptional products.',
      responsibilities: [
        'Define product roadmap',
        'Gather and prioritize requirements',
        'Work with engineering and design',
        'Measure product success'
      ],
      skills: ['Product Strategy', 'Agile', 'User Research', 'Stakeholder Management'],
      qualifications: 'MBA or equivalent experience',
      experienceRequired: '5+ years of product management experience'
    }
  ]

  const handleViewDetails = (job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleApply = (job) => {
    // Expected API: POST /api/applications
    console.log('Apply for job:', job.id)
    // Implement application form or redirect
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Open Positions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Join Our Team
          </h2>
          <p className="text-lg text-gray-600">
            Explore our current job openings and find the perfect role to advance your career.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* Job Details Modal */}
        {isModalOpen && selectedJob && (
          <JobDetails job={selectedJob} onClose={handleCloseModal} onApply={handleApply} />
        )}
      </Container>
    </section>
  )
}

export default JobListings
