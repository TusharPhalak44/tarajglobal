import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react'
import { publicAPI } from '@api/public.api'

const MeetingBooking = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    fullName: '',
    email: '',
    company: '',
    phone: ''
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDay = firstDay.getDay()
    const totalDays = lastDay.getDate()
    
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i)
      days.push({
        day: i,
        date: date,
        isPast: date < today,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handleDateSelect = (date) => {
    if (!date.isPast && !date.isWeekend) {
      setBookingData(prev => ({ ...prev, date: date.date }))
      setTimeout(() => setCurrentStep(2), 300)
    }
  }

  const handleTimeSelect = (time) => {
    setBookingData(prev => ({ ...prev, time }))
    setTimeout(() => setCurrentStep(3), 300)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleConfirm = async () => {
    // Validate form
    if (!bookingData.fullName || !bookingData.email || !bookingData.company) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await publicAPI.bookMeeting({
        fullName: bookingData.fullName,
        email: bookingData.email,
        company: bookingData.company,
        phone: bookingData.phone,
        date: bookingData.date.toISOString(),
        time: bookingData.time,
        timeZone: 'Asia/Kolkata' // Default timezone
      })
      
      // Check if email was sent successfully
      if (response.data.emailWarning) {
        // Meeting booked but email failed
        setIsSuccess(true)
        // Store warning to show in success message
        setBookingData(prev => ({ ...prev, emailWarning: true }))
      } else {
        // Meeting booked and email sent successfully
        setIsSuccess(true)
        setBookingData(prev => ({ ...prev, emailWarning: false }))
      }
    } catch (error) {
      console.error('Failed to book meeting:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to book meeting. Please try again.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setBookingData({
      date: null,
      time: null,
      fullName: '',
      email: '',
      company: '',
      phone: ''
    })
    setIsSuccess(false)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const steps = [
    { number: 1, label: 'Date' },
    { number: 2, label: 'Time' },
    { number: 3, label: 'Confirm' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2.5 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface rounded-2xl border border-border w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Schedule a Meeting</h2>
          <button
            onClick={handleClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-primary text-white'
                        : 'bg-surface border border-border text-text-muted'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      currentStep === step.number
                        ? 'text-primary font-medium'
                        : currentStep > step.number
                        ? 'text-green-500'
                        : 'text-text-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Your meeting has been successfully scheduled!
                </h3>
                <p className="text-text-secondary mb-6">
                  {bookingData.emailWarning 
                    ? `Meeting confirmed. A confirmation email will be sent to ${bookingData.email} shortly.`
                    : `Confirmation details have been sent to ${bookingData.email}`
                  }
                </p>
                
                <div className="bg-surface border border-border rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center border-2 border-primary">
                      <span className="text-xl font-bold text-primary">
                        {bookingData.date?.getDate()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted text-center mb-1 uppercase">
                    {bookingData.date?.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                  <h4 className="text-base font-semibold text-text-primary text-center mb-2">
                    Book an appointment
                  </h4>
                  <p className="text-sm text-text-secondary text-center">
                    {bookingData.date?.toLocaleDateString('en-US', { weekday: 'long' })} · {bookingData.time}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={handleReset}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    Need to change?
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-sm text-error hover:text-error-dark transition-colors"
                  >
                    Cancel your appointment
                  </button>
                </div>
                
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Date Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-6">Select a Date</h3>
                    
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h4 className="text-lg font-semibold text-text-primary">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h4>
                      <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-xs sm:text-sm font-medium text-text-muted py-1.5 sm:py-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((day, index) => (
                        <button
                          key={index}
                          disabled={day?.isPast || day?.isWeekend || !day}
                          onClick={() => handleDateSelect(day)}
                          className={`
                            aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-all
                            ${!day ? 'invisible' : ''}
                            ${day?.isPast || day?.isWeekend 
                              ? 'text-text-muted cursor-not-allowed opacity-40' 
                              : 'hover:bg-primary/20 hover:text-primary cursor-pointer'
                            }
                            ${bookingData.date?.toDateString() === day?.date?.toDateString()
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'text-text-primary'
                            }
                          `}
                        >
                          {day?.day}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-text-muted text-center">
                      Select a date to continue. Weekends and past dates are not available.
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Time Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Select a Time</h3>
                    <p className="text-text-secondary mb-6 text-sm sm:text-base">
                      Available times for {bookingData.date?.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>

                    <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            p-2.5 sm:p-4 rounded-xl border-2 text-xs sm:text-sm font-medium min-h-[44px] flex items-center justify-center transition-all
                            ${bookingData.time === time
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50 text-text-primary hover:bg-surface/80'
                            }
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm Meeting */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-6">Confirm Your Meeting</h3>

                    {/* Meeting Summary */}
                    <div className="bg-surface border border-border rounded-xl p-6 mb-6">
                      <h4 className="font-semibold text-text-primary mb-4">Meeting Summary</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Date:</span>
                          <span className="text-text-primary font-medium">
                            {bookingData.date?.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Time:</span>
                          <span className="text-text-primary font-medium">{bookingData.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Meeting Type:</span>
                          <span className="text-text-primary font-medium">Strategy Call</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Duration:</span>
                          <span className="text-text-primary font-medium">30 minutes</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={bookingData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={bookingData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 234 567 8900"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-t border-border">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            {currentStep < 3 ? (
              <motion.button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !bookingData.date) ||
                  (currentStep === 2 && !bookingData.time)
                }
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 min-h-[44px] bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-5 sm:px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-primary to-cta text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Meeting'}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default MeetingBooking
