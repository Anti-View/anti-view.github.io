import { motion } from 'framer-motion'
import type { AppState } from '../hooks/useAppState'

const PHOTO_COLORS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
  'linear-gradient(135deg, #f5576c, #ff6f00)',
  'linear-gradient(135deg, #30cfd0, #330867)',
  'linear-gradient(135deg, #a8edea, #fed6e3)',
  'linear-gradient(135deg, #ff9a9e, #fecfef)',
  'linear-gradient(135deg, #96fbc4, #f9f586)',
  'linear-gradient(135deg, #d4fc79, #96e6a1)',
  'linear-gradient(135deg, #89f7fe, #66a6ff)',
  'linear-gradient(135deg, #c471f5, #fa71cd)',
  'linear-gradient(135deg, #48c6ef, #6f86d6)',
  'linear-gradient(135deg, #feada6, #f5efef)',
]

interface GalleryPageProps {
  state: AppState
  onSelect: (index: number) => void
  onCancel: () => void
}

export default function GalleryPage({ state, onSelect, onCancel }: GalleryPageProps) {
  const isVisible = state === 'gallery'

  return (
    <>
      {isVisible && (
        <motion.div
          className="absolute inset-0 bg-white z-40 flex flex-col"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 1.1 }}
        >
          {/* Top nav */}
          <div className="flex items-center justify-between px-4 h-[62px] pt-[21px] flex-shrink-0" style={{ fontFamily: "var(--font-ui)" }}>
            <button
              onClick={onCancel}
              className="text-[#0088FF] text-[17px] cursor-pointer active:opacity-60 transition-opacity"
            >
              取消
            </button>
            <span className="text-[17px] font-medium text-black">最近项目</span>
            <button className="text-[#0088FF] text-[17px] cursor-pointer active:opacity-60 transition-opacity">
              相册
            </button>
          </div>

          {/* Photo grid — scrollbar hidden by global CSS */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 gap-[2px] p-[2px]">
              {PHOTO_COLORS.map((color, i) => (
                <motion.button
                  key={i}
                  onClick={() => onSelect(i)}
                  whileTap={{ scale: 0.94 }}
                  className="aspect-square cursor-pointer relative hover-darken"
                  style={{ background: color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="h-[84px] flex items-center justify-center border-t border-gray-200 flex-shrink-0" style={{ fontFamily: "var(--font-ui)" }}>
            <span className="text-[15px] text-black/40">轻点以选择照片</span>
          </div>
        </motion.div>
      )}
    </>
  )
}
