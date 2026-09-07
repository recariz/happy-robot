import type { EvidenceMeta } from './source'

export interface ProcessStep extends EvidenceMeta {
  id: string
  label: string
  shortLabel?: string
  description: string
  avgSeconds?: number
  shareOfInteractions?: number
  systems?: string[]
  channels?: string[]
  people?: string[]
  humanJudgment: 'none' | 'low' | 'medium' | 'high'
  automationPotential: 'low' | 'medium' | 'high'
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
