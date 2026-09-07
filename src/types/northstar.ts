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

export interface Northstar {
  id: string
  name: string
  rule: string
  kind: NorthstarKind
  category?: NorthstarCategory
  severity: 'advisory' | 'important' | 'critical'
  rationale?: string
  evaluationMethod?: string
  examplePass?: string
  exampleFail?: string
}
