import type { ProcessStep } from '../../types/process'
import styles from './ProcessNode.module.css'

export type ProcessFlowMode = 'neutral' | 'diagnosed'

interface ProcessNodeProps {
  step: ProcessStep
  index: number
  selected: boolean
  mode: ProcessFlowMode
  bottleneckSeverity?: 'low' | 'medium' | 'high' | 'critical'
  systemLabels: string[]
  onSelect: () => void
}

function automationClass(
  potential: ProcessStep['automationPotential'],
): string {
  if (potential === 'high') return styles.markerHigh
  if (potential === 'medium-high') return styles.markerMediumHigh
  if (potential === 'medium') return styles.markerMedium
  return styles.markerLow
}

export function ProcessNode({
  step,
  index,
  selected,
  mode,
  bottleneckSeverity,
  systemLabels,
  onSelect,
}: ProcessNodeProps) {
  const diagnosed = mode === 'diagnosed' && Boolean(bottleneckSeverity)
  const className = [
    styles.node,
    selected ? styles.nodeSelected : '',
    mode === 'diagnosed' ? styles.nodeDiagnosed : '',
    bottleneckSeverity === 'critical'
      ? styles.nodeBottleneckCritical
      : bottleneckSeverity === 'high'
        ? styles.nodeBottleneckHigh
        : '',
  ]
    .filter(Boolean)
    .join(' ')

  const durationChip =
    step.avgSeconds !== undefined ? `${step.avgSeconds}s` : null
  const shareChip =
    step.shareOfInteractions !== undefined
      ? `${Math.round(step.shareOfInteractions * 100)}%`
      : null

  return (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span
        className={`${styles.marker} ${automationClass(step.automationPotential)}`}
        title={`Automation potential: ${step.automationPotential}`}
        aria-hidden
      />
      <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      <span className={styles.label}>{step.shortLabel ?? step.label}</span>
      <div className={styles.chips}>
        {durationChip ? <span className={styles.chip}>{durationChip}</span> : null}
        {shareChip ? <span className={styles.chip}>{shareChip}</span> : null}
        {systemLabels.slice(0, 1).map((label) => (
          <span key={label} className={styles.chip}>
            {label}
          </span>
        ))}
      </div>
      {diagnosed ? (
        <span className={styles.severity}>{bottleneckSeverity}</span>
      ) : null}
    </button>
  )
}
