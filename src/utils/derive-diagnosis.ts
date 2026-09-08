import type { CurrentState } from '../types/case'
import type { Diagnosis } from '../types/diagnosis'
import type { Metric } from '../types/metric'
import type { ProcessDefinition, ProcessStep } from '../types/process'

const AHT_TARGET_SECONDS = 5.8 * 60
const AHT_TOLERANCE_SECONDS = 5

export interface StepWeight {
  stepId: string
  weightedSeconds: number
  diagnosisRole?: ProcessStep['diagnosisRole']
  humanJudgment: ProcessStep['humanJudgment']
}

export interface ProcessWeightSummary {
  steps: StepWeight[]
  totalWeightedSeconds: number
  reconcilesToAht: boolean
  ahtTargetSeconds: number
}

export function weightedSecondsForStep(step: ProcessStep): number {
  const share = step.shareOfInteractions ?? 0
  const seconds = step.avgSeconds ?? 0
  return share * seconds
}

export function summarizeProcessWeights(
  process: ProcessDefinition,
): ProcessWeightSummary {
  const steps: StepWeight[] = process.steps.map((step) => ({
    stepId: step.id,
    weightedSeconds: weightedSecondsForStep(step),
    diagnosisRole: step.diagnosisRole,
    humanJudgment: step.humanJudgment,
  }))

  const totalWeightedSeconds = steps.reduce(
    (sum, step) => sum + step.weightedSeconds,
    0,
  )

  return {
    steps,
    totalWeightedSeconds,
    reconcilesToAht:
      Math.abs(totalWeightedSeconds - AHT_TARGET_SECONDS) <= AHT_TOLERANCE_SECONDS,
    ahtTargetSeconds: AHT_TARGET_SECONDS,
  }
}

function metricById(currentState: CurrentState, id: string): Metric | undefined {
  return currentState.metrics.find((metric) => metric.id === id)
}

function numberValue(metric: Metric | undefined): number | undefined {
  if (!metric) return undefined
  return typeof metric.value === 'number' ? metric.value : undefined
}

/**
 * Retrieval/transfer share = weighted time on retrieval + admin roles / total.
 * Negotiation (judgment) and booking (transaction) are excluded from this share.
 */
export function retrievalTransferShare(summary: ProcessWeightSummary): number {
  if (summary.totalWeightedSeconds <= 0) return 0
  const retrievalSeconds = summary.steps
    .filter(
      (step) =>
        step.diagnosisRole === 'retrieval' || step.diagnosisRole === 'admin',
    )
    .reduce((sum, step) => sum + step.weightedSeconds, 0)
  return retrievalSeconds / summary.totalWeightedSeconds
}

export function lowJudgmentShare(summary: ProcessWeightSummary): number {
  if (summary.totalWeightedSeconds <= 0) return 0
  const lowSeconds = summary.steps
    .filter((step) => step.humanJudgment === 'low')
    .reduce((sum, step) => sum + step.weightedSeconds, 0)
  return lowSeconds / summary.totalWeightedSeconds
}

export function deriveDiagnosisMetrics(
  currentState: CurrentState,
  process: ProcessDefinition,
  diagnosis: Diagnosis,
): Metric[] {
  const summary = summarizeProcessWeights(process)
  const keys = diagnosis.derivedMetricKeys ?? []
  const metrics: Metric[] = []

  const callsPerDay = numberValue(metricById(currentState, 'calls-per-day'))
  const abandonment = numberValue(metricById(currentState, 'abandonment-rate'))
  const afterHours = numberValue(metricById(currentState, 'after-hours-share'))

  for (const key of keys) {
    if (key === 'retrieval-transfer-share') {
      metrics.push({
        id: 'retrieval-transfer-share',
        label: 'Handling time on retrieval / transfer',
        value: retrievalTransferShare(summary),
        unit: '%',
        format: 'percent',
        prominence: 'hero',
        description:
          'Derived: weighted seconds on retrieval + admin steps ÷ total weighted process seconds.',
        provenance: 'our-design',
        confidence: 'placeholder',
        sourceId: 'atlas-placeholder-process',
      })
    }

    if (key === 'low-judgment-share') {
      metrics.push({
        id: 'low-judgment-share',
        label: 'Handling time at low judgment',
        value: lowJudgmentShare(summary),
        unit: '%',
        format: 'percent',
        prominence: 'primary',
        description:
          'Derived: weighted seconds where humanJudgment is low ÷ total weighted process seconds.',
        provenance: 'our-design',
        confidence: 'placeholder',
        sourceId: 'atlas-placeholder-process',
      })
    }

    if (key === 'after-hours-share' && afterHours !== undefined) {
      metrics.push({
        id: 'diag-after-hours-share',
        label: 'Demand outside standard hours',
        value: afterHours,
        unit: '%',
        format: 'percent',
        prominence: 'primary',
        description: 'Reuses approved current-state after-hours share.',
        provenance: 'our-design',
        confidence: 'placeholder',
        sourceId: 'atlas-placeholder-metrics',
      })
    }

    if (
      key === 'abandoned-calls-per-day' &&
      callsPerDay !== undefined &&
      abandonment !== undefined
    ) {
      metrics.push({
        id: 'diag-abandoned-calls-per-day',
        label: 'Abandoned calls / day',
        value: Math.round(callsPerDay * abandonment),
        unit: 'calls',
        format: 'number',
        timeframe: 'day',
        prominence: 'secondary',
        description: 'Derived: calls/day × abandonment rate.',
        provenance: 'our-design',
        confidence: 'placeholder',
        sourceId: 'atlas-placeholder-metrics',
      })
    }

    if (
      key === 'after-hours-calls-per-day' &&
      callsPerDay !== undefined &&
      afterHours !== undefined
    ) {
      metrics.push({
        id: 'diag-after-hours-calls-per-day',
        label: 'After-hours calls / day',
        value: Math.round(callsPerDay * afterHours),
        unit: 'calls',
        format: 'number',
        timeframe: 'day',
        prominence: 'secondary',
        description: 'Derived: calls/day × after-hours share.',
        provenance: 'our-design',
        confidence: 'placeholder',
        sourceId: 'atlas-placeholder-metrics',
      })
    }
  }

  return metrics
}

/** Dev-time coherence check — weighted process ≈ 5.8 min AHT. */
export function assertProcessReconcilesToAht(process: ProcessDefinition): void {
  const summary = summarizeProcessWeights(process)
  if (!summary.reconcilesToAht) {
    console.warn(
      `[derive-diagnosis] Process "${process.id}" weighted ${summary.totalWeightedSeconds.toFixed(1)}s does not reconcile to AHT target ${summary.ahtTargetSeconds}s (±${AHT_TOLERANCE_SECONDS}).`,
    )
  }
}
