import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #2f39a9 0%, #2e6fa0 60%, #15d8b3 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 800,
          borderRadius: '8px',
          fontFamily: 'sans-serif',
          letterSpacing: '-1px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        SS
      </div>
    ),
    {
      ...size,
    }
  )
}
