import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import CornerKit from '@cornerkit/core'
import { publicAsset } from '../utils/assets'

const UNLOCK_THRESHOLD = 64
const PHONE_WIDTH = 402
const PHONE_HEIGHT = 874
const WALLPAPER_WIDTH = PHONE_WIDTH * 3
const DOCK_LEFT = 17
const DOCK_BOTTOM = 17
const DOCK_HEIGHT = 103
const DOCK_TOP = PHONE_HEIGHT - DOCK_BOTTOM - DOCK_HEIGHT


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
    <div className="absolute inset-0 flex flex-row items-center justify-between"
      style={{ padding: '0px 19px' }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i}
          onClick={i === 0 ? onLock : i === 3 ? onOpenApp : undefined}
          className={i === 0 || i === 3 ? 'cursor-pointer active:scale-90 transition-transform' : ''}>
          <AppIcon label={`应用${13 + i}`} />
        </div>
      ))}
    </div>
  )
}

function MobileDockGlass({ wallX }: { wallX: any }) {
  return (
    <>
      <motion.img
        src={publicAsset('img/new_wallpaper.jpg')}
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          left: -DOCK_LEFT,
          top: -DOCK_TOP,
          width: WALLPAPER_WIDTH,
          height: PHONE_HEIGHT,
          maxWidth: 'none',
          x: wallX,
          filter: 'blur(8px) saturate(1.35)',
          scale: 1.03,
          transformOrigin: '0 0',
          willChange: 'transform',
        }}
        draggable={false}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(255, 255, 255, 0.20)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 38,
          boxShadow: 'inset 1px 1px 2px 0px rgba(255, 255, 255, 1.00), inset -0.5px -0.5px 1px 0px rgba(255, 255, 255, 1.00)',
        }}
      />
    </>
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

