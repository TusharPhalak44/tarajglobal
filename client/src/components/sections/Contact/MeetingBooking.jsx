import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Video,
  Clock,
  ExternalLink,
  AlertCircle,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  Briefcase
} from 'lucide-react'
import { publicAPI } from '@api/public.api'

const INTEREST_OPTIONS = [
  'B2B Lead Generation',
  'Account-Based Marketing (ABM)',
  'B2B Appointment Setting',
  'Content Syndication',
  'Sales Qualified Leads (SQL)',
  'Demand Generation',
  'B2B List Building & Data Cleansing',
  'Other / Custom Strategy'
]

const MeetingBooking = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: null,
    dateStr: '',
    time: null,
    time24: '',
    endTime: '',
    fullName: '',
    email: '',
    company: '',
    phone: '',
    interest: 'B2B Lead Generation',
    message: '',
    timeZone: 'Asia/Kolkata'
  })

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [confirmedDetails, setConfirmedDetails] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [formErrors, setFormErrors] = useState({})

  // Reset errors on step change
  useEffect(() => {
    setSubmitError('')
    setFormErrors({})
  }, [currentStep])

  // Prevent background scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow || 'unset'
      }
    }
  }, [isOpen])

  // Fetch slots whenever date changes
  const fetchSlotsForDate = async (selectedDate) => {
    if (!selectedDate) return
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    setLoadingSlots(true)
    setSlotsError('')
    try {
      const response = await publicAPI.getMeetingAvailability(dateStr)
      if (response.data && response.data.success) {
        setAvailableSlots(response.data.slots || [])
      } else {
        setAvailableSlots([])
      }
    } catch (error) {
      console.error('Failed to load slots:', error)
      setSlotsError('Could not fetch available slots for this date. Please try another day.')
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  // Generate calendar days for monthly view
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

    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i)
      const isPast = date < today
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      days.push({
        day: i,
        date,
        isPast,
        isWeekend
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handleDateSelect = (dayObj) => {
    if (!dayObj || dayObj.isPast || dayObj.isWeekend) return

    const year = dayObj.date.getFullYear()
    const month = String(dayObj.date.getMonth() + 1).padStart(2, '0')
    const day = String(dayObj.date.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    setBookingData(prev => ({
      ...prev,
      date: dayObj.date,
      dateStr,
      time: null,
      time24: '',
      endTime: ''
    }))

    fetchSlotsForDate(dayObj.date)
    setTimeout(() => setCurrentStep(2), 250)
  }

  const handleTimeSelect = (slot) => {
    if (!slot.available) return
    setBookingData(prev => ({
      ...prev,
      time: slot.time,
      time24: slot.time24,
      endTime: slot.endTime
    }))
    setTimeout(() => setCurrentStep(3), 250)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!bookingData.fullName.trim()) {
      errors.fullName = 'Full name is required.'
    }
    if (!bookingData.email.trim()) {
      errors.email = 'Business email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email.trim())) {
      errors.email = 'Please enter a valid business email address.'
    }
    if (!bookingData.phone.trim()) {
      errors.phone = 'Phone number is required.'
    } else if (bookingData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number.'
    }
    if (!bookingData.company.trim()) {
      errors.company = 'Company name is required.'
    }
    if (!bookingData.interest) {
      errors.interest = 'Please select an area of interest.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleConfirm = async () => {
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        fullName: bookingData.fullName.trim(),
        email: bookingData.email.trim().toLowerCase(),
        company: bookingData.company.trim(),
        phone: bookingData.phone.trim(),
        interest: bookingData.interest,
        message: bookingData.message.trim(),
        date: bookingData.dateStr,
        time: bookingData.time,
        timeZone: 'Asia/Kolkata'
      }

      const response = await publicAPI.bookMeeting(payload)

      if (response.data && response.data.success) {
        setConfirmedDetails(response.data.data)
        setIsSuccess(true)
      } else {
        setSubmitError(response.data?.message || 'Could not schedule meeting. Please try again.')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      if (error.response?.status === 409) {
        setSubmitError('This time slot was just booked by another visitor. Please select another available time.')
        // Automatically bounce back to Step 2 so user can select an open slot
        if (bookingData.date) {
          fetchSlotsForDate(bookingData.date)
        }
        setTimeout(() => setCurrentStep(2), 1200)
      } else {
        const errorMsg = error.response?.data?.message || error.message || 'Unable to schedule the meeting. Please try again.'
        setSubmitError(errorMsg)
      }
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
    if (currentStep === 1 && !bookingData.date) return
    if (currentStep === 2 && !bookingData.time) return
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setBookingData({
      date: null,
      dateStr: '',
      time: null,
      time24: '',
      endTime: '',
      fullName: '',
      email: '',
      company: '',
      phone: '',
      interest: 'B2B Lead Generation',
      message: '',
      timeZone: 'Asia/Kolkata'
    })
    setIsSuccess(false)
    setConfirmedDetails(null)
    setSubmitError('')
    setFormErrors({})
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const steps = [
    { number: 1, label: 'Select Date' },
    { number: 2, label: 'Select Time' },
    { number: 3, label: 'Your Details' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-[#111622] rounded-3xl border border-slate-200 dark:border-white/10 w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 flex-shrink-0">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00A6FF] block">
              Taraj Global &bull; Strategic Revenue Pod
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
              {isSuccess ? 'Strategy Call Confirmed' : 'Book a Strategy Call'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-text-muted hover:text-text-primary rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator (hidden on success) */}
        {!isSuccess && (
          <div className="px-6 py-3 border-b border-slate-200/60 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.015] flex-shrink-0">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((step, index) => {
                const isPassed = currentStep > step.number
                const isCurrent = currentStep === step.number

                return (
                  <div key={step.number} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isPassed
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-[#00A6FF] text-white shadow-md shadow-[#00A6FF]/30'
                            : 'bg-slate-200 dark:bg-white/10 text-text-muted'
                        }`}
                      >
                        {isPassed ? <CheckCircle className="w-4 h-4" /> : step.number}
                      </div>
                      <span
                        className={`text-xs font-medium hidden sm:inline ${
                          isCurrent
                            ? 'text-[#00A6FF] font-bold'
                            : isPassed
                            ? 'text-emerald-500'
                            : 'text-text-muted'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-3 transition-colors duration-300 ${
                          isPassed ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0 no-scrollbar">
          <AnimatePresence mode="wait">
            {/* SUCCESS SCREEN */}
            {isSuccess && confirmedDetails ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-4 text-center"
              >
                {/* Checkmark Badge */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
                  <CheckCircle className="w-9 h-9" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                  ✓ Booking Confirmed &amp; Calendar Synced
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-2">
                  Strategy Call Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto mb-6">
                  Your session has been locked into our calendar and an invitation has been delivered to{' '}
                  <strong className="text-text-primary">{confirmedDetails.email}</strong>.
                </p>

                {/* Primary Card with Meeting Details & Google Meet Link */}
                <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl p-5 mb-6 text-left max-w-lg mx-auto shadow-sm">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-white/10">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-[#00A6FF]">
                        Session Topic
                      </span>
                      <h4 className="text-base font-bold text-text-primary">
                        {confirmedDetails.interest || 'B2B Revenue Strategy Call'}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-bold uppercase">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-start gap-2">
                      <CalendarIcon size={14} className="text-[#00A6FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-text-muted block">Date</span>
                        <span className="font-semibold text-text-primary">
                          {new Date(confirmedDetails.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-[#00A6FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-text-muted block">Time &amp; Timezone</span>
                        <span className="font-semibold text-text-primary">
                          {confirmedDetails.time} ({confirmedDetails.timezone || 'IST'})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <User size={14} className="text-[#00A6FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-text-muted block">Attendee</span>
                        <span className="font-semibold text-text-primary">
                          {confirmedDetails.fullName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Building size={14} className="text-[#00A6FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-text-muted block">Company</span>
                        <span className="font-semibold text-text-primary">
                          {confirmedDetails.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Google Meet Link Display */}
                  {confirmedDetails.meetingLink && (
                    <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/10">
                      <span className="text-[11px] font-mono text-text-muted block mb-2">
                        Meeting Access Point
                      </span>
                      <a
                        href={confirmedDetails.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00A6FF] to-[#0080FF] text-white font-semibold text-xs sm:text-sm hover:shadow-lg hover:shadow-[#00A6FF]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Video size={16} />
                        <span>Join Google Meet Room</span>
                        <ExternalLink size={13} className="ml-0.5" />
                      </a>
                    </div>
                  )}

                  {/* Google Calendar Link */}
                  {confirmedDetails.calendarLink && (
                    <div className="mt-2 text-center">
                      <a
                        href={confirmedDetails.calendarLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#00A6FF] hover:underline font-medium cursor-pointer"
                      >
                        <CalendarIcon size={12} />
                        <span>Open in Google Calendar</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Schedule Another
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Back to Contact Us
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* STEP 1: DATE SELECTION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-text-primary">Choose Meeting Date</h3>
                        <p className="text-xs text-text-muted">
                          Available Monday through Friday &bull; Timezone: Asia/Kolkata (IST)
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => navigateMonth('prev')}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-text-muted hover:text-text-primary hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigateMonth('next')}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-text-muted hover:text-text-primary hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-center font-bold text-sm text-text-primary mb-3">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
                      {dayNames.map(day => (
                        <div key={day} className="text-center text-[11px] font-mono font-bold text-text-muted py-1">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((dayObj, index) => {
                        if (!dayObj) {
                          return <div key={`empty-${index}`} className="aspect-square" />
                        }

                        const isSelected = bookingData.date && dayObj.date.toDateString() === bookingData.date.toDateString()
                        const isDisabled = dayObj.isPast || dayObj.isWeekend

                        return (
                          <button
                            key={index}
                            disabled={isDisabled}
                            onClick={() => handleDateSelect(dayObj)}
                            className={`aspect-square rounded-xl flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                              isDisabled
                                ? 'text-slate-300 dark:text-white/20 cursor-not-allowed bg-slate-50/50 dark:bg-white/[0.01]'
                                : isSelected
                                ? 'bg-gradient-to-r from-[#00A6FF] to-[#0080FF] text-white shadow-md shadow-[#00A6FF]/30 font-bold scale-105'
                                : 'hover:bg-[#00A6FF]/10 hover:text-[#00A6FF] text-text-primary border border-transparent hover:border-[#00A6FF]/30 cursor-pointer bg-slate-50 dark:bg-white/[0.02]'
                            }`}
                          >
                            {dayObj.day}
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-2 border-t border-slate-200/60 dark:border-white/5">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00A6FF]" />
                        Available Weekdays
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-white/20" />
                        Weekends / Past Dates Unavailable
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: TIME SLOT SELECTION */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-text-primary">Select Available Time Slot</h3>
                        <p className="text-xs text-text-secondary">
                          {bookingData.date?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-[#00A6FF]/10 text-[#00A6FF] text-[10px] font-mono font-bold">
                        30 Min Session
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {loadingSlots ? (
                      <div className="py-16 text-center text-text-muted font-mono text-xs">
                        <span className="inline-block animate-spin mr-2">⟳</span>
                        Fetching real-time slot availability from server...
                      </div>
                    ) : slotsError ? (
                      <div className="py-12 text-center">
                        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-xs text-text-secondary mb-4">{slotsError}</p>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="px-4 py-2 rounded-xl bg-[#00A6FF] text-white text-xs font-semibold cursor-pointer"
                        >
                          Pick Another Date
                        </button>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="py-12 text-center text-text-muted">
                        <p className="text-xs mb-3">No available slots found for this date.</p>
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="px-4 py-2 rounded-xl bg-[#00A6FF] text-white text-xs font-semibold cursor-pointer"
                        >
                          Select Another Date
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                        {availableSlots.map((slot) => {
                          const isSelected = bookingData.time === slot.time

                          return (
                            <button
                              key={slot.time24}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => handleTimeSelect(slot)}
                              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer ${
                                !slot.available
                                  ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5 text-text-muted line-through'
                                  : isSelected
                                  ? 'bg-[#00A6FF] border-[#00A6FF] text-white shadow-md shadow-[#00A6FF]/30'
                                  : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-[#00A6FF]/60 hover:bg-[#00A6FF]/5 text-text-primary'
                              }`}
                            >
                              <span>{slot.time}</span>
                              <span className="text-[10px] font-mono opacity-80">
                                {slot.available ? 'Open' : 'Booked'}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: CONTACT INFORMATION & SUMMARY */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Selected Slot Summary Ribbon */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-[#00A6FF]" />
                        <span className="font-semibold text-text-primary">
                          {bookingData.date?.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="text-text-muted">&bull;</span>
                        <Clock size={14} className="text-[#00A6FF]" />
                        <span className="font-semibold text-text-primary">{bookingData.time} IST</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-[11px] font-mono text-[#00A6FF] hover:underline font-bold cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={bookingData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                            formErrors.fullName
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-slate-200 dark:border-white/10 focus:border-[#00A6FF]'
                          }`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[10px] text-red-500 mt-1 block">{formErrors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingData.email}
                          onChange={handleInputChange}
                          placeholder="rahul@company.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                            formErrors.email
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-slate-200 dark:border-white/10 focus:border-[#00A6FF]'
                          }`}
                        />
                        {formErrors.email && (
                          <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                            formErrors.phone
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-slate-200 dark:border-white/10 focus:border-[#00A6FF]'
                          }`}
                        />
                        {formErrors.phone && (
                          <span className="text-[10px] text-red-500 mt-1 block">{formErrors.phone}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={bookingData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. ABC Technologies"
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border text-xs text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                            formErrors.company
                              ? 'border-red-500 focus:border-red-500'
                              : 'border-slate-200 dark:border-white/10 focus:border-[#00A6FF]'
                          }`}
                        />
                        {formErrors.company && (
                          <span className="text-[10px] text-red-500 mt-1 block">{formErrors.company}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Area of Interest *
                      </label>
                      <select
                        name="interest"
                        value={bookingData.interest}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs text-text-primary focus:outline-none focus:border-[#00A6FF] cursor-pointer"
                      >
                        {INTEREST_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="dark:bg-[#111622] text-text-primary">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Brief Note / Primary Goal (Optional)
                      </label>
                      <textarea
                        name="message"
                        rows={2}
                        value={bookingData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us a bit about your current B2B lead generation challenges or targets..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#00A6FF] resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Navigation Footer */}
        {!isSuccess && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.015] flex-shrink-0">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !bookingData.date) ||
                  (currentStep === 2 && !bookingData.time) ||
                  loadingSlots
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A6FF] hover:bg-[#0090e0] text-white text-xs font-bold shadow-md shadow-[#00A6FF]/25 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A6FF] via-[#0080FF] to-[#0060FF] text-white text-xs sm:text-sm font-bold hover:shadow-lg hover:shadow-[#00A6FF]/35 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin">⟳</span>
                    <span>Scheduling your strategy call...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Schedule Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default MeetingBooking
