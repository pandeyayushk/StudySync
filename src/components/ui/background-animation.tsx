'use client'

import React from 'react'

export function BackgroundAnimation() {
  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#060919]"
    >
      {/* Deep gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070c20] via-[#050816] to-[#040612]" />

      {/* Subtle glowing ambient orbs floating in the palette colors */}
      {/* Orb 1: Deep Cobalt (#2f39a9) */}
      <div 
        className="animate-bg-float-1 absolute -top-24 -left-24 h-[550px] w-[550px] rounded-full bg-[#2f39a9]/25 blur-[120px] will-change-transform" 
      />

      {/* Orb 2: Ocean Blue (#2e6fa0) */}
      <div 
        className="animate-bg-float-2 absolute top-1/4 -right-32 h-[600px] w-[600px] rounded-full bg-[#2e6fa0]/20 blur-[130px] will-change-transform" 
      />

      {/* Orb 3: Vibrant Mint/Teal (#15d8b3) */}
      <div 
        className="animate-bg-float-3 absolute -bottom-36 left-1/3 h-[500px] w-[500px] rounded-full bg-[#15d8b3]/15 blur-[140px] will-change-transform" 
      />

      {/* Orb 4: Cerulean (#49a4bb) */}
      <div 
        className="animate-bg-float-2 absolute bottom-1/4 -left-20 h-[450px] w-[450px] rounded-full bg-[#49a4bb]/20 blur-[120px] will-change-transform" 
      />

      {/* Tech / Starry Grid Accent Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(rgba(21, 216, 179, 0.9) 1px, transparent 1px), radial-gradient(rgba(47, 57, 169, 0.8) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0, 24px 24px'
        }}
      />

      {/* Top subtle vignette & sheen */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#15d8b3]/[0.03] to-transparent pointer-events-none" />
    </div>
  )
}
