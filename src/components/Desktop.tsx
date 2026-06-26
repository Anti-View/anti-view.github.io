import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import CornerKit from '@cornerkit/core'

const UNLOCK_THRESHOLD = 280

function AppIcon({ label }: { label?: string }) {
  return (
    <div className="w-[64px] h-[64px] rounded-[16px] bg-white flex-shrink-0 relative overflow-hidden flex items-center justify-center">
      {label && <span className="text-black/40 text-[13px] font-semibold select-none">{label}</span>}
    </div>
  )
}

function IconGrid({ labels }: { labels: [string, string, string, string] }) {
  return (
    <div className="w-[159px] h-[159px] flex flex-col gap-[31px] items-center justify-center">
      <div className="flex gap-[31px]"><AppIcon label={labels[0]} /><AppIcon label={labels[1]} /></div>
      <div className="flex gap-[31px]"><AppIcon label={labels[2]} /><AppIcon label={labels[3]} /></div>
    </div>
  )
}

function WidgetLabel({ label }: { label: string }) {
  return (
    <span className="absolute inset-0 flex items-center justify-center text-black/30 text-[15px] font-semibold select-none pointer-events-none">
      {label}
    </span>
  )
}

function Dock({ onOpenApp, onLock }: { onOpenApp?: () => void; onLock?: () => void }) {
  return (
    <div className="flex flex-row items-center justify-center"
      style={{ padding: '20px 17px 17px 17px' }}>
      <div className="flex-1 flex flex-row items-center justify-between relative"
        style={{
          background: 'rgba(255, 255, 255, 0.20)',
          borderRadius: 38, padding: '0px 19px', height: 103,
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'inset 1px 1px 2px 0px rgba(255, 255, 255, 1.00), inset -0.5px -0.5px 1px 0px rgba(255, 255, 255, 1.00)',
        }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i}
            onClick={i === 0 ? onLock : i === 3 ? onOpenApp : undefined}
            className={i === 0 || i === 3 ? 'cursor-pointer active:scale-90 transition-transform' : ''}>
            <AppIcon label={`应用${13 + i}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Content panel (350×541) ── */
function ContentPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-[402px] h-full flex-shrink-0 flex justify-center" style={{ paddingTop: 86 }}>
      <div className="w-[350px] h-[541px] relative">
        {children}
      </div>
    </div>
  )
}

/* ── Glass icon button ── */
function GlassIcon({ char }: { char: string }) {
  return (
    <div
      className="flex flex-row items-center justify-center flex-shrink-0 relative rounded-full"
      style={{
        width: 56, height: 56, padding: 15, gap: 10,
        background: 'rgba(255, 255, 255, 0.02)',
        boxShadow: '-1px -1px 1px 0 rgba(255,255,255,0.5) inset, 1px 1px 1px 0 rgba(255,255,255,0.5) inset',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div className="flex flex-col items-center justify-center flex-shrink-0 relative" style={{ padding: 2.4, gap: 12 }}>
        <span style={{
          color: '#ffffff', textAlign: 'center',
          fontFamily: "'SF Pro Display', 'SF Pro', -apple-system",
          fontSize: 21.6, lineHeight: '19.2px', fontWeight: 400,
          width: 19.2, height: 19.2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {char}
        </span>
      </div>
    </div>
  )
}

/* ── Panel 1 ── */
function Panel1() {
  return (
    <ContentPanel>
      <div className="flex flex-col gap-[32px]">
        <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[350px] h-[159px] bg-white relative">
          <WidgetLabel label="小组件A" />
        </div>
        <div className="flex gap-[32px]">
          <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[159px] h-[159px] bg-white relative">
            <WidgetLabel label="小组件B" />
          </div>
          <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[159px] h-[159px] bg-white relative">
            <WidgetLabel label="小组件C" />
          </div>
        </div>
        <div className="flex gap-[32px]">
          <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[159px] h-[159px] bg-white relative">
            <WidgetLabel label="小组件D" />
          </div>
          <IconGrid labels={['应用1', '应用2', '应用3', '应用4']} />
        </div>
      </div>
    </ContentPanel>
  )
}

/* ── Panel 2 ── */
function Panel2() {
  return (
    <ContentPanel>
      <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[350px] h-[350px] bg-white relative">
        <WidgetLabel label="小组件E" />
      </div>
      <div className="absolute left-0 top-[382px]"><IconGrid labels={['应用5', '应用6', '应用7', '应用8']} /></div>
      <div className="absolute left-[191px] top-[382px]"><IconGrid labels={['应用9', '应用10', '应用11', '应用12']} /></div>
    </ContentPanel>
  )
}

/* ── Desktop ── */
interface DesktopProps { onOpenApp?: () => void }

export default function Desktop({ onOpenApp }: DesktopProps) {
  const [isLocked, setIsLocked] = useState(true)
  const [unlockedPage, setUnlockedPage] = useState(0)
  const ckRef = useRef<CornerKit | null>(null)

  /* ── Motion values ── */
  const unlockY = useMotionValue(0)
  const pageX = useMotionValue(0)
  const wallX = useMotionValue(0)
  const wallSpring = useSpring(wallX, { stiffness: 200, damping: 30, mass: 0.5 })

  // iOS-like nonlinear opacity: barely fades in first 40%, drops fast near threshold
  const unlockOpacity = useTransform(unlockY,
    [-UNLOCK_THRESHOLD, -UNLOCK_THRESHOLD * 0.4, 0],
    [0.3, 0.95, 1],
  )

  // Return-to-lock fade multiplier: 1 normally, animated 0→1 during lockScreen
  const lockFade = useMotionValue(1)
  const displayOpacity = useTransform([unlockOpacity, lockFade], ([uo, lf]: number[]) => uo * lf)

  useEffect(() => {
    ckRef.current = new CornerKit({ smoothing: 0.6 })
    ckRef.current.auto()
    return () => ckRef.current?.destroy()
  }, [])

  useEffect(() => { ckRef.current?.auto() }, [unlockedPage])

  /* ── Lock screen: vertical drag, wallpaper stays at A segment until unlock ── */
  const handleUnlockDrag = (_: any, _info: { offset: { y: number } }) => {
    // wallpaper stays still during drag — moves only after unlock triggers
  }

  const handleUnlockDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y < -UNLOCK_THRESHOLD) {
      // ── Unlock: fly off + wallpaper to B segment ──
      animate(unlockY, -874, { type: 'spring', stiffness: 300, damping: 28, mass: 1 })
      animate(wallX, -402, { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 })
      setIsLocked(false)
      setUnlockedPage(0)
    } else {
      // ── Snap back ──
      animate(unlockY, 0, { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 })
      animate(wallX, 0, { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 })
    }
  }

  /* ── Unlocked: horizontal page drag → wallpaper sync (clamped to B–C segments) ── */
  const handlePageDrag = (_: any, info: { offset: { x: number } }) => {
    const startWallX = -402 * (unlockedPage + 1)  // -402 for page 1, -804 for page 2
    const raw = startWallX + info.offset.x
    wallX.set(Math.max(-804, Math.min(-402, raw)))
  }

  const handlePageDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50
    let target = unlockedPage
    if (info.offset.x < -threshold && unlockedPage < 1) target = 1
    else if (info.offset.x > threshold && unlockedPage > 0) target = 0
    setUnlockedPage(target)
    animate(pageX, -target * 402, { type: 'spring', stiffness: 300, damping: 28, mass: 1 })
    animate(wallX, -402 + (-target * 402), { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 })
  }

  /* ── Return to lock screen (dock first icon) ── */
  const lockScreen = () => {
    if (isLocked) return
    setUnlockedPage(0)
    animate(pageX, 0, { type: 'spring', stiffness: 300, damping: 28, mass: 1 })
    animate(wallX, 0, { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 })
    setIsLocked(true)
    unlockY.set(-350)
    lockFade.set(0)
    animate(unlockY, 0, { type: 'spring', stiffness: 250, damping: 25, mass: 1 })
    animate(lockFade, 1, { duration: 0.75, ease: 'easeOut' })
  }

  const SF = "'SF Pro Display', 'SF Pro', -apple-system"

  return (
    <div className="absolute inset-0 z-50 overflow-hidden bg-black">
      {/* ── Wallpaper (single, always rendered, spring-smoothed) ── */}
      <motion.img
        src="/img/Wallpaper.jpg"
        alt=""
        className="absolute left-0 top-0 pointer-events-none select-none"
        style={{ width: 1206, height: 874, maxWidth: 'none', x: wallSpring }}
        draggable={false}
      />

      {/* ── Unlock Div: lock icon + time + bottom glass icons (370×731, bottom=48) ── */}
      <motion.div
        className="absolute z-30"
        style={{
          left: 16, top: 95, width: 370, height: 731,
          y: unlockY, opacity: displayOpacity,
        }}
        drag="y"
        dragConstraints={{ top: -400, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDrag={handleUnlockDrag}
        onDragEnd={handleUnlockDragEnd}
      >
        {/* Lock icon + time */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center gap-[24px]">
          <span style={{
            fontFamily: SF, fontSize: '28.8px', color: 'white', fontWeight: 400,
            lineHeight: 1, width: 25.6, height: 25.6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {String.fromCodePoint(0x1003A1)}
          </span>
          <img src="/icons/time.svg" alt="" style={{ width: 154, height: 225 }} draggable={false} className="select-none pointer-events-none" />
        </div>

        {/* Bottom glass icons — flush with bottom of 731px div */}
        <div className="absolute" style={{ left: 0, bottom: 0 }}>
          <GlassIcon char={String.fromCodePoint(0x100000)} />
        </div>
        <div className="absolute" style={{ left: 314, bottom: 0 }}>
          <GlassIcon char={String.fromCodePoint(0x10031F)} />
        </div>
      </motion.div>

      {/* ── A Layer: 2-page horizontal swipe (pages 1–2, only when unlocked) ── */}
      <motion.div
        className="absolute inset-0 flex"
        drag={isLocked ? false : "x"}
        dragConstraints={{ left: -402, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        style={{ x: pageX, width: 804 }}
        animate={{ opacity: isLocked ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        onDrag={handlePageDrag}
        onDragEnd={handlePageDragEnd}
      >
        <div className="w-[402px] h-full flex-shrink-0"><Panel1 /></div>
        <div className="w-[402px] h-full flex-shrink-0"><Panel2 /></div>
      </motion.div>

      {/* ── Dock: visible when unlocked, slides up from below ── */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 z-20"
        animate={{ opacity: isLocked ? 0 : 1, y: isLocked ? 40 : 0 }}
        transition={{
          y: { type: 'spring', stiffness: 300, damping: 28, mass: 1 },
          opacity: { duration: 0.15, delay: isLocked ? 0 : 0.12 },
        }}
        style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
      >
        <Dock onOpenApp={onOpenApp} onLock={lockScreen} />
      </motion.div>
    </div>
  )
}
