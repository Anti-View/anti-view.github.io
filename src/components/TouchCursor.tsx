import { useState, useCallback, useRef, type ReactNode } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
}

export default function TouchCursor({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [pressing, setPressing] = useState(false)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)

  const onMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
    if (!visible) setVisible(true)
  }, [visible])

  const onEnter = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY })
    setVisible(true)
  }, [])

  const onLeave = useCallback(() => setVisible(false), [])

  const onDown = useCallback((e: React.MouseEvent) => {
    setPressing(true)
    const id = nextId.current++
    setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
  }, [])

  const onUp = useCallback(() => setPressing(false), [])

  return (
    <div
      className="w-screen h-screen"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
    >
      {children}

      {/* Finger cursor — centered on mouse, scales on press */}
      {visible && (
        <div
          className="fixed pointer-events-none z-[100] rounded-full"
          style={{
            left: pos.x,
            top: pos.y,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            transform: `scale(${pressing ? 0.85 : 1})`,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
            transition: 'transform 0.15s ease',
          }}
        />
      )}

      {/* Ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[99] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
            border: '1.5px solid rgba(255, 255, 255, 0.7)',
            animation: 'touch-ripple 0.6s ease-out forwards',
          }}
        />
      ))}
    </div>
  )
}
