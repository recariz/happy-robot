import type { EvidenceMeta } from './source'

/**
 * HappyRobot product taxonomy for Northstar kind.
 * Do not treat a Business Northstar as the overall case objective.
 */
export type NorthstarKind = 'behavioral' | 'business'

/**
 * Optional case-engine organization axis — not HappyRobot product taxonomy.
 */
export type NorthstarCategory =
  | 'identity'
  | 'tool-use'
  | 'data-handling'
  | 'process'
  | 'compliance'
  | 'communication'
  | 'outcome'
  | 'other'

/**
 * Behavioral / business governance rule.
 * Phase 3 presents rule + governed objects + expected behavior.
 * Phase 4 emits northstar_result PASS/FAIL against the same id.
 */
export interface Northstar extends EvidenceMeta {
  id: string
  name: string
  rule: string
  kind: NorthstarKind
  category?: NorthstarCategory
  severity: 'advisory' | 'important' | 'critical'
  rationale?: string
  expectedBehavior?: string
  evaluationMethod?: string
  governedToolIds?: string[]
  governedActionIds?: string[]
  governedStageIds?: string[]
  governedEscalationPathIds?: string[]
  governedContextSourceIds?: string[]
}
