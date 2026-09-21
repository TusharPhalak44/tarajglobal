import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders"
import { Sparkles } from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "@context/ThemeContext"

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  to,
  width: customWidth,
  height: customHeight = 44,
  borderRadius = "14px",
  backgroundColor = "linear-gradient(180deg, #202020 0%, #000000 100%)",
  textColor = "#FFFFFF",
  className = "",
  icon = null
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState([])
  const shaderRef = useRef(null)
  const shaderMount = useRef(null)
  const buttonRef = useRef(null)
  const rippleId = useRef(0)

  const isPercentWidth = typeof customWidth === "string" && customWidth.endsWith("%")

  const dimensions = useMemo(() => {
    const h = customHeight || 44
    const innerH = h - 4
    if (viewMode === "icon") {
      const w = isPercentWidth ? customWidth : (customWidth || 44)
      return {
        width: w,
        height: h,
        innerWidth: isPercentWidth ? "calc(100% - 4px)" : `${(typeof w === "number" ? w : 44) - 4}px`,
        innerHeight: innerH,
        shaderHeight: h,
      }
    } else {
      const w = isPercentWidth ? customWidth : (customWidth || 150)
      return {
        width: w,
        height: h,
        innerWidth: isPercentWidth ? "calc(100% - 4px)" : `${(typeof w === "number" ? w : 150) - 4}px`,
        innerHeight: innerH,
        shaderHeight: h,
      }
    }
  }, [viewMode, customWidth, customHeight, isPercentWidth])

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: inherit !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy()
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          )
        }
      } catch (error) {
        console.error("[v0] Failed to load shader:", error)
      }
    }

    loadShader()

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy()
        shaderMount.current = null
      }
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    shaderMount.current?.setSpeed?.(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    shaderMount.current?.setSpeed?.(0.6)
  }

  const handleClick = (e) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4)
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1)
        } else {
          shaderMount.current?.setSpeed?.(0.6)
        }
      }, 300)
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const ripple = { x, y, id: rippleId.current++ }

      setRipples((prev) => [...prev, ripple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 600)
    }

    onClick?.()
  }

  const computedWidth = typeof dimensions.width === "number" ? `${dimensions.width}px` : dimensions.width

  const ButtonContent = (
    <div className={`relative ${isPercentWidth ? "w-full" : "inline-block"} ${className}`}>
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          width: computedWidth,
        }}
      >
        <div
          style={{
            position: "relative",
            width: computedWidth,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: isHovered ? "translateY(-1px)" : "none",
          }}
        >
          {/* Layer 3: Foreground Label & Icon (Z=20) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {icon ? (
              icon
            ) : viewMode === "icon" ? (
              <Sparkles
                size={16}
                style={{
                  color: textColor,
                  filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.4))",
                  transform: "scale(1)",
                }}
              />
            ) : null}
            {viewMode === "text" && (
              <span
                style={{
                  fontSize: "13px",
                  color: textColor,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  textShadow: isDark
                    ? "0px 1px 2px rgba(0, 0, 0, 0.6)"
                    : "0px 1px 1px rgba(255, 255, 255, 0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            )}
          </div>

          {/* Layer 2: Core Body with Background (Z=10) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: dimensions.innerWidth,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: `calc(${borderRadius} - 2px)`,
                background: backgroundColor,
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4)"
                  : isDark
                  ? "inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                  : "inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                transition: "all 0.3s ease, box-shadow 0.15s ease",
              }}
            />
          </div>

          {/* Layer 1: Outer Shell with Shader & Realistic Modern Shadow (Z=0) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: "100%",
                borderRadius: borderRadius,
                boxShadow: isPressed
                  ? "0 1px 2px rgba(0, 0, 0, 0.2)"
                  : isHovered
                  ? isDark
                    ? "0 8px 24px -2px rgba(0, 166, 255, 0.38), 0 2px 6px rgba(0, 0, 0, 0.4)"
                    : "0 6px 18px -2px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.06)"
                  : isDark
                  ? "0 4px 14px -2px rgba(0, 0, 0, 0.5)"
                  : "0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease, box-shadow 0.2s ease",
                background: "transparent",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: borderRadius,
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: `${dimensions.shaderHeight}px`,
                  transition: "all 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Layer 4: Interactive Invisible Button (Z=40) */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              overflow: "hidden",
              borderRadius: borderRadius,
            }}
            aria-label={label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  )

  if (to) {
    return <Link to={to} className={isPercentWidth ? "w-full block" : "inline-block"}>{ButtonContent}</Link>
  }

  return ButtonContent
}

export default LiquidMetalButton
