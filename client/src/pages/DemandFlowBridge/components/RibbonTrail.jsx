import React, { useEffect, useRef } from 'react'

/**
 * RibbonTrail (V6 — Pixel-Calibrated Organic Silk Ribbon)
 * ─────────────────────────────────────────────────────────────────────────────
 * Connects the 7 Core Capability Modules in sequential flow:
 * Module 1 (CRM) ➔ Module 2 (Leads) ➔ Module 3 (Sales) ➔ Module 4 (HRMS)
 * ➔ Module 5 (Payroll) ➔ Module 6 (Operations) ➔ Module 7 (Analytics)
 * ➔ Smoothly sweeps to touch the bottom section border.
 *
 * Calibrated Precision:
 * 1. Physical Y-Coordinate Mapping: Instead of rough progress percentages, ribbon
 *    extension is directly mapped to the user's eye-level in the viewport.
 * 2. Tight Controlled Lead (75px): Perfectly delivers "a little bit more" without
 *    overshooting or skipping ahead into subsequent modules.
 * 3. Modulated Velocity Tracking: Adds a gentle +30px to +50px lead only during
 *    active fast scrolling to ensure continuous visibility without racing ahead.
 * 4. Physical Milestone Activation: Badges light up the exact instant the drawn
 *    silk ribbon reaches their physical Y coordinate.
 * 5. Full Section Landing: Sweeps past Module 7 down to y = container.height,
 *    illuminating a terminal connection flare at the bottom section boundary.
 */
