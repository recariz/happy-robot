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
  rootCauseId?: string
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
  /**
   * Optional static metrics. Prefer derived metrics from process/current-state utils.
   * IDs listed in derivedMetricKeys are computed at render time.
   */
  headlineMetrics?: Metric[]
  /** Keys understood by derive-diagnosis util. */
  derivedMetricKeys?: Array<
    | 'retrieval-transfer-share'
    | 'low-judgment-share'
    | 'after-hours-share'
    | 'abandoned-calls-per-day'
    | 'after-hours-calls-per-day'
  >
  bottlenecks: Bottleneck[]
  rootCauses?: RootCause[]
}
