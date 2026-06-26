const SF = {
  chevronLeft: String.fromCodePoint(0x100BF6),
  ellipsis:    String.fromCodePoint(0x100360),
}

const sfFont = "'SF Pro Display', 'SF Pro', -apple-system"

export default function NavBar() {
  return (
    <div className="absolute top-[62px] left-0 w-full px-4 flex items-center justify-between z-10 pointer-events-none">
      {/* Back — SF Symbol chevron.left */}
      <div className="pointer-events-auto">
        <button className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover-darken active:scale-95 transition-transform cursor-pointer">
          <span style={{ fontFamily: sfFont, fontSize: 17, color: '#1A1A1A', lineHeight: 1, fontWeight: 510 }}>{SF.chevronLeft}</span>
        </button>
      </div>

      <div className="w-2" />

      {/* Menu — SF Symbol ellipsis */}
      <div className="pointer-events-auto">
        <button className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover-darken active:scale-95 transition-transform cursor-pointer">
          <span style={{ fontFamily: sfFont, fontSize: 17, color: '#1A1A1A', lineHeight: 1, fontWeight: 510 }}>{SF.ellipsis}</span>
        </button>
      </div>
    </div>
  )
}
