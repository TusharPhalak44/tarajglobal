import React from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const GlobalPresence = () => {
  const locations = [
    { city: 'New York', country: 'USA', x: 25, y: 35 },
    { city: 'London', country: 'UK', x: 48, y: 28 },
    { city: 'Dubai', country: 'UAE', x: 58, y: 45 },
    { city: 'Singapore', country: 'Singapore', x: 75, y: 55 },
    { city: 'Sydney', country: 'Australia', x: 85, y: 75 },
    { city: 'Toronto', country: 'Canada', x: 28, y: 32 }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 166, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 166, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Global
            <span className="bg-gradient-to-r from-[#00A6FF] to-[#FF6D00] bg-clip-text text-transparent">
              {' '}Presence
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Serving clients across the world with our distributed team and global delivery capabilities.
          </p>
        </motion.div>

        {/* World map representation */}
        <div className="relative max-w-4xl mx-auto aspect-[2/1] mb-12">
          {/* Simplified map background */}
          <div className="absolute inset-0 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Abstract map shapes */}
            <svg className="w-full h-full opacity-20" viewBox="0 0 800 400">
              <path d="M100,100 Q200,50 300,100 T500,100 T700,100" stroke="#00A6FF" strokeWidth="2" fill="none" />
              <path d="M150,200 Q250,150 350,200 T550,200 T750,200" stroke="#FF6D00" strokeWidth="2" fill="none" />
            </svg>

            {/* Location markers */}
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
                className="absolute group cursor-pointer"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pulsing effect */}
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-[#00A6FF]"
                  style={{ width: '24px', height: '24px', marginLeft: '-12px', marginTop: '-12px' }}
                />
                
                {/* Marker */}
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#FF6D00] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-4 py-2 rounded-lg bg-[#121212] border border-white/10 whitespace-nowrap"
                >
                  <div className="text-white font-semibold">{location.city}</div>
                  <div className="text-[#00A6FF] text-sm">{location.country}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00A6FF]/50 transition-all text-center"
            >
              <MapPin className="w-6 h-6 text-[#00A6FF] mx-auto mb-3" />
              <h3 className="text-white font-bold mb-1">{location.city}</h3>
              <p className="text-gray-400 text-sm">{location.country}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GlobalPresence
