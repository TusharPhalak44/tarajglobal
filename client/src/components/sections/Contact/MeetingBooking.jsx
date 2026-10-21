import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  RefreshCw,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { publicAPI } from '@api/public.api'

const US_TIMEZONES = [
  { id: 'America/New_York', label: 'Eastern Time (ET)', fullLabel: 'Eastern Time - US & Canada', abbr: 'EST', offset: 'UTC-5' },
  { id: 'America/Chicago', label: 'Central Time (CT)', fullLabel: 'Central Time - US & Canada', abbr: 'CST', offset: 'UTC-6' },
  { id: 'America/Denver', label: 'Mountain Time (MT)', fullLabel: 'Mountain Time - US & Canada', abbr: 'MST', offset: 'UTC-7' },
  { id: 'America/Los_Angeles', label: 'Pacific Time (PT)', fullLabel: 'Pacific Time - US & Canada', abbr: 'PST', offset: 'UTC-8' },
]

const MeetingBooking = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTimeZone, setSelectedTimeZone] = useState('America/New_York')
  const [bookingData, setBookingData] = useState({
    bookingId: null,
    date: null,
    time: null,
    fullName: '',
    email: '',
    company: '',
    phone: '',
    emailWarning: false,
    previousSchedule: null
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSuccess, setIsSuccess] = useState(false)
  const [isRescheduledSuccess, setIsRescheduledSuccess] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)
  const [manageStep, setManageStep] = useState('options') // 'options' | 'confirm_cancel'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const currentTz = US_TIMEZONES.find(tz => tz.id === selectedTimeZone) || US_TIMEZONES[0]

  const scrollContainerRef = useRef(null)
  const modalRef = useRef(null)
  const backdropRef = useRef(null)

  const isFormFilled = Boolean(
    bookingData.fullName?.trim() &&
    bookingData.email?.trim() &&
    bookingData.company?.trim()
  )

  const isStepCompleted = (stepNumber) => {
    if (stepNumber === 1) return currentStep > 1 || Boolean(bookingData.date)
    if (stepNumber === 2) return currentStep > 2 || Boolean(bookingData.time)
    if (stepNumber === 3) return isSuccess || isFormFilled
    return false
  }

  // Standard US Business Hours (12-hour AM/PM format)
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM'
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
      if (isRescheduling) {
        // Submit reschedule
        const response = await publicAPI.rescheduleMeeting({
          bookingId: bookingData.bookingId,
          email: bookingData.email,
          fullName: bookingData.fullName,
          company: bookingData.company,
          phone: bookingData.phone,
          oldDate: bookingData.previousSchedule?.date ? bookingData.previousSchedule.date.toISOString() : undefined,
          oldTime: bookingData.previousSchedule?.time,
          date: bookingData.date.toISOString(),
          time: bookingData.time,
          timeZone: selectedTimeZone
        })

        setIsRescheduling(false)
        setIsRescheduledSuccess(true)
        setIsSuccess(true)
      } else {
        // Submit new meeting
        const response = await publicAPI.bookMeeting({
          fullName: bookingData.fullName,
          email: bookingData.email,
          company: bookingData.company,
          phone: bookingData.phone,
          date: bookingData.date.toISOString(),
          time: bookingData.time,
          timeZone: selectedTimeZone
        })

        setIsRescheduledSuccess(false)
        setIsSuccess(true)
        setBookingData(prev => ({
          ...prev,
          bookingId: response.data?.bookingId || prev.bookingId,
          emailWarning: Boolean(response.data?.emailWarning)
        }))
      }
    } catch (error) {
      console.error('Failed to submit meeting:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to process meeting. Please try again.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStartReschedule = () => {
    setShowManageModal(false)
    setManageStep('options')
    setIsRescheduling(true)
    setIsSuccess(false)
    setIsCancelled(false)
    setBookingData(prev => ({
      ...prev,
      previousSchedule: {
        date: prev.date,
        time: prev.time,
        timeZone: selectedTimeZone
      },
      date: null,
      time: null
    }))
    setCurrentStep(1)
  }

  const handleCancelMeeting = async () => {
    setIsCancelling(true)
    try {
      await publicAPI.cancelMeeting({
        bookingId: bookingData.bookingId,
        email: bookingData.email,
        fullName: bookingData.fullName,
        date: bookingData.date ? bookingData.date.toISOString() : undefined,
        time: bookingData.time,
        timeZone: selectedTimeZone
      })

      setShowManageModal(false)
      setManageStep('options')
      setIsSuccess(false)
      setIsCancelled(true)
    } catch (error) {
      console.error('Failed to cancel meeting:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to cancel meeting. Please try again.'
      alert(errorMessage)
    } finally {
      setIsCancelling(false)
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
      bookingId: null,
      date: null,
      time: null,
      fullName: '',
      email: '',
      company: '',
      phone: '',
      emailWarning: false,
      previousSchedule: null
    })
    setSelectedTimeZone('America/New_York')
    setIsSuccess(false)
    setIsRescheduledSuccess(false)
    setIsCancelled(false)
    setIsRescheduling(false)
    setShowManageModal(false)
    setManageStep('options')
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

  // Lock body scroll and pause Lenis when booking modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (window.lenis) {
        window.lenis.stop()
      }
    } else {
      document.body.style.overflow = 'unset'
      if (window.lenis) {
        window.lenis.start()
      }
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (window.lenis) {
        window.lenis.start()
      }
    }
  }, [isOpen])

  // Reset scroll position on step transition
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [currentStep, isSuccess])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Enable direct mousewheel and trackpad scrolling anywhere on the modal screen
  useEffect(() => {
    if (!isOpen) return

    const modalEl = modalRef.current
    const scrollEl = scrollContainerRef.current
    const backdropEl = backdropRef.current
    if (!modalEl || !scrollEl) return

    const handleModalWheel = (e) => {
      // Stop propagation so global Lenis on window does not intercept or cancel the event
      e.stopPropagation()

      // If the cursor is over the header, steps indicator, footer, or modal padding
      // (outside the scrollable content container), forward the wheel delta to scroll the content directly
      if (!scrollEl.contains(e.target)) {
        e.preventDefault()
        scrollEl.scrollTop += e.deltaY
      }
    }

    const handleBackdropWheel = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (scrollEl) {
        scrollEl.scrollTop += e.deltaY
      }
    }

    modalEl.addEventListener('wheel', handleModalWheel, { passive: false })
    if (backdropEl) {
      backdropEl.addEventListener('wheel', handleBackdropWheel, { passive: false })
    }

    return () => {
      modalEl.removeEventListener('wheel', handleModalWheel)
      if (backdropEl) {
        backdropEl.removeEventListener('wheel', handleBackdropWheel)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
      className="fixed inset-0 bg-background dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2.5 sm:p-4"
    >
      <motion.div
        ref={modalRef}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-surface rounded-2xl border border-border w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
              {isCancelled
                ? 'Appointment Cancelled'
                : isRescheduling
                  ? 'Reschedule Meeting'
                  : isSuccess
                    ? (isRescheduledSuccess ? 'Meeting Rescheduled' : 'Meeting Confirmed')
                    : 'Schedule a Meeting'}
            </h2>
            {isRescheduling && (
              <p className="text-xs text-primary font-medium mt-0.5">
                Select your new date & time below
              </p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-text-accent rounded-lg hover:bg-surface/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        {!isSuccess && !isCancelled && (
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isCompleted = isStepCompleted(step.number)
                const isCurrent = currentStep === step.number

                return (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500 text-white shadow-sm shadow-green-500/20'
                            : isCurrent
                              ? 'bg-primary text-white shadow-sm shadow-primary/20'
                              : 'bg-surface border border-border text-text-muted'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`text-sm mt-1 transition-colors duration-300 ${
                          isCompleted
                            ? 'text-green-500 font-medium'
                            : isCurrent
                              ? 'text-primary font-medium'
                              : 'text-text-muted'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-6 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 ${
                          currentStep > step.number || isCompleted ? 'bg-green-500' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 overscroll-contain touch-pan-y"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
          {/* Rescheduling Active Banner */}
          {isRescheduling && !isSuccess && !isCancelled && (
            <div className="mb-5 p-3.5 rounded-xl bg-primary/10 border border-primary/30 flex items-start justify-between gap-3 text-left">
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-primary uppercase tracking-wider block mb-0.5">
                    Rescheduling Mode
                  </span>
                  <span className="text-text-secondary">
                    Currently: <strong className="text-text-primary">{bookingData.previousSchedule?.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {bookingData.previousSchedule?.time}</strong>. Pick a new slot below.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsRescheduling(false)
                  setIsSuccess(true)
                }}
                className="text-xs text-text-muted hover:text-text-primary underline flex-shrink-0"
              >
                Cancel
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isCancelled ? (
              <motion.div
                key="cancelled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Your appointment has been cancelled
                </h3>
                <p className="text-text-secondary mb-6">
                  A cancellation confirmation email has been sent to{' '}
                  <strong className="text-text-primary">{bookingData.email}</strong>.
                </p>

                <div className="bg-surface border border-red-500/25 rounded-xl p-5 mb-6 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-semibold uppercase tracking-wider mb-3">
                    <XCircle className="w-3.5 h-3.5" />
                    Cancelled Appointment
                  </div>
                  <h4 className="text-base font-semibold text-text-primary text-center mb-1">
                    Strategy Call with Taraj Global
                  </h4>
                  <p className="text-sm text-text-secondary text-center">
                    {bookingData.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {bookingData.time} {currentTz.abbr}
                  </p>
                  <p className="text-xs text-text-muted text-center mt-1">
                    Time Zone: {currentTz.fullLabel}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-primary to-cta text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Book a New Appointment
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-6 py-2.5 border border-border text-text-secondary hover:text-text-primary rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : isSuccess ? (
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
                  {isRescheduledSuccess
                    ? 'Your appointment has been rescheduled!'
                    : 'Your meeting has been successfully scheduled!'}
                </h3>
                <p className="text-text-secondary mb-6">
                  {isRescheduledSuccess
                    ? `An updated confirmation email has been sent to ${bookingData.email}`
                    : bookingData.emailWarning
                      ? `Meeting confirmed. A confirmation email will be sent to ${bookingData.email} shortly.`
                      : `Confirmation details have been sent to ${bookingData.email}`}
                </p>

                <div className="bg-surface border border-border rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-14 h-14 rounded-lg bg-primary/30 dark:bg-primary/10 flex items-center justify-center border-2 border-primary">
                      <span className="text-xl font-bold text-primary">
                        {bookingData.date?.getDate()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted text-center mb-1 uppercase font-semibold">
                    {bookingData.date?.toLocaleDateString('en-US', { month: 'short' })} {bookingData.date?.getFullYear()}
                  </p>
                  <h4 className="text-base font-semibold text-text-primary text-center mb-2">
                    {isRescheduledSuccess
                      ? 'Your appointment has been successfully updated!'
                      : 'Your appointment has been successfully booked!'}
                  </h4>
                  <p className="text-sm text-text-secondary text-center mb-2">
                    {bookingData.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {bookingData.time} {currentTz.abbr}
                  </p>
                  <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span>Time Zone: {currentTz.fullLabel} ({currentTz.offset})</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowManageModal(true)
                      setManageStep('options')
                    }}
                    className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Need to change?
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManageModal(true)
                      setManageStep('options')
                    }}
                    className="text-sm text-error hover:text-error-dark transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Cancel your appointment
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-[#E85D00] transition-colors"
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
                    {/* Header with Timezone Selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">Select a Date</h3>
                        <p className="text-xs text-text-muted mt-0.5">Monday – Friday · US Business Days</p>
                      </div>

                      {/* US Timezone Badge & Selector */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs">
                        <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                        <select
                          value={selectedTimeZone}
                          onChange={(e) => setSelectedTimeZone(e.target.value)}
                          className="bg-transparent text-text-primary font-medium focus:outline-none cursor-pointer"
                          aria-label="Select Time Zone"
                        >
                          {US_TIMEZONES.map(tz => (
                            <option key={tz.id} value={tz.id} className="bg-surface text-text-primary">
                              {tz.label} ({tz.offset})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

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
                        <div key={day} className="text-center text-sm sm:text-sm font-medium text-text-muted py-1.5 sm:py-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((day, index) => (
                        <button
                          key={index}
                          disabled={day?.isPast || day?.isWeekend || !day}
                          onClick={() => handleDateSelect(day)}
                          className={`
                            aspect-square rounded-lg flex items-center justify-center text-sm sm:text-sm font-medium transition-all
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

                    <p className="text-xs sm:text-sm text-text-muted text-center flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-text-muted shrink-0" />
                      <span>Select a business day to view available discovery slots in {currentTz.label}.</span>
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary">Select a Time</h3>
                        <p className="text-text-secondary text-xs sm:text-sm mt-0.5">
                          {bookingData.date?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>

                      {/* US Timezone Badge & Selector */}
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs">
                        <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                        <select
                          value={selectedTimeZone}
                          onChange={(e) => setSelectedTimeZone(e.target.value)}
                          className="bg-transparent text-text-primary font-medium focus:outline-none cursor-pointer"
                          aria-label="Select Time Zone"
                        >
                          {US_TIMEZONES.map(tz => (
                            <option key={tz.id} value={tz.id} className="bg-surface text-text-primary">
                              {tz.label} ({tz.offset})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 min-[400px]:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3 mb-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            p-2 sm:p-3 rounded-xl border-2 text-sm font-medium min-h-[48px] flex flex-col items-center justify-center transition-all
                            ${bookingData.time === time
                              ? 'border-primary bg-primary/10 text-primary shadow-sm'
                              : 'border-border hover:border-primary/50 text-text-primary hover:bg-surface/80'
                            }
                          `}
                        >
                          <span className="font-semibold">{time}</span>
                          <span className="text-[10px] text-text-muted mt-0.5">{currentTz.abbr}</span>
                        </button>
                      ))}
                    </div>

                    <p className="text-xs text-text-muted text-center pt-2">
                      All meetings are scheduled in {currentTz.fullLabel} (US Business Hours).
                    </p>
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
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {isRescheduling ? 'Confirm Rescheduled Meeting' : 'Confirm Your Meeting'}
                    </h3>
                    {isRescheduling && bookingData.previousSchedule && (
                      <div className="mb-5 text-xs text-text-muted flex items-center flex-wrap gap-2">
                        <span>Previous:</span>
                        <del className="text-text-secondary font-mono">{bookingData.previousSchedule.date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {bookingData.previousSchedule.time}</del>
                        <span className="text-primary font-medium">→ New Slot Below</span>
                      </div>
                    )}

                    {/* Meeting Summary */}
                    <div className="bg-surface border border-border rounded-xl p-5 sm:p-6 mb-6">
                      <h4 className="font-semibold text-text-primary mb-4 flex items-center justify-between">
                        <span>Meeting Summary</span>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {currentTz.abbr}
                        </span>
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
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
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary">Time:</span>
                          <span className="text-text-primary font-medium">{bookingData.time} {currentTz.abbr}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary">Time Zone:</span>
                          <span className="text-text-primary font-medium flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-primary" />
                            {currentTz.fullLabel} ({currentTz.offset})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary">Meeting Type:</span>
                          <span className="text-text-primary font-medium">Strategy & Discovery Call</span>
                        </div>
                        <div className="flex justify-between items-center">
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
                          placeholder="+1 (555) 000-0000"
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
        {!isSuccess && !isCancelled && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-t border-border">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[44px] text-text-secondary hover:text-text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 min-h-[44px] bg-accent text-white rounded-lg font-medium hover:bg-[#E85D00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-5 sm:px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-primary to-cta text-white rounded-lg font-medium hover:shadow-lg hover:shadow-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? (isRescheduling ? 'Rescheduling...' : 'Confirming...')
                  : (isRescheduling ? 'Confirm Reschedule' : 'Confirm Meeting')}
              </button>
            )}
          </div>
        )}

        {/* Manage Pop-up Modal: Cancel & Edit Options */}
        <AnimatePresence>
          {showManageModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                className="bg-surface border border-border rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative"
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowManageModal(false)
                    setManageStep('options')
                  }}
                  className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary rounded-lg transition-colors"
                  aria-label="Close manage modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {manageStep === 'options' ? (
                  <div>
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Manage Your Appointment
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        Select whether you'd like to edit your date and time or cancel this appointment.
                      </p>
                    </div>

                    {/* Current appointment info badge */}
                    <div className="bg-surface/60 border border-border rounded-xl p-3.5 mb-5 text-sm">
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                        Current Appointment
                      </div>
                      <div className="text-text-primary font-medium">
                        {bookingData.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · {bookingData.time} ({currentTz.abbr})
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {/* Edit / Reschedule option */}
                      <button
                        type="button"
                        onClick={handleStartReschedule}
                        className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/60 bg-surface/50 hover:bg-primary/5 transition-all flex items-start gap-3.5 group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors flex items-center justify-between text-base">
                            <span>Edit / Reschedule</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                          </h4>
                          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                            Pick a new date and time. Your details will be kept and you will receive an updated reschedule email.
                          </p>
                        </div>
                      </button>

                      {/* Cancel option */}
                      <button
                        type="button"
                        onClick={() => setManageStep('confirm_cancel')}
                        className="w-full text-left p-4 rounded-xl border border-red-500/20 hover:border-red-500/60 bg-red-500/5 hover:bg-red-500/10 transition-all flex items-start gap-3.5 group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <XCircle className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-500 flex items-center justify-between text-base">
                            <span>Cancel Appointment</span>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                          </h4>
                          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                            Cancel your scheduled appointment. Your slot will be released and you will receive a cancellation email.
                          </p>
                        </div>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowManageModal(false)
                        setManageStep('options')
                      }}
                      className="w-full py-2.5 text-sm text-text-muted hover:text-text-primary transition-colors text-center"
                    >
                      Keep Current Appointment
                    </button>
                  </div>
                ) : (
                  /* Confirmation view when Cancel is clicked */
                  <div className="text-center py-2">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      Confirm Cancellation
                    </h3>
                    <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                      Are you sure you want to cancel your meeting scheduled for{' '}
                      <strong className="text-text-primary">
                        {bookingData.date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {bookingData.time}
                      </strong>?
                      <br />
                      This will release your time slot and send a cancellation confirmation email.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setManageStep('options')}
                        disabled={isCancelling}
                        className="flex-1 px-4 py-2.5 border border-border text-text-secondary hover:text-text-primary rounded-xl font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelMeeting}
                        disabled={isCancelling}
                        className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-lg shadow-red-600/30 transition-all disabled:opacity-50"
                      >
                        {isCancelling ? 'Cancelling...' : 'Yes, Cancel Appointment'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default MeetingBooking

