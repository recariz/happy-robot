import type { EvidenceMeta } from './source'

export type MetricFormat =
  | 'number'
  | 'percent'
  | 'currency'
  | 'duration'
  | 'multiple'
  | 'range'

export type MetricTimeframe =
  | 'day'
  | 'month'
  | 'year'
  | 'interaction'
  | 'unspecified'

export type MetricValue = number | { min: number; max: number }

export interface Metric extends EvidenceMeta {
  id: string
  label: string
  value: MetricValue
  unit: string
  format?: MetricFormat
  timeframe?: MetricTimeframe
  description?: string
  prominence?: 'hero' | 'primary' | 'secondary'
}
