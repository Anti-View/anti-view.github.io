import { type ReactNode, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CornerKit from '@cornerkit/core'

export type IslandVariant = 'square' | 'wide'

const VARIANTS = {
  square: { w: 264, h: 264, left: 69,  radius: 56 },
  wide:   { w: 370, h: 240, left: 16,  radius: 56 },
} as const

interface DynamicIslandProps {
  expanded: boolean
  variant?: IslandVariant
  onToggle: () => void
  children?: ReactNode
}

export default function DynamicIsland({ expanded, variant = 'square', onToggle, children }: DynamicIslandProps) {
  const elRef = useRef<HTMLDivElement>(null)
  const ckRef = useRef<CornerKit | null>(null)

  const v = VARIANTS[variant]

  useEffect(() => {
    ckRef.current = new CornerKit({ smoothing: 0.6 })
    return () => { ckRef.current?.destroy() }
  }, [])

  useEffect(() => {
    const el = elRef.current
    const ck = ckRef.current
    if (!el || !ck) return

    if (expanded) {
      ck.apply(el, { radius: v.radius, smoothing: 0.6 })
    } else {
      try { ck.remove(el) } catch {}
    }
  }, [expanded, v.radius])

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={elRef}
        layout
        initial={false}
        className="absolute pointer-events-auto cursor-pointer bg-black overflow-hidden"
        animate={{
          left: expanded ? v.left : 186,
          top: 16,
          width: expanded ? v.w : 30,
          height: expanded ? v.h : 30,
          borderRadius: expanded ? v.radius : 30,
        }}
        transition={
          expanded
            ? { type: 'spring', stiffness: 170, damping: 18, mass: 1 }
            : { type: 'spring', stiffness: 260, damping: 32, mass: 1 }
        }
        onClick={() => { if (!expanded) onToggle() }}
      >
        {expanded && (
          <motion.div
            className="flex flex-col items-center gap-[10px]"
            style={{ padding: '32px 4px 4px 4px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
