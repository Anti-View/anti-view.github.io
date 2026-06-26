import { motion } from 'framer-motion'
import type { AppState } from '../hooks/useAppState'

const XMARK = String.fromCodePoint(0x100184)
const SF = "'SF Pro Display', 'SF Pro', -apple-system"

interface ReadySheetProps {
  state: AppState
  selectedImage: number | null
  onApply: () => void
  onClose: () => void
}

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
]

export default function ReadySheet({ state, selectedImage, onApply, onClose }: ReadySheetProps) {
  const isVisible = state === 'ready'

  return (
    <>
      {isVisible && (
        <motion.div
          className="absolute inset-0 bg-black/50 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        />
      )}
      {isVisible && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[637px] bg-white rounded-t-[38px] z-30 flex flex-col"
          style={{ boxShadow: '0px 15px 75px rgba(0, 0, 0, 0.18)', fontFamily: "var(--font-ui)" }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 1.1 }}
        >
          <div className="flex flex-col items-center pb-[10px]">
            <div className="pt-[5px] pb-[10px]">
              <svg width="36" height="5" viewBox="0 0 36 5" fill="none">
                <path d="M0 2.5C0 1.11929 1.11929 0 2.5 0H33.5C34.8807 0 36 1.11929 36 2.5C36 3.88071 34.8807 5 33.5 5H2.5C1.11929 5 0 3.88071 0 2.5Z" fill="#CCCCCC" />
              </svg>
            </div>
            <div className="w-full px-4 flex justify-between items-center">
              <button
                onClick={onClose}
                className="w-[44px] h-[44px] rounded-full bg-black/[0.08] flex items-center justify-center hover-darken active:scale-90 transition-transform cursor-pointer"
              >
                <span style={{ fontFamily: SF, fontSize: 17, color: '#727272', lineHeight: 1 }}>{XMARK}</span>
              </button>
              <div className="w-8" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between pb-9 px-8">
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="w-[330px] h-[330px] rounded-2xl bg-black/[0.03] flex items-center justify-center overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
              >
                {selectedImage !== null ? (
                  <motion.div
                    className="w-full h-full"
                    style={{ background: PHOTO_COLORS[selectedImage % PHOTO_COLORS.length] }}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="1" />
                        <line x1="2" y1="6" x2="7" y2="2" />
                        <line x1="22" y1="6" x2="17" y2="2" />
                        <line x1="2" y1="18" x2="7" y2="22" />
                        <line x1="22" y1="18" x2="17" y2="22" />
                        <circle cx="12" cy="8" r="1.5" />
                      </svg>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                      拖动以旋转预览
                    </div>
                  </motion.div>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4.5" />
                    <path d="M3 21c0-5 4-9 9-9s9 4 9 9" />
                  </svg>
                )}
              </motion.div>

              <div className="text-center">
                <h2 className="text-[22px] font-semibold text-black">角色已就绪</h2>
                <p className="text-[15px] text-black/50 mt-2 leading-relaxed">
                  该角色已成功适配骨骼动画系统，你可以通过手指拖动预览不同角度的模型。
                </p>
              </div>
            </div>

            <button
              onClick={onApply}
              className="w-full h-[52px] bg-[#0088FF] text-white text-[17px] font-medium rounded-[1000px] hover-darken active:scale-[0.98] transition-transform cursor-pointer mt-6 flex-shrink-0"
              style={{ boxShadow: '0px 8px 40px rgba(0, 0, 0, 0.12)', fontFamily: "var(--font-ui)" }}
            >
              应用主题
            </button>
          </div>
        </motion.div>
      )}
    </>
  )
}
