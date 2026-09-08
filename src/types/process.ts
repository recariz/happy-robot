import type { EvidenceMeta } from './source'

/** Classification used to derive diagnosis time shares from process weights. */
export type DiagnosisRole =
  | 'retrieval'
  | 'judgment'
  | 'transaction'
  | 'admin'

export type AutomationPotential = 'low' | 'medium' | 'medium-high' | 'high'

export type HumanJudgment = 'none' | 'low' | 'medium' | 'high'

export interface ProcessStep extends EvidenceMeta {
  id: string
  label: string
  shortLabel?: string
  description: string
  avgSeconds?: number
  shareOfInteractions?: number
  /** Prefer systemIds; legacy `systems` labels remain optional for display fallback. */
  systemIds?: string[]
  systems?: string[]
  channels?: string[]
  people?: string[]
  humanJudgment: HumanJudgment
  automationPotential: AutomationPotential
  diagnosisRole?: DiagnosisRole
  failureModes?: string[]
  exceptions?: string[]
  painPoints?: string[]
  inputs?: string[]
  outputs?: string[]
  sourceIds?: string[]
}

export interface ProcessDefinition {
  id: string
  label: string
  description?: string
  stepIds: string[]
  steps: ProcessStep[]
}