/* ── Panel 3 ── */
function Panel3() {
  return (
    <ContentPanel>
      <div data-squircle data-squircle-radius="28" data-squircle-smoothing="0.6" className="w-[350px] h-[350px] bg-white relative">
        <WidgetLabel label="小组件E" />
      </div>
      <div className="absolute left-0 top-[382px]"><IconGrid labels={['应用17', '应用18', '应用19', '应用20']} /></div>
      <div className="absolute left-[191px] top-[382px]"><IconGrid labels={['应用21', '应用22', '应用23', '应用24']} /></div>
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

  const lgRef = useRef<any>(null)
  const [lgFailed, setLgFailed] = useState(() =>
    typeof window !== 'undefined' && 'ontouchstart' in window,
  )

  /* ── LiquidGlass init (desktop only) ── */
  useEffect(() => {
    if (lgFailed) return
    let instance: any = null
    let cancelled = false
    const init = async () => {
      try {
        const mod: any = await (async () => {
          const src = 'https://cdn.jsdelivr.net/npm/@ybouane/liquidglass@1.0.3/dist/index.js'
          return import(/* @vite-ignore */ src)
        })()
        if (cancelled || !mod.LiquidGlass) return
        const glassEl = document.querySelector('[data-glass="dock"]') as HTMLElement | null
        if (!glassEl) return
        glassEl.dataset.config = JSON.stringify({
          blurAmount: 0.05,
          refraction: 0.5,
          chromAberration: 0.05,
          edgeHighlight: 0.15,
          specular: 0,
          fresnel: 1,
          distortion: 0,
          cornerRadius: 40,
          zRadius: 40,
          opacity: 1,
          saturation: 0,
          brightness: 0,
          shadowOpacity: 0,
          shadowSpread: 10,
          bevelMode: 0,
        })
        instance = await mod.LiquidGlass.init({
          root: document.querySelector('#liquid-root'),
          glassElements: [glassEl],
        })
        lgRef.current = instance
      } catch (e) {
        console.warn('LiquidGlass init failed, using CSS fallback:', e)
        setLgFailed(true)
      }
    }
    init()
    return () => { cancelled = true; instance?.destroy() }
  }, [])

  /* ── Lock screen: vertical drag, wallpaper stays at A segment until unlock ── */
  const handleUnlockDrag = (_: any, _info: { offset: { y: number } }) => {
    lgRef.current?.markChanged()
  }

  const handleUnlockDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y < -UNLOCK_THRESHOLD) {
      // ── Unlock: fly off, wallpaper stays at A segment ──
      animate(unlockY, -874, { type: 'spring', stiffness: 300, damping: 28, mass: 1 })
      setIsLocked(false)
      setUnlockedPage(0)
      lgRef.current?.markChanged()
    } else {
      // ── Snap back ──
      animate(unlockY, 0, { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 })
      animate(wallX, 0, { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 })
    }
  }

  /* ── Unlocked: horizontal page drag → wallpaper sync (A–C segments) ── */
  const handlePageDrag = (_: any, info: { offset: { x: number } }) => {
    const startWallX = -unlockedPage * 402
    const raw = startWallX + info.offset.x
    wallX.set(Math.max(-804, Math.min(0, raw)))
    lgRef.current?.markChanged()
  }

  const handlePageDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 50
    let target = unlockedPage
    if (info.offset.x < -threshold && unlockedPage < 2) target = unlockedPage + 1
    else if (info.offset.x > threshold && unlockedPage > 0) target = unlockedPage - 1
    setUnlockedPage(target)
    animate(pageX, -target * 402, { type: 'spring', stiffness: 300, damping: 28, mass: 1 })
    animate(wallX, -target * 402, { type: 'spring', stiffness: 200, damping: 30, mass: 0.5 }).then(() => lgRef.current?.markChanged())
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
    lgRef.current?.markChanged()
  }

  const SF = "'SF Pro Display', 'SF Pro', -apple-system"

  return (
    <div id="liquid-root" className="absolute inset-0 z-50 overflow-hidden bg-black">
      {/* ── Wallpaper (single, always rendered, spring-smoothed) ── */}
      <motion.img
        src={publicAsset('img/new_wallpaper.jpg')}
        alt=""
        data-dynamic=""
        className="absolute left-0 top-0 pointer-events-none select-none"
        style={{ width: 1206, height: 874, maxWidth: 'none', x: wallSpring }}
        draggable={false}
      />

      {/* ── b-layer character (page 1 / B segment, 280×280, centered, 140px from bottom) ── */}
      <motion.div
        className="absolute pointer-events-none select-none z-[1]"
        style={{
          left: 61, top: 454, width: 280, height: 280,
          x: wallSpring,
        }}
      >
        {/* Floor shadow — 170×12 ellipse, blurred */}
        <div
          className="absolute"
          style={{
            left: 55, bottom: 0, width: 170, height: 12,
            background: '#C2976C',
            borderRadius: '50%',
            filter: 'blur(12px)',
          }}
        />
        <img src={publicAsset('videos/character.gif')} alt="" className="w-full h-full object-contain relative" draggable={false} style={{ position: 'relative', zIndex: 1 }} />
      </motion.div>

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
          <img src={publicAsset('icons/time.svg')} alt="" style={{ width: 154, height: 225 }} draggable={false} className="select-none pointer-events-none" />
        </div>

        {/* Bottom glass icons — flush with bottom of 731px div */}
        <div className="absolute" style={{ left: 0, bottom: 0 }}>
          <GlassIcon char={String.fromCodePoint(0x100000)} />
        </div>
        <div className="absolute" style={{ left: 314, bottom: 0 }}>
          <GlassIcon char={String.fromCodePoint(0x10031F)} />
        </div>
      </motion.div>

      {/* ── a-layer: 3-page horizontal swipe (pages 1–3, only when unlocked) ── */}
      <motion.div
        className="absolute inset-0 flex z-[5]"
        drag={isLocked ? false : "x"}
        dragConstraints={{ left: -804, right: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        style={{ x: pageX, width: 1206 }}
        animate={{ opacity: isLocked ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        onDrag={handlePageDrag}
        onDragEnd={handlePageDragEnd}
      >
        <div className="w-[402px] h-full flex-shrink-0"><Panel1 /></div>
        <div className="w-[402px] h-full flex-shrink-0"><Panel2 /></div>
        <div className="w-[402px] h-full flex-shrink-0"><Panel3 /></div>
      </motion.div>

      {/* ── Dock: visible when unlocked, slides up from below ── */}
      {lgFailed ? (
        /* Mobile Safari: render the live glass background ourselves.
           Native backdrop-filter can freeze when the backdrop is a transformed layer. */
        <motion.div
          className="absolute bottom-[17px] left-[17px] right-[17px] z-20"
          animate={{ opacity: isLocked ? 0 : 1, y: isLocked ? 40 : 0 }}
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 28, mass: 1 },
            opacity: { duration: 0.05 },
          }}
          style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 38,
              height: DOCK_HEIGHT,
              padding: '0px 19px',
              isolation: 'isolate',
            }}
          >
            <MobileDockGlass wallX={wallSpring} />
            <Dock onOpenApp={onOpenApp} onLock={lockScreen} />
          </div>
        </motion.div>
      ) : (
        /* Desktop: LiquidGlass, glass on same element as animation */
        <motion.div
          className="absolute bottom-[17px] left-[17px] right-[17px] z-20"
          data-glass="dock"
          animate={{ opacity: isLocked ? 0 : 1, y: isLocked ? 40 : 0 }}
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 28, mass: 1 },
            opacity: { duration: 0.15, delay: isLocked ? 0 : 0.12 },
          }}
          style={{
            pointerEvents: isLocked ? 'none' : 'auto',
            background: 'rgba(255, 255, 255, 0.20)',
            borderRadius: 38,
            height: 103,
            padding: '0px 19px',
          }}
        >
          <Dock onOpenApp={onOpenApp} onLock={lockScreen} />
        </motion.div>
      )}
    </div>
  )
}
