import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhoneFrame from './components/PhoneFrame'
import StatusBar from './components/StatusBar'
import NavBar from './components/NavBar'
import ThemeDetail from './components/ThemeDetail'
import UploadSheet from './components/UploadSheet'
import GalleryPage from './components/GalleryPage'
import LoadingCard from './components/LoadingCard'
import ReadySheet from './components/ReadySheet'
import SuccessToast from './components/SuccessToast'
import DynamicIsland from './components/DynamicIsland'
import { useAppState } from './hooks/useAppState'

export default function App() {
  const {
    current,
    selectedImage,
    goToUpload,
    goToGallery,
    selectFromGallery,
    backFromGallery,
    backFromLoading,
    dismissToIdle,
    applyAndDismiss,
  } = useAppState()

  const [islandExpanded, setIslandExpanded] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastKey, setToastKey] = useState(0)

  const showToast = useCallback(() => {
    setToastKey(k => k + 1)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }, [])

  const handleApply = useCallback(async () => {
    const result = await applyAndDismiss()
    if (result) showToast()
  }, [applyAndDismiss, showToast])

  return (
    <PhoneFrame>
      {/* ── Always-visible base layer ── */}
      <StatusBar />
      <NavBar />
      <ThemeDetail onApply={goToUpload} />

      {/* ── Dynamic Island (topmost, above all overlays) ── */}
      <DynamicIsland
        expanded={islandExpanded}
        variant="square"
        onToggle={() => setIslandExpanded(prev => !prev)}
      />

      {/* ── Overlays (managed by AnimatePresence) ── */}
      <AnimatePresence>
        {current === 'upload' && (
          <UploadSheet
            key="upload-sheet"
            selectedImage={selectedImage}
            onSelectImage={goToGallery}
            onClose={dismissToIdle}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {current === 'gallery' && (
          <GalleryPage
            key="gallery-page"
            state={current}
            onSelect={selectFromGallery}
            onCancel={backFromGallery}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {current === 'loading' && (
          <LoadingCard
            key="loading-card"
            state={current}
            onClose={backFromLoading}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {current === 'ready' && (
          <ReadySheet
            key="ready-sheet"
            state={current}
            selectedImage={selectedImage}
            onApply={handleApply}
            onClose={dismissToIdle}
          />
        )}
      </AnimatePresence>

      {/* ── Success toast ── */}
      <SuccessToast key={toastKey} visible={toastVisible} />
    </PhoneFrame>
  )
}
