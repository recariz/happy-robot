import type { ProcessStep } from '../../types/process'
import styles from './ProcessDetail.module.css'

interface ProcessDetailProps {
  step: ProcessStep
  systemLabels: string[]
}

function formatShare(share: number | undefined): string {
  if (share === undefined) return '—'
  return `${Math.round(share * 100)}% of interactions`
}

function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined) return '—'
  return `${seconds} seconds average`
}

export function ProcessDetail({ step, systemLabels }: ProcessDetailProps) {
  return (
    <aside className={styles.panel} aria-live="polite">
      <div className={styles.kicker}>Process step</div>
      <h3 className={styles.title}>{step.label}</h3>
      <p className={styles.description}>{step.description}</p>

      <div className={styles.grid}>
        <div>
          <div className={styles.fieldLabel}>Share of interactions</div>
          <div className={styles.fieldValue}>
            {formatShare(step.shareOfInteractions)}
          </div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Average duration</div>
          <div className={styles.fieldValue}>
            {formatDuration(step.avgSeconds)}
          </div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Systems</div>
          <div className={styles.fieldValue}>
            {systemLabels.length ? systemLabels.join(' · ') : '—'}
          </div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Human judgment</div>
          <div className={styles.fieldValue}>{step.humanJudgment}</div>
        </div>
        <div>
          <div className={styles.fieldLabel}>Automation potential</div>
          <div className={styles.fieldValue}>{step.automationPotential}</div>
        </div>
      </div>

      {step.painPoints?.length ? (
        <ul className={styles.list}>
          {step.painPoints.map((point) => (
            <li key={point} className={styles.listItem}>
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  )
}
