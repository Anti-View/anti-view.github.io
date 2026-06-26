import { motion, AnimatePresence } from 'framer-motion'

interface SuccessToastProps {
  visible: boolean
}

export default function SuccessToast({ visible }: SuccessToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-16 left-1/2 z-50 flex items-center gap-2 bg-[#34C759] text-white px-5 py-3 rounded-[1000px] shadow-[0_8px_30px_rgba(52,199,89,0.4)]"
          style={{ fontFamily: "var(--font-ui)", transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[15px] font-medium">主题应用成功</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
