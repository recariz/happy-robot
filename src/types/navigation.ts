export type SectionId =
  | 'current-state'
  | 'process'
  | 'diagnosis'
  | 'solution'
  | 'deployment'
  | 'impact'

export type SectionImplementationStatus = 'ready' | 'placeholder'

export interface SectionDefinition {
  id: SectionId
  number: string
  label: string
  prompt: string
  /** Narrative order for Left/Right keys (0-based). */
  narrativeOrder: number
  /** Normalized overview coordinates (0–1). */
  overview: {
    x: number
    y: number
  }
}

export type PresentationLocation =
  | { kind: 'overview' }
  | { kind: 'section'; sectionId: SectionId }
  | {
      kind: 'detail'
      sectionId: SectionId
      detailId: string
    }

export interface CasePresentationConfig {
  /** Sections visible on the overview map. */
  visibleSections: SectionId[]
  /**
   * Implementation status per section.
   * `placeholder` renders DevelopmentPlaceholder until a real view is registered.
   */
  sectionStatus: Record<SectionId, SectionImplementationStatus>
}
