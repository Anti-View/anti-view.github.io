declare module '@cornerkit/core' {
  interface CornerKitConfig {
    radius?: number
    smoothing?: number
    tier?: string
    border?: {
      width?: number
      color?: string
      style?: string
      gradient?: Array<{ offset: number | string; color: string }>
    }
  }
  export default class CornerKit {
    constructor(config?: CornerKitConfig)
    apply(element: HTMLElement | string, config?: CornerKitConfig): void
    applyAll(selector: string, config?: CornerKitConfig): void
    update(element: HTMLElement | string, config?: CornerKitConfig): void
    remove(element: HTMLElement | string): void
    destroy(): void
    auto(): void
    inspect(element: HTMLElement | string): null | { config: CornerKitConfig; tier: string; dimensions: { width: number; height: number } }
    static supports(): { native: boolean; houdini: boolean; clippath: boolean; fallback: boolean }
  }
}