const RibbonTrail = ({
    ribbonWidth = 18,
    segmentCount = 640,
    animationSpeed = 0.7,
    colorStart = '#00A6FF',
    colorMid = '#00D2FF',
    colorEnd = '#00D2FF',
    reducedMotion = false,
}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = canvas?.parentElement
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = 0
        let height = 0
        let frameId = null
        let time = 0
        let isVisible = true

        // Pixel-calibrated scroll tracking
        let targetActiveIndex = 4
        let smoothActiveIndex = 4
        let scrollVelocity = 0 // in px/ms
        let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
        let lastScrollTime = performance.now()

        // Floating stardust micro-particles around the leading quantum bead
        const sparkParticles = Array.from({ length: 14 }, (_, i) => ({
            angle: (i / 14) * Math.PI * 2,
            dist: 6 + (i % 4) * 5,
            speed: 0.8 + (i % 3) * 0.4,
            size: 1.2 + (i % 3) * 0.7,
            seed: i * 1.37,
        }))

        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        // Measure the exact coordinates of the 7 module badges within the section
        const getKeypoints = (w, h) => {
            const containerRect = container.getBoundingClientRect()
            const rows = Array.from(container.querySelectorAll('[data-capability-row]'))

            const keypoints = []

            if (rows.length >= 7) {
                rows.forEach((row, i) => {
                    const marker =
                        row.querySelector('[data-capability-marker]') ||
                        row.querySelector('[data-capability-content]') ||
                        row

                    const rect = marker.getBoundingClientRect()
                    const x = rect.left - containerRect.left + rect.width / 2
                    const y = rect.top - containerRect.top + rect.height / 2

                    keypoints.push({ x, y, index: i })
                })
            } else {
                // High-precision geometric fallback if DOM elements are mounting
                for (let i = 0; i < 7; i++) {
                    const isLeft = i % 2 === 0
                    const x = isLeft ? w * 0.22 : w * 0.78
                    const y = ((i + 0.6) / 8.5) * h
                    keypoints.push({ x, y, index: i })
                }
            }

            return keypoints
        }

        // Generate pure, kink-free Hermite S-curve spline points
        const generateSplinePoints = (keypoints, totalSamples, w, h) => {
            if (keypoints.length < 2) return []

            const first = keypoints[0]
            const last = keypoints[keypoints.length - 1]

            // 1. Entry anchor starting at the exact starting of the section (Center Top border)
            const entryAnchor = {
                x: w * 0.5,
                y: 0,
                index: -1,
            }

            // 2. Final exit anchor: Single pure sweeping S-curve from Module 7 to center-bottom of section
            // Direction: Sweeps gracefully out of Module 7 into the center line, pointing straight down into next section
            const finalExit = {
                x: w * 0.5,
                y: Math.max(last.y + 140, h - 10),
                index: 7,
            }

            const allAnchors = [
                entryAnchor,
                ...keypoints,
                finalExit,
            ]

            const segmentCountTotal = allAnchors.length - 1
            const samplesPerSegment = Math.ceil(totalSamples / segmentCountTotal)

            const spline = []

            for (let s = 0; s < segmentCountTotal; s++) {
                const pA = allAnchors[s]
                const pB = allAnchors[s + 1]

                const dy = pB.y - pA.y

                // Hermite vertical control handles guarantee C¹ continuous vertical tangents at every node
                // Zero angular kinks, zero horizontal stalls, pure organic S-curve flow
                const handleTension = 0.44
                const c1x = pA.x
                const c1y = pA.y + dy * handleTension
                const c2x = pB.x
                const c2y = pB.y - dy * handleTension

                for (let j = 0; j < samplesPerSegment; j++) {
                    const t = j / samplesPerSegment
                    const mt = 1 - t

                    // Cubic Bézier position B(t)
                    const x =
                        mt * mt * mt * pA.x +
                        3 * mt * mt * t * c1x +
                        3 * mt * t * t * c2x +
                        t * t * t * pB.x

                    const y =
                        mt * mt * mt * pA.y +
                        3 * mt * mt * t * c1y +
                        3 * mt * t * t * c2y +
                        t * t * t * pB.y

                    // Exact tangent derivative B'(t) for perpendicular fabric angles
                    const tdx =
                        3 * mt * mt * (c1x - pA.x) +
                        6 * mt * t * (c2x - c1x) +
                        3 * t * t * (pB.x - c2x)

                    const tdy =
                        3 * mt * mt * (c1y - pA.y) +
                        6 * mt * t * (c2y - c1y) +
                        3 * t * t * (pB.y - c2y)

                    const len = Math.hypot(tdx, tdy) || 1
                    const perpX = -tdy / len
                    const perpY = tdx / len
                    const angle = Math.atan2(tdy, tdx)

                    const globalProgress =
                        (s * samplesPerSegment + j) / (segmentCountTotal * samplesPerSegment)

                    spline.push({
                        x,
                        y,
                        perpX,
                        perpY,
                        angle,
                        progress: globalProgress,
                        segmentIndex: s,
                    })
                }
            }

            return spline
        }

        let keypoints = []
        let splinePoints = []

        const resize = () => {
            const rect = container.getBoundingClientRect()
            width = rect.width
            height = rect.height

            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            keypoints = getKeypoints(width, height)
            splinePoints = generateSplinePoints(keypoints, segmentCount, width, height)
            updateScrollProgress()
        }

        const updateScrollProgress = () => {
            if (!splinePoints || splinePoints.length < 2) return

            const rect = container.getBoundingClientRect()
            const windowHeight = window.innerHeight || 800

            // Measure real-time scroll velocity (px/ms)
            const now = performance.now()
            const sy = window.scrollY || window.pageYOffset || 0
            const dt = Math.max(1, now - lastScrollTime)
            const dy = sy - lastScrollY
            const instantVelocity = dy / dt

            // Filter velocity smoothly
            scrollVelocity = scrollVelocity * 0.65 + instantVelocity * 0.35
            lastScrollY = sy
            lastScrollTime = now

            // User eye-level focus is around 48% of the viewport height
            const userFocusY = windowHeight * 0.48
            const currentContainerY = userFocusY - rect.top

            // Calibrated "little bit more" forward lead (tight 75px) + slight velocity boost (max 45px)
            const baseLead = 75
            const velocityLead = Math.max(0, Math.min(45, scrollVelocity * 20))
            const targetY = currentContainerY + baseLead + velocityLead

            const totalPts = splinePoints.length - 1
            const minY = splinePoints[0].y
            const maxY = splinePoints[totalPts].y

            if (targetY <= minY) {
                targetActiveIndex = 4 // Sits ready at the very starting of the section
            } else if (targetY >= maxY - 15) {
                targetActiveIndex = totalPts // Touches the bottom border
            } else {
                // Binary search for exact spline point matching targetY
                let low = 0
                let high = totalPts
                while (low <= high) {
                    const mid = (low + high) >> 1
                    if (splinePoints[mid].y < targetY) {
                        low = mid + 1
                    } else {
                        high = mid - 1
                    }
                }
                targetActiveIndex = Math.min(totalPts, Math.max(4, low))
            }
        }

        const observer = new ResizeObserver(resize)
        observer.observe(container)

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
                if (isVisible && !reducedMotion && !frameId) {
                    frameId = requestAnimationFrame(render)
                } else if (!isVisible && frameId) {
                    cancelAnimationFrame(frameId)
                    frameId = null
                }
            },
            { threshold: 0 }
        )
        visibilityObserver.observe(container)

        window.addEventListener('scroll', updateScrollProgress, { passive: true })
        window.addEventListener('resize', updateScrollProgress)

        // Render the ultra-smooth 3D liquid silk ribbon
        const draw = (currentTime) => {
            if (!width || !height || splinePoints.length < 2) return

            ctx.clearRect(0, 0, width, height)

            // Natural velocity decay
            scrollVelocity *= 0.93

            // Dynamic adaptive lerp:
            // Smooth 0.095 base lerp; gracefully scales up during scrolling to eliminate lag
            if (!reducedMotion) {
                const diff = targetActiveIndex - smoothActiveIndex
                const absDiff = Math.abs(diff)
                const adaptiveLerp = Math.min(
                    0.20,
                    0.095 + (absDiff / (splinePoints.length || 1)) * 0.40 + Math.abs(scrollVelocity) * 0.015
                )
                smoothActiveIndex += diff * adaptiveLerp
            } else {
                smoothActiveIndex = splinePoints.length - 1
            }

            // Smooth active point count
            const totalCount = splinePoints.length - 1
            const minPoints = 4
            const activePointCount = Math.min(
                totalCount,
                Math.max(minPoints, Math.round(smoothActiveIndex))
            )

            // Current head physical Y coordinate
            const headPt = splinePoints[activePointCount - 1]
            const currentHeadY = headPt.y

            // ── 0. TOP BORDER ENTRY CONNECTION BEAM ──
            const topPt = splinePoints[0]
            if (topPt) {
                ctx.save()
                const topGrad = ctx.createLinearGradient(
                    topPt.x - 50,
                    topPt.y,
                    topPt.x + 50,
                    topPt.y
                )
                topGrad.addColorStop(0, 'rgba(0, 166, 255, 0)')
                topGrad.addColorStop(0.5, '#00A6FF')
                topGrad.addColorStop(1, 'rgba(0, 210, 255, 0)')
                ctx.strokeStyle = topGrad
                ctx.lineWidth = 2.5
                ctx.shadowColor = '#00A6FF'
                ctx.shadowBlur = 12
                ctx.beginPath()
                ctx.moveTo(topPt.x - 45, topPt.y + 2)
                ctx.lineTo(topPt.x + 45, topPt.y + 2)
                ctx.stroke()
                ctx.restore()
            }

            // ── 1. AMBIENT BLUEPRINT GUIDE (Faint trajectory line connecting 7 modules to bottom) ──
            ctx.beginPath()
            for (let i = 0; i < splinePoints.length; i++) {
                const pt = splinePoints[i]
                if (i === 0) ctx.moveTo(pt.x, pt.y)
                else ctx.lineTo(pt.x, pt.y)
            }
            ctx.strokeStyle = 'rgba(0, 166, 255, 0.10)'
            ctx.lineWidth = 1.2
            ctx.setLineDash([5, 8])
            ctx.stroke()
            ctx.setLineDash([])

            // ── 2. BROAD DIFFUSED AMBIENT NEON UNDER-GLOW ──
            ctx.beginPath()
            for (let i = 0; i < activePointCount; i++) {
                const pt = splinePoints[i]
                if (i === 0) ctx.moveTo(pt.x, pt.y)
                else ctx.lineTo(pt.x, pt.y)
            }
            ctx.strokeStyle = 'rgba(0, 166, 255, 0.18)'
            ctx.lineWidth = ribbonWidth * 2.4
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()

            // ── 3. PRE-COMPUTE SILK RIBBON RAILS WITH SMOOTH 3D WIDTH MODULATION ──
            const leftRail = []
            const rightRail = []
            const taperLength = 26

            for (let i = 0; i < activePointCount; i++) {
                const p = splinePoints[i]

                // Continuous harmonic width breathing (undulating 3D silk)
                const wave = Math.cos(p.progress * Math.PI * 12 - currentTime * animationSpeed)
                const widthFactor = 0.76 + 0.24 * wave

                // Graceful head taper into the leading photon
                const pointsFromHead = activePointCount - i
                const taper =
                    pointsFromHead <= taperLength
                        ? Math.sin((pointsFromHead / taperLength) * (Math.PI / 2))
                        : 1

                // Graceful tail taper at the top
                const tailTaper = i <= 18 ? Math.sin((i / 18) * (Math.PI / 2)) : 1

                const currentHalfWidth = (ribbonWidth / 2) * widthFactor * taper * tailTaper

                leftRail.push({
                    x: p.x + p.perpX * currentHalfWidth,
                    y: p.y + p.perpY * currentHalfWidth,
                })
                rightRail.push({
                    x: p.x - p.perpX * currentHalfWidth,
                    y: p.y - p.perpY * currentHalfWidth,
                })
            }

            // ── 4. CONTINUOUS SEAMLESS SATIN SILK POLYGON (Zero seams, zero cracks) ──
            const startPt = splinePoints[0]

            const silkGradient = ctx.createLinearGradient(0, startPt.y, 0, headPt.y)
            silkGradient.addColorStop(0, colorStart) // Electric Cyan
            silkGradient.addColorStop(0.35, colorMid) // Bright Aqua
            silkGradient.addColorStop(0.68, '#2F859A') // Balanced Brand Teal
            silkGradient.addColorStop(1, colorEnd) // Radiant Coral Orange

            ctx.save()
            ctx.beginPath()

            // Trace forward along left rail
            ctx.moveTo(leftRail[0].x, leftRail[0].y)
            for (let i = 1; i < activePointCount; i++) {
                ctx.lineTo(leftRail[i].x, leftRail[i].y)
            }

            // Smooth tip point at the leading head
            ctx.lineTo(headPt.x, headPt.y)

            // Trace backward along right rail
            for (let i = activePointCount - 1; i >= 0; i--) {
                ctx.lineTo(rightRail[i].x, rightRail[i].y)
            }

            ctx.closePath()

            ctx.fillStyle = silkGradient
            ctx.shadowColor = 'rgba(0, 166, 255, 0.40)'
            ctx.shadowBlur = 14
            ctx.globalAlpha = 0.94
            ctx.fill()
            ctx.restore()

            // ── 5. SILK HIGHLIGHT & SHADOW RAILS (High-end 3D satin sheen) ──
            // Outer crisp white sheen trim
            ctx.beginPath()
            ctx.moveTo(leftRail[0].x, leftRail[0].y)
            for (let i = 1; i < activePointCount; i++) {
                ctx.lineTo(leftRail[i].x, leftRail[i].y)
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.48)'
            ctx.lineWidth = 1.1
            ctx.stroke()

            // Inner depth shadow rail
            ctx.beginPath()
            ctx.moveTo(rightRail[0].x, rightRail[0].y)
            for (let i = 1; i < activePointCount; i++) {
                ctx.lineTo(rightRail[i].x, rightRail[i].y)
            }
            ctx.strokeStyle = 'rgba(3, 16, 32, 0.65)'
            ctx.lineWidth = 1.3
            ctx.stroke()

            // ── 6. CENTERLINE LUMINESCENT SPINE (Iridescent satin reflection) ──
            ctx.beginPath()
            for (let i = 0; i < activePointCount; i++) {
                const pt = splinePoints[i]
                if (i === 0) ctx.moveTo(pt.x, pt.y)
                else ctx.lineTo(pt.x, pt.y)
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
            ctx.lineWidth = 2.4
            ctx.stroke()

            // ── 7. UNDULATING 3D SATIN TWIST SHADING WAVES ──
            const stride = 5
            for (let i = 4; i < activePointCount - 4; i += stride) {
                const p = splinePoints[i]
                const wave = Math.sin(p.progress * Math.PI * 12 - currentTime * animationSpeed)

                ctx.beginPath()
                ctx.moveTo(leftRail[i].x, leftRail[i].y)
                ctx.lineTo(rightRail[i].x, rightRail[i].y)

                if (wave > 0.1) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.16 * wave})`
                    ctx.lineWidth = 1.2
                    ctx.stroke()
                } else if (wave < -0.1) {
                    ctx.strokeStyle = `rgba(3, 14, 28, ${0.28 * Math.abs(wave)})`
                    ctx.lineWidth = 1.4
                    ctx.stroke()
                }
            }

            // ── 8. MILESTONE NODE TARGET HALOS AT THE 7 MODULES ──
            keypoints.forEach((kp, idx) => {
                const isReached = currentHeadY >= kp.y - 12
                const nextY = idx < 6 ? keypoints[idx + 1].y : height - 40
                const isCurrent = isReached && currentHeadY < nextY

                ctx.save()

                if (isReached) {
                    ctx.beginPath()
                    ctx.arc(kp.x, kp.y, 18, 0, Math.PI * 2)
                    ctx.strokeStyle = colorStart
                    ctx.lineWidth = 1.8
                    ctx.shadowColor = colorStart
                    ctx.shadowBlur = 12
                    ctx.stroke()

                    if (isCurrent && !reducedMotion) {
                        const pulseR = 18 + ((currentTime * 22) % 20)
                        const pulseAlpha = Math.max(0, 1 - (pulseR - 18) / 20)
                        ctx.beginPath()
                        ctx.arc(kp.x, kp.y, pulseR, 0, Math.PI * 2)
                        ctx.strokeStyle = `rgba(0, 210, 255, ${pulseAlpha * 0.7})`
                        ctx.lineWidth = 1.5
                        ctx.stroke()
                    }

                    ctx.fillStyle = '#FFFFFF'
                    ctx.shadowColor = '#00D2FF'
                    ctx.shadowBlur = 8
                    ctx.beginPath()
                    ctx.arc(kp.x, kp.y, 4, 0, Math.PI * 2)
                    ctx.fill()
                } else {
                    ctx.beginPath()
                    ctx.arc(kp.x, kp.y, 16, 0, Math.PI * 2)
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
                    ctx.lineWidth = 1
                    ctx.setLineDash([3, 4])
                    ctx.stroke()
                }

                ctx.restore()
            })

            // ── 9. BOTTOM BORDER TERMINAL CONNECTION FLARE ──
            if (activePointCount >= splinePoints.length - 8 || currentHeadY >= height - 25) {
                const bottomPt = splinePoints[splinePoints.length - 1]
                ctx.save()

                // Glowing cyan/coral contact beam centered along bottom section border
                const contactGrad = ctx.createLinearGradient(
                    bottomPt.x - 55,
                    bottomPt.y,
                    bottomPt.x + 55,
                    bottomPt.y
                )
                contactGrad.addColorStop(0, 'rgba(0, 166, 255, 0)')
                contactGrad.addColorStop(0.5, '#00D2FF')
                contactGrad.addColorStop(1, 'rgba(255, 109, 0, 0)')

                ctx.strokeStyle = contactGrad
                ctx.lineWidth = 2.5
                ctx.shadowColor = '#00D2FF'
                ctx.shadowBlur = 14
                ctx.beginPath()
                ctx.moveTo(bottomPt.x - 50, bottomPt.y + 4)
                ctx.lineTo(bottomPt.x + 50, bottomPt.y + 4)
                ctx.stroke()

                // Terminal pulse orb centered at the exit point
                ctx.beginPath()
                ctx.arc(bottomPt.x, bottomPt.y + 2, 4, 0, Math.PI * 2)
                ctx.fillStyle = '#FFFFFF'
                ctx.shadowColor = '#FF6D00'
                ctx.shadowBlur = 12
                ctx.fill()
                ctx.restore()
            }

            // ── 10. TRAVELING QUANTUM CORE & STARDUST PARTICLES ──
            if (activePointCount < splinePoints.length && !reducedMotion) {
                ctx.save()

                // 1. Radiant multi-layer glowing aura
                const aura = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 28)
                aura.addColorStop(0, 'rgba(0, 210, 255, 0.75)')
                aura.addColorStop(0.42, 'rgba(255, 109, 0, 0.35)')
                aura.addColorStop(1, 'rgba(0, 166, 255, 0)')

                ctx.fillStyle = aura
                ctx.beginPath()
                ctx.arc(headPt.x, headPt.y, 28, 0, Math.PI * 2)
                ctx.fill()

                // 2. Expanding energy ripple ring
                const rippleR = 7 + ((currentTime * 20) % 18)
                const rippleAlpha = 1 - rippleR / 25
                ctx.beginPath()
                ctx.arc(headPt.x, headPt.y, rippleR, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(0, 210, 255, ${rippleAlpha})`
                ctx.lineWidth = 1.6
                ctx.stroke()

                // 3. Brilliant diamond photon core
                ctx.shadowColor = '#00A6FF'
                ctx.shadowBlur = 18
                ctx.fillStyle = '#FFFFFF'
                ctx.beginPath()
                ctx.moveTo(headPt.x, headPt.y - 7)
                ctx.lineTo(headPt.x + 7, headPt.y)
                ctx.lineTo(headPt.x, headPt.y + 7)
                ctx.lineTo(headPt.x - 7, headPt.y)
                ctx.closePath()
                ctx.fill()

                // 4. Floating stardust micro-sparks trailing behind
                sparkParticles.forEach((spark) => {
                    const currentAngle = spark.angle + currentTime * spark.speed
                    const radius = spark.dist + Math.sin(currentTime * 3 + spark.seed) * 3
                    const sx = headPt.x + Math.cos(currentAngle) * radius
                    const sy = headPt.y + Math.sin(currentAngle) * radius
                    const sparkAlpha = 0.4 + 0.6 * Math.sin(currentTime * 4 + spark.seed)

                    ctx.beginPath()
                    ctx.arc(sx, sy, spark.size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(0, 210, 255, ${sparkAlpha})`
                    ctx.fill()
                })

                ctx.restore()
            }
        }

        const render = () => {
            if (!isVisible || reducedMotion) {
                frameId = null
                return
            }

            time += 0.016
            draw(time)
            frameId = requestAnimationFrame(render)
        }

        resize()

        if (!reducedMotion && isVisible) {
            frameId = requestAnimationFrame(render)
        }

        return () => {
            if (frameId) cancelAnimationFrame(frameId)
            window.removeEventListener('scroll', updateScrollProgress)
            window.removeEventListener('resize', updateScrollProgress)
            observer.disconnect()
            visibilityObserver.disconnect()
        }
    }, [
        ribbonWidth,
        segmentCount,
        animationSpeed,
        colorStart,
        colorMid,
        colorEnd,
        reducedMotion,
    ])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 block w-full h-full pointer-events-none select-none z-0"
        />
    )
}

export default RibbonTrail