import { useEffect, useRef, useState, type ReactNode } from 'react'
import CornerKit from '@cornerkit/core'
import TouchCursor from './TouchCursor'

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && 'ontouchstart' in window,
  )

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scale = Math.min((vw - 40) / 402, (vh - 40) / 874, 1)
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `scale(${scale})`
        wrapperRef.current.style.transformOrigin = 'center center'
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  useEffect(() => {
    const ck = new CornerKit({ smoothing: 0.6 })
    if (phoneRef.current) ck.apply(phoneRef.current, { radius: 64, smoothing: 0.6 })
    return () => ck.destroy()
  }, [])

  const content = (
    <div className="w-screen h-screen flex items-center justify-center bg-black" style={{ touchAction: 'none' }}>
      <div
        ref={wrapperRef}
        style={{ willChange: 'transform', transformOrigin: 'center center' }}
      >
        <div
          ref={phoneRef}
          className="w-[402px] h-[874px] rounded-[64px] overflow-hidden bg-white relative flex-shrink-0"
          style={{ touchAction: 'none' }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  return isMobile ? content : <TouchCursor>{content}</TouchCursor>
}
