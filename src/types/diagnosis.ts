import type { Metric } from './metric'
import type { EvidenceMeta } from './source'

export interface Bottleneck extends EvidenceMeta {
  id: string
  title: string
  summary: string
  processStepIds: string[]
  category:
    | 'manual-work'
    | 'system-fragmentation'
    | 'capacity'
    | 'service-level'
    | 'error-risk'
    | 'revenue-leakage'
    | 'compliance'
    | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  quantifiedImpact?: Metric[]
  rootCause?: string
}

export interface RootCause {
  id: string
  symptom: string
  immediateCause: string
  rootCause: string
}

export interface Diagnosis {
  summary: string
  headlineMetrics?: Metric[]
  bottlenecks: Bottleneck[]
  rootCauses?: RootCause[]
  keyInsightId?: string
}
