import { motion } from 'framer-motion'
import type { AppState } from '../hooks/useAppState'

const PHOTO_COUNT = 18

interface GalleryPageProps {
  state: AppState
  onSelect: (index: number) => void
  onCancel: () => void
}

const sfFont = "'SF Pro Display', 'SF Pro', -apple-system"
const xmark = String.fromCodePoint(0x100184)

export default function GalleryPage({ state, onSelect, onCancel }: GalleryPageProps) {
  const isVisible = state === 'gallery'

  return (
    <>
      {isVisible && (
        <>
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 z-30"
            style={{ background: 'rgba(0, 0, 0, 0.50)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onCancel}
          />

          {/* Gallery sheet */}
          <motion.div
            className="absolute z-40 bg-white flex flex-col"
            style={{
              left: 0, top: 62, width: 402, height: 812,
              borderTopLeftRadius: 38, borderTopRightRadius: 38,
              boxShadow: '0px 15px 75px rgba(0, 0, 0, 0.18)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 1.1 }}
          >
            {/* Header: drag pill + close button */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ paddingBottom: 10 }}>
              {/* Drag pill */}
              <div className="flex flex-col items-start" style={{ height: 16, paddingTop: 5 }}>
                <svg width="36" height="5" viewBox="0 0 36 5" fill="none">
                  <g style={{ mixBlendMode: 'plus-darker' }}>
                    <path d="M0 2.5C0 1.11929 1.11929 0 2.5 0H33.5C34.8807 0 36 1.11929 36 2.5C36 3.88071 34.8807 5 33.5 5H2.5C1.11929 5 0 3.88071 0 2.5Z" fill="#CCCCCC" />
                  </g>
                </svg>
              </div>

              {/* Close button */}
              <div className="self-stretch px-4 relative flex justify-between items-center">
                <button
                  onClick={onCancel}
                  className="h-[44px] px-1 relative rounded-[296px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                  style={{ gap: 12 }}
                >
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ position: 'absolute', left: 0, top: 0 }}>
                    <circle cx="22" cy="22" r="22" fill="#787880" fillOpacity="0.16" />
                  </svg>
                  <span style={{
                    width: 36, textAlign: 'center',
                    fontFamily: sfFont, fontSize: 17, fontWeight: 510,
                    color: '#727272', lineHeight: '44px',
                  }}>
                    {xmark}
                  </span>
                </button>
                <div style={{ width: 8 }} />
                <div style={{ width: 36 }} />
              </div>
            </div>

            {/* Photo grid */}
            <div className="flex-1 overflow-y-auto px-1">
              <div className="grid grid-cols-3 gap-1 p-1">
                {Array.from({ length: PHOTO_COUNT }, (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => onSelect(i)}
                    whileTap={{ scale: 0.94 }}
                    className="cursor-pointer relative overflow-hidden"
                    style={{ height: 128.67, background: '#D9D9D9' }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}
