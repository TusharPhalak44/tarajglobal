import React, { useRef, useEffect, useState } from 'react'

const WebGLLiquidDistortion = ({ src, alt, className }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const textureRef = useRef(null)
  const animationFrameRef = useRef(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const mouseVelocityRef = useRef({ x: 0, y: 0 })
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(0)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const gl = canvas.getContext('webgl')

    if (!gl) return

    glRef.current = gl

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `

    // Fragment shader with liquid distortion
    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_velocity;
      uniform float u_time;
      uniform float u_hover;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Calculate distance from mouse
        vec2 mouseDist = uv - u_mouse;
        float dist = length(mouseDist);
        
        // Create liquid distortion based on velocity
        float strength = u_hover * smoothstep(0.5, 0.0, dist);
        
        // Apply distortion
        vec2 distortion = u_velocity * strength * 0.1;
        distortion += sin(uv.x * 10.0 + u_time) * 0.01 * strength;
        distortion += cos(uv.y * 10.0 + u_time) * 0.01 * strength;
        
        vec2 distortedUV = uv + distortion;
        
        // Clamp UV coordinates
        distortedUV = clamp(distortedUV, 0.0, 1.0);
        
        gl_FragColor = texture2D(u_texture, distortedUV);
      }
    `

    // Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    // Create program
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    programRef.current = program
    gl.useProgram(program)

    // Create geometry
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ])
    const texCoords = new Float32Array([
      0, 1, 1, 1, 0, 0,
      0, 0, 1, 1, 1, 0
    ])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    const positionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)
    const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord')
    gl.enableVertexAttribArray(texCoordLoc)
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0)

    // Load texture
    const texture = gl.createTexture()
    textureRef.current = texture
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = src

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    }

    // Get uniform locations
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse')
    const velocityLoc = gl.getUniformLocation(program, 'u_velocity')
    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const hoverLoc = gl.getUniformLocation(program, 'u_hover')

    // Resize handler
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTimeRef.current
      
      if (deltaTime > 0) {
        mouseVelocityRef.current = {
          x: (x - lastMousePosRef.current.x) / deltaTime * 1000,
          y: (y - lastMousePosRef.current.y) / deltaTime * 1000
        }
      }
      
      mousePosRef.current = { x, y }
      lastMousePosRef.current = { x, y }
      lastTimeRef.current = currentTime
    }

    const handleMouseEnter = () => {
      isHoveringRef.current = true
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
      mouseVelocityRef.current = { x: 0, y: 0 }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Animation loop
    const animate = (time) => {
      gl.uniform2f(mouseLoc, mousePosRef.current.x, mousePosRef.current.y)
      gl.uniform2f(velocityLoc, mouseVelocityRef.current.x, mouseVelocityRef.current.y)
      gl.uniform1f(timeLoc, time * 0.001)
      gl.uniform1f(hoverLoc, isHoveringRef.current ? 1.0 : 0.0)

      // Decay velocity
      mouseVelocityRef.current.x *= 0.95
      mouseVelocityRef.current.y *= 0.95

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteTexture(texture)
      gl.deleteBuffer(positionBuffer)
      gl.deleteBuffer(texCoordBuffer)
    }
  }, [src, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  )
}

export default WebGLLiquidDistortion
